import sqlite3
import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime
import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, 'tech_monitor.db')

# 네임스페이스 정의 (arXiv/Atom 피드 및 RSS 피드 파싱용)
NAMESPACES = {
    'atom': 'http://www.w3.org/2005/Atom',
    'opensearch': 'http://a9.com/-/spec/opensearch/1.1/',
    'arxiv': 'http://arxiv.org/schemas/atom'
}

def clean_html(raw_html):
    """HTML 태그 제거 및 텍스트 정제"""
    if not raw_html:
        return ""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    # 공백 정제
    cleantext = re.sub(r'\s+', ' ', cleantext).strip()
    return cleantext

def fetch_rss_xml(url):
    """지정한 URL의 RSS XML 데이터를 가져옴"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.read()
    except Exception as e:
        print(f"Error fetching URL {url}: {e}")
        return None

def parse_google_news(category_id, keyword):
    """Google News RSS에서 키워드로 뉴스 수집"""
    print(f"Google News: '{keyword}' 키워드 검색 중...")
    encoded_keyword = urllib.parse.quote(keyword)
    # 한국어 뉴스 검색 RSS URL
    url = f"https://news.google.com/rss/search?q={encoded_keyword}&hl=ko&gl=KR&ceid=KR:ko"
    
    xml_data = fetch_rss_xml(url)
    if not xml_data:
        return []
        
    articles = []
    try:
        root = ET.fromstring(xml_data)
        # RSS 2.0 파싱
        for item in root.findall('.//item'):
            title = item.find('title').text if item.find('title') is not None else ""
            link = item.find('link').text if item.find('link') is not None else ""
            pub_date_str = item.find('pubDate').text if item.find('pubDate') is not None else ""
            description = item.find('description').text if item.find('description') is not None else ""
            
            # 날짜 형식 표준화 (RFC 822 -> ISO 8601)
            # pubDate 예: Wed, 03 Jun 2026 06:00:00 GMT
            try:
                dt = datetime.strptime(pub_date_str, "%a, %d %b %Y %H:%M:%S %Z")
                published_at = dt.isoformat()
            except ValueError:
                published_at = datetime.utcnow().isoformat()
                
            articles.append({
                "category_id": category_id,
                "title": title,
                "source_url": link,
                "published_at": published_at,
                "content_raw": clean_html(description) if description else title
            })
    except Exception as e:
        print(f"Error parsing Google News RSS for {keyword}: {e}")
        
    return articles

def parse_arxiv(category_id, keyword):
    """arXiv API (Atom 피드)에서 키워드로 학술 논문 수집"""
    print(f"arXiv: '{keyword}' 키워드 검색 중...")
    encoded_keyword = urllib.parse.quote(keyword)
    # 최근 논문 5개 가져오기
    url = f"http://export.arxiv.org/api/query?search_query=all:{encoded_keyword}&max_results=5&sortBy=submittedDate&sortOrder=descending"
    
    xml_data = fetch_rss_xml(url)
    if not xml_data:
        return []
        
    articles = []
    try:
        root = ET.fromstring(xml_data)
        
        # Atom 피드 파싱
        for entry in root.findall('atom:entry', NAMESPACES):
            title_node = entry.find('atom:title', NAMESPACES)
            title = title_node.text.strip() if title_node is not None else ""
            # 개행 제거
            title = re.sub(r'\s+', ' ', title)
            
            # id 또는 alternate 링크 가져오기
            link_node = entry.find("atom:link[@rel='alternate']", NAMESPACES)
            link = link_node.attrib['href'] if link_node is not None else ""
            if not link:
                id_node = entry.find('atom:id', NAMESPACES)
                link = id_node.text if id_node is not None else ""
                
            published_node = entry.find('atom:published', NAMESPACES)
            published_at = published_node.text if published_node is not None else datetime.utcnow().isoformat()
            
            summary_node = entry.find('atom:summary', NAMESPACES)
            summary = summary_node.text.strip() if summary_node is not None else ""
            summary = re.sub(r'\s+', ' ', summary)
            
            articles.append({
                "category_id": category_id,
                "title": f"[논문] {title}",
                "source_url": link,
                "published_at": published_at,
                "content_raw": summary if summary else title
            })
    except Exception as e:
        print(f"Error parsing arXiv Atom for {keyword}: {e}")
        
    return articles

def is_duplicate_url(cursor, url):
    """이미 데이터베이스에 존재하는 URL인지 확인"""
    cursor.execute("SELECT id FROM articles WHERE source_url = ?", (url,))
    return cursor.fetchone() is not None

def crawl_and_store():
    print("\n========================================")
    print("Starting crawl and storage engine...")
    print("========================================")
    
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON;")
    cursor = conn.cursor()
    
    # 1. 카테고리 및 키워드 로드
    cursor.execute("SELECT id, name, keywords FROM categories")
    categories = cursor.fetchall()
    
    new_articles_count = 0
    
    for cat_id, cat_name, keywords_json in categories:
        keywords = json.loads(keywords_json)
        print(f"\n[카테고리] {cat_name} 분석 시작")
        
        # 키워드별로 뉴스 및 논문 수집
        all_fetched = []
        for kw in keywords:
            # Google News 수집 (최대 10개)
            news_items = parse_google_news(cat_id, kw)
            all_fetched.extend(news_items[:10])
            
            # arXiv 논문 수집 (최대 3개)
            paper_items = parse_arxiv(cat_id, kw)
            all_fetched.extend(paper_items[:3])
            
        # 중복 제거 및 DB 저장
        for item in all_fetched:
            if not item["source_url"]:
                continue
                
            if not is_duplicate_url(cursor, item["source_url"]):
                try:
                    cursor.execute(
                        """
                        INSERT INTO articles (category_id, title, source_url, published_at, content_raw)
                        VALUES (?, ?, ?, ?, ?)
                        """,
                        (item["category_id"], item["title"], item["source_url"], item["published_at"], item["content_raw"])
                    )
                    new_articles_count += 1
                except sqlite3.IntegrityError as e:
                    # 동시성 문제 등으로 예외 처리
                    pass
        
    conn.commit()
    conn.close()
    
    print("\n========================================")
    print(f"Crawl completed. {new_articles_count} new articles added.")
    print("========================================\n")
    return new_articles_count

if __name__ == "__main__":
    crawl_and_store()
