import sqlite3
import json
import os
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timedelta

# 절대 경로 설정
base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, 'tech_monitor.db')

# .env 파일에서 환경변수 로드
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
        print(f"[Warning] .env 파일 로드 중 실패: {e}")

# 설정값 읽기
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.environ.get("SMTP_APP_PASSWORD")
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL")

def get_top_articles(test_mode=False):
    """
    최근 24시간 이내 수집되어 AI 분석이 완료된 기사 중 카테고리별 최고 영향도 뉴스 1선 추출
    test_mode=True인 경우, 시간 제한 없이 각 카테고리별 가장 영향도가 높은 최신 기사 추출
    """
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    time_filter = ""
    params = []
    
    if not test_mode:
        # 최근 24시간 이내 수집된 뉴스만 필터링 (SQLite는 UTC 기준)
        time_filter = "WHERE a.published_at >= datetime('now', '-24 hours')"
        print("[System] 실시간 모드: 최근 24시간 이내의 뉴스를 분석합니다.")
    else:
        print("[System] 테스트 모드: 시간 제한 없이 카테고리별 가장 영향도가 높은 최신 뉴스를 추출합니다.")
        
    query = f"""
    WITH RankedArticles AS (
        SELECT 
            a.category_id, 
            c.name as category_name, 
            a.title, 
            a.source_url, 
            i.summary, 
            i.investment_impact,
            a.published_at,
            ROW_NUMBER() OVER (
                PARTITION BY a.category_id 
                ORDER BY i.investment_impact DESC, a.published_at DESC
            ) as rn
        FROM articles a
        JOIN categories c ON a.category_id = c.id
        JOIN insights i ON a.id = i.article_id
        {time_filter}
    )
    SELECT category_name, title, source_url, summary, investment_impact, published_at
    FROM RankedArticles
    WHERE rn = 1
    ORDER BY category_id ASC;
    """
    
    try:
        cursor.execute(query, params)
        rows = cursor.fetchall()
        articles = [dict(row) for row in rows]
        
        # 24시간 이내 데이터가 없는데 실시간 모드인 경우 자동 폴백 안내
        if not articles and not test_mode:
            print("[System] 최근 24시간 동안 요약된 뉴스가 없습니다. 메일 발송이 생략되거나 테스트 모드로 시도해야 합니다.")
            
        return articles
    except sqlite3.Error as e:
        print(f"[Error] 데이터베이스 쿼리 오류: {e}")
        return []
    finally:
        conn.close()

def build_html_template(articles):
    """이메일용 HTML 본문 템플릿 생성"""
    date_str = datetime.now().strftime("%Y년 %m월 %d일")
    
    # 카테고리별 고유 색상 설정 (배지용)
    color_map = {
        "반도체": "#00f2fe",
        "2차전지": "#38ef7d",
        "전력망": "#ffdb01",
        "광통신": "#a18cd1",
        "AI 로봇": "#ff4e50",
        "데이터센터 냉각": "#00ffd0",
        "온디바이스 AI": "#ff007f",
        "우주 통신": "#ffaa00"
    }

    articles_html = ""
    for art in articles:
        # 카테고리 이름에서 괄호 앞부분만 추출
        cat_short = art['category_name'].split(' (')[0]
        badge_color = color_map.get(cat_short, "#3b82f6")
        
        # AI 요약 3줄 줄바꿈 처리
        summary_lines = art['summary'].split('\n')
        summary_html = "".join([f"<li style='margin-bottom: 6px; line-height: 1.5;'>{line.strip()}</li>" for line in summary_lines if line.strip()])
        
        articles_html += f"""
        <!-- 카드 시작 -->
        <div style="background-color: #1a2235; border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 5px solid {badge_color}; border-top: 1px solid rgba(255,255,255,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="background-color: rgba(255,255,255,0.05); color: {badge_color}; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 4px; border: 1px solid {badge_color}33;">
                    {cat_short}
                </span>
                <span style="background-color: rgba(239,68,68,0.15); color: #fca5a5; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(239,68,68,0.3);">
                    중요도 Impact {art['investment_impact']}
                </span>
            </div>
            
            <h3 style="margin-top: 0; margin-bottom: 14px; font-size: 18px; font-weight: bold;">
                <a href="{art['source_url']}" target="_blank" style="color: #ffffff; text-decoration: none; hover: color: #3b82f6;">
                    {art['title']}
                </a>
            </h3>
            
            <div style="background-color: rgba(0,0,0,0.2); border-radius: 8px; padding: 15px; border: 1px solid rgba(255,255,255,0.03);">
                <div style="color: #3b82f6; font-size: 11px; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                    ✨ AI Insight Summary
                </div>
                <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 14px;">
                    {summary_html}
                </ul>
            </div>
            
            <div style="margin-top: 12px; text-align: right;">
                <a href="{art['source_url']}" target="_blank" style="display: inline-block; color: #3b82f6; font-size: 13px; font-weight: 600; text-decoration: none;">
                    상세 원문 보기 →
                </a>
            </div>
        </div>
        <!-- 카드 끝 -->
        """

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="background-color: #0b0f19; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px; margin: 0;">
        <div style="max-width: 650px; margin: 0 auto;">
            
            <!-- 헤더 영역 -->
            <div style="text-align: center; padding-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1.5px; color: #00f2fe;">
                    KEY TECH TREND MONITOR
                </h1>
                <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">
                    {date_str} 분야별 핵심 투자 정보 일일 브리핑 (최고 중요도 뉴스 1선)
                </p>
            </div>
            
            <!-- 아티클 카드 목록 -->
            {articles_html}
            
            <!-- 푸터 영역 -->
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); color: #64748b; font-size: 12px;">
                <p>본 메일은 수집된 최신 기술 데이터 중 중요도가 높은 정보만 엄선하여 매일 아침 09:00에 자동 발송됩니다.</p>
                <p>© 2026 KEY TECH TREND MONITOR. Powered by Gemini AI & Antigravity.</p>
            </div>
            
        </div>
    </body>
    </html>
    """
    return html_body

def send_email(html_content):
    """SMTP를 통한 메일 발송"""
    if not SMTP_EMAIL or not SMTP_APP_PASSWORD or not RECIPIENT_EMAIL:
        print("[Error] 이메일 발송 설정 정보가 누락되었습니다. .env 파일을 확인해 주세요.")
        return False

    # 이메일 객체 조립
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"[KEY TECH TREND] {datetime.now().strftime('%m/%d')} 기술 분야별 최고 중요 소식 1선"
    msg['From'] = SMTP_EMAIL
    msg['To'] = RECIPIENT_EMAIL

    msg.attach(MIMEText(html_content, 'html'))

    try:
        # Gmail SMTP 연결 및 로그인
        print(f"[System] Gmail SMTP 연결 중 (계정: {SMTP_EMAIL})...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)
        
        # 메일 발송
        print(f"[System] 이메일 전송 중 (수신인: {RECIPIENT_EMAIL})...")
        server.send_message(msg)
        server.quit()
        print("[System] 이메일이 성공적으로 발송되었습니다!")
        return True
    except Exception as e:
        print(f"[Error] 이메일 발송 중 오류 발생: {e}")
        return False

def main():
    # 실행 시 인자로 '--test'가 들어가면 시간 필터링 없이 최고 핵심 기사 전송
    test_mode = '--test' in sys.argv
    
    articles = get_top_articles(test_mode=test_mode)
    
    if not articles:
        print("[System] 발송할 뉴스가 없어 메일 전송이 취소되었습니다.")
        return
        
    html_content = build_html_template(articles)
    send_email(html_content)

if __name__ == "__main__":
    main()
