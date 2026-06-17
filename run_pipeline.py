import sqlite3
import json
import os
import subprocess
import sys

base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, 'tech_monitor.db')
js_out_path = os.path.join(base_dir, 'data.js')

def export_to_json():
    """DB에 적재된 카테고리, 아티클, AI 인사이트 데이터를 조인하여 data.js로 저장"""
    print("[System] 데이터베이스 정보를 data.js로 내보내는 중...")
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # 컬럼명으로 접근 가능하게 설정
    cursor = conn.cursor()
    
    # 1. 카테고리 정보 가져오기
    cursor.execute("SELECT id, name, keywords, priority FROM categories ORDER BY priority ASC")
    categories = [dict(row) for row in cursor.fetchall()]
    
    # 각 카테고리의 키워드 복원
    for cat in categories:
        cat['keywords'] = json.loads(cat['keywords'])
        
    # 2. 아티클 및 인사이트 데이터 가져오기 (인사이트가 있는 것 우선, 발행일 내림차순)
    # 기왕이면 인사이트가 생성된 기사들 위주로 대시보드에 노출
    cursor.execute("""
        SELECT * FROM (
            SELECT 
                a.id,
                a.category_id,
                a.title,
                a.source_url,
                a.published_at,
                i.summary,
                i.tech_stage,
                i.investment_impact,
                i.key_tickers
            FROM articles a
            INNER JOIN insights i ON a.id = i.article_id

            UNION ALL

            SELECT * FROM (
                SELECT 
                    a.id,
                    a.category_id,
                    a.title,
                    a.source_url,
                    a.published_at,
                    NULL as summary,
                    NULL as tech_stage,
                    NULL as investment_impact,
                    NULL as key_tickers
                FROM articles a
                WHERE a.id NOT IN (SELECT article_id FROM insights)
                ORDER BY a.published_at DESC
                LIMIT 30
            )
        )
        ORDER BY investment_impact DESC, published_at DESC
    """)
    
    rows = cursor.fetchall()
    articles = []
    for row in rows:
        article = dict(row)
        # JSON 문자열 필드 파싱
        if article['key_tickers']:
            try:
                article['key_tickers'] = json.loads(article['key_tickers'])
            except:
                article['key_tickers'] = []
        else:
            article['key_tickers'] = []
            
        articles.append(article)
        
    # 최종 결과 조립
    output_data = {
        "last_updated": sqlite3.connect(db_path).execute("SELECT datetime('now', 'localtime')").fetchone()[0],
        "categories": categories,
        "articles": articles
    }
    
    with open(js_out_path, 'w', encoding='utf-8') as f:
        f.write("window.techData = " + json.dumps(output_data, ensure_ascii=False, indent=2) + ";")
        
    print(f"[System] 내보내기 성공! 저장 경로: {os.path.abspath(js_out_path)}")
    print(f"[System] 총 {len(articles)}개의 기사가 data.js에 기록되었습니다.")
    conn.close()

def run_full_pipeline():
    print("\n" + "="*50)
    print("      [START] 5대 기술 모니터링 시스템 파이프라인")
    print("="*50)
    
    # 1. 크롤러 실행
    try:
        from crawler_engine import crawl_and_store
        new_count = crawl_and_store()
        print(f"-> 1단계 크롤러 실행 완료 (새 뉴스/논문 수집: {new_count}개)")
    except Exception as e:
        print(f"-> 1단계 크롤러 실행 실패: {e}")
        
    # 2. AI 분석 실행
    try:
        from llm_analyzer import analyze_articles
        # 신규 카테고리를 모두 완벽히 분석하기 위해 한도를 100개로 상향
        analyzed_count = analyze_articles(limit=100)
        print(f"-> 2단계 AI 요약 및 인사이트 분석 완료 (신규 분석: {analyzed_count}개)")
    except Exception as e:
        print(f"-> 2단계 AI 분석 실패: {e}")
        
    # 3. JSON 데이터 추출
    try:
        export_to_json()
        print("-> 3단계 대시보드용 JSON 내보내기 완료")
    except Exception as e:
        print(f"-> 3단계 내보내기 실패: {e}")
        
    print("="*50)
    print("      [END] 파이프라인 모든 단계가 완료되었습니다.")
    print("="*50 + "\n")

if __name__ == "__main__":
    run_full_pipeline()
