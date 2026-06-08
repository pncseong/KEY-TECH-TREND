-- Categories 테이블: 기술 대분류 및 검색 키워드 정의
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    keywords TEXT NOT NULL, -- JSON formatted string (예: '["HBM", "CXL", "CoWoS"]')
    priority INTEGER DEFAULT 0
);

-- Technical Articles 테이블: 수집된 원본 뉴스 및 논문 데이터
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    source_url TEXT NOT NULL UNIQUE,
    published_at TEXT NOT NULL, -- ISO 8601 string 형식 (예: '2026-06-03T15:00:00')
    content_raw TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- AI Analytic Insights 테이블: Gemini AI가 분석한 핵심 요약 및 투자 인사이트
CREATE TABLE IF NOT EXISTS insights (
    article_id INTEGER PRIMARY KEY,
    summary TEXT NOT NULL, -- AI가 요약한 3줄 요약
    tech_stage TEXT CHECK(tech_stage IN ('Laboratory', 'Pilot', 'Commercial')), -- 기술 성숙도
    investment_impact INTEGER CHECK(investment_impact BETWEEN 1 AND 10), -- 투자 영향도 점수 (1~10)
    key_tickers TEXT, -- JSON formatted string (예: '["$NVDA", "$005930"]')
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- 인덱스 추가로 검색 및 정렬 속도 최적화
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at);
