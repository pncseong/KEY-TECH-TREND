import sqlite3
import json
import os
import random
import time
import re
import sys

def safe_print(text):
    """윈도우 CP949 인코딩 환경에서 특수문자 출력 시 크래시 방지 헬퍼"""
    try:
        print(text)
    except UnicodeEncodeError:
        try:
            encoding = sys.stdout.encoding or 'utf-8'
            print(text.encode(encoding, errors='replace').decode(encoding))
        except Exception:
            try:
                print(text.encode('ascii', errors='replace').decode('ascii'))
            except Exception:
                pass


base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, 'tech_monitor.db')

# .env 파일에서 환경변수 로드 시도 (외부 라이브러리 python-dotenv 의존성 제거를 위해 수동 구현)
env_path = os.path.join(base_dir, '.env')
if os.path.exists(env_path):
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                cleaned_line = line.strip()
                if cleaned_line and not cleaned_line.startswith('#') and '=' in cleaned_line:
                    k, v = cleaned_line.split('=', 1)
                    os.environ[k.strip()] = v.strip()
    except Exception as e:
        safe_print(f"[Warning] .env 파일 로드 중 실패: {e}")

# Gemini API 설정 시도
GEMINI_AVAILABLE = False
try:
    import google.generativeai as genai
    # API 키 확인
    api_key = os.environ.get("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)
        GEMINI_AVAILABLE = True
        safe_print("[System] Gemini API 연동 완료 (Active)")
    else:
        safe_print("[System] GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Mock 분석 모드로 동작합니다.")
except ImportError:
    safe_print("[System] google-generativeai 패키지가 설치되지 않았습니다. Mock 분석 모드로 동작합니다.")

def get_gemini_analysis(title, content):
    """Gemini API를 사용하여 요약 및 인사이트 추출"""
    prompt = f"""
    당신은 최첨단 기술 분야(반도체, 2차전지, 전력망, 광통신, AI 로봇)의 전문 기술 투자 분석가입니다.
    다음 기술 정보(기사 또는 논문)를 분석하여 투자 관점의 요약 및 평가를 제공하세요.

    제목: {title}
    본문/요약: {content}

    반드시 아래의 JSON 포맷으로만 응답해야 합니다. 다른 텍스트 설명은 제외하세요:
    {{
        "summary": "1. [첫 번째 핵심 요약]\\n2. [두 번째 핵심 요약]\\n3. [세 번째 핵심 요약]",
        "tech_stage": "Laboratory" 또는 "Pilot" 또는 "Commercial" 중 택1,
        "investment_impact": 1에서 10 사이의 정수 점수 (이 기술 정보가 관련 업계 및 주가에 미칠 파급력),
        "key_tickers": ["대표 기업 티커 1", "대표 기업 티커 2", ...] (예: "NVDA", "005930", "000660" 등 관련 대표 기업 티커 목록, 없으면 빈 배열)
    }}

    성숙도(tech_stage) 분류 기준:
    - Laboratory: 원천 기술 연구, 대학/학술지 발표, 실험실 증명 단계.
    - Pilot: 시제품 개발, 고객사 검증, 공장 파일럿 라인 가동 단계.
    - Commercial: 상용 판매 시작, 대량 양산, 실적 기여 단계.
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"},
            request_options={"timeout": 10.0}
        )
        
        result = json.loads(response.text)
        # 필수 필드 유효성 검증
        if 'summary' in result and 'tech_stage' in result and 'investment_impact' in result:
            # tech_stage 유효값 보정
            if result['tech_stage'] not in ['Laboratory', 'Pilot', 'Commercial']:
                result['tech_stage'] = 'Pilot'
            # investment_impact 범위 보정
            try:
                result['investment_impact'] = max(1, min(10, int(result['investment_impact'])))
            except:
                result['investment_impact'] = 5
            return result
    except Exception as e:
        safe_print(f"[Error] Gemini API 호출 또는 파싱 오류: {e}")
        
    return None

def get_mock_analysis(title, content):
    """API 키가 없는 경우 동작하는 가상(Mock) 분석 엔진"""
    text = (title + " " + content).lower()
    
    # 1. 기술 성숙도 판단
    if any(k in text for k in ["상용화", "양산", "출시", "납품", "공급", "mass prod", "commercial"]):
        tech_stage = "Commercial"
        impact_base = 7
    elif any(k in text for k in ["논문", "연구", "개발", "실험", "laboratory", "paper", "research", "arxiv"]):
        tech_stage = "Laboratory"
        impact_base = 4
    else:
        tech_stage = "Pilot"
        impact_base = 5
        
    # 2. 투자 영향도 (Impact Score) 무작위 편차
    investment_impact = max(1, min(10, impact_base + random.randint(-1, 2)))
    
    # 3. 티커 매칭
    tickers = []
    if any(k in text for k in ["samsung", "삼성"]):
        tickers.append("005930")
    if any(k in text for k in ["hynix", "하이닉스"]):
        tickers.append("000660")
    if any(k in text for k in ["nvidia", "엔비디아"]):
        tickers.append("NVDA")
    if any(k in text for k in ["broadcom", "브로드컴"]):
        tickers.append("AVGO")
    if any(k in text for k in ["tsmc"]):
        tickers.append("TSM")
    if any(k in text for k in ["lg에너지", "lg en", "lgenergy"]):
        tickers.append("373220")
    if any(k in text for k in ["두산", "doosan"]):
        tickers.append("034020")
    
    # 4. 제목 기반 그럴듯한 3줄 요약 조립
    clean_title = re.sub(r'\[.*?\]', '', title).strip()
    summary = (
        f"1. {clean_title} 관련 최신 트렌드가 보고되었습니다.\n"
        f"2. 이 분석 결과는 해당 분야의 기술적 발전 흐름에 중요한 지표가 될 수 있습니다.\n"
        f"3. 투자 관점에서 {tech_stage} 단계의 특성을 보이고 있어, 향후 시장 영향력을 지속 추적할 필요가 있습니다."
    )
    
    return {
        "summary": summary,
        "tech_stage": tech_stage,
        "investment_impact": investment_impact,
        "key_tickers": tickers
    }

def analyze_articles(limit=20):
    """아직 분석되지 않은 기사들을 분석하여 insights 테이블에 저장"""
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON;")
    cursor = conn.cursor()
    
    # 분석 대상 기사 조회 (insights 테이블에 존재하지 않는 아티클)
    cursor.execute("""
        SELECT a.id, a.title, a.content_raw 
        FROM articles a
        LEFT JOIN insights i ON a.id = i.article_id
        WHERE i.article_id IS NULL
        ORDER BY a.category_id DESC, a.id DESC
        LIMIT ?
    """, (limit,))
    
    pending_articles = cursor.fetchall()
    
    if not pending_articles:
        safe_print("[System] 분석할 대기 기사가 없습니다.")
        conn.close()
        return 0
        
    safe_print(f"[System] 총 {len(pending_articles)}개의 기사 분석을 시작합니다.")
    
    analyzed_count = 0
    for article_id, title, content in pending_articles:
        safe_print(f"\n- 기사 분석 중 (ID: {article_id}): {title[:40]}...")
        
        # API 사용 가능 여부에 따라 분기
        analysis = None
        if GEMINI_AVAILABLE:
            # API 할당량 초과 방지를 위한 딜레이
            time.sleep(1)
            analysis = get_gemini_analysis(title, content)
            
        if not analysis:
            analysis = get_mock_analysis(title, content)
            safe_print("  [Mock] Mock 모드로 가공된 분석 결과를 사용합니다.")
            
        try:
            cursor.execute(
                """
                INSERT INTO insights (article_id, summary, tech_stage, investment_impact, key_tickers)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    article_id, 
                    analysis["summary"], 
                    analysis["tech_stage"], 
                    analysis["investment_impact"], 
                    json.dumps(analysis["key_tickers"])
                )
            )
            analyzed_count += 1
            safe_print(f"  [저장 완료] 성숙도: {analysis['tech_stage']}, 영향도: {analysis['investment_impact']}")
        except sqlite3.Error as e:
            safe_print(f"  [저장 실패] DB 에러: {e}")
            
    conn.commit()
    conn.close()
    
    safe_print(f"\n[System] {analyzed_count}개 기사 분석 완료 및 DB 저장 완료.")
    return analyzed_count

if __name__ == "__main__":
    # 초기 테스트로 20개 기사 분석 실행
    analyze_articles(20)
