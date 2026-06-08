# KEY TECH TREND MONITOR (5대 핵심 기술 자동 모니터링 시스템)

이 시스템은 투자 및 비즈니스 의사 결정을 돕기 위해 **반도체, 2차전지, 전력망, 광통신, AI 로봇** 등 5대 핵심 기술 분야의 최신 학술 논문(arXiv) 및 뉴스(Google News)를 자동으로 수집하고, AI를 활용해 요약 및 투자 인사이트를 도출하여 현대적인 다크 모드 대시보드로 시각화하는 로컬 플랫폼입니다.

---

## 🛠️ 기술 스택 (Technology Stack)

- **Database**: SQLite (로컬 가볍고 안정적인 관계형 DB)
- **Backend & Crawler**: Python 3 (urllib.request, XML Parser 기반 표준 크롤러 - 추가 패키지 없이 동작 가능)
- **AI Engine**: Google Gemini API (Mock 자동 폴백 모드 지원)
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism & Neon Accent), Vanilla Javascript (data.json 연동)

---

## 🚀 시작 가이드 (Quick Start)

### 1. Python 환경 준비 및 파이프라인 실행
시스템은 Python 3 기본 라이브러리 위주로 개발되어 별도의 `pip` 설치 없이도 즉시 작동합니다.

1. **최신 데이터 수집 및 분석 실행**:
   윈도우 터미널(PowerShell 또는 CMD)을 열어 본 프로젝트 폴더로 이동한 후, 아래 명령어를 실행하여 수집 및 분석 파이프라인을 구동합니다.
   ```bash
   python run_pipeline.py
   ```
   *이 명령어를 실행하면 `crawler_engine.py`가 작동하여 최신 기사를 수집하고, `llm_analyzer.py`가 AI 분석을 수행한 뒤, `data.json`으로 결과를 내보냅니다.*

### 2. 웹 대시보드 열기
1. 폴더 내의 **`index.html`** 파일을 더블 클릭하여 웹 브라우저(Chrome, Edge 등)로 열어 대시보드를 즉시 확인합니다.
2. 혹은 VS Code의 `Live Server` 확장을 사용하거나 파이썬의 간이 웹 서버를 열어 로컬에서 실행할 수도 있습니다:
   ```bash
   python -m http.server 8000
   ```
   그 후 브라우저에서 `http://localhost:8000`으로 접속합니다.

---

## 🤖 Gemini AI API 키 설정 방법

현재는 API Key가 없어도 작동하도록 **가상 분석(Mock Analyzer)** 기능이 설계되어 정상적으로 대시보드가 로딩됩니다. 실질적인 AI 인사이트 분석을 활성화하려면 Google AI Studio에서 발급받은 API 키를 설정해 주세요.

### 윈도우(Windows)에서 API Key 설정 방법
1. **임시 설정 (현재 터미널 창에서만 유효)**:
   PowerShell에서 아래 명령어를 실행하고 파이프라인을 실행합니다.
   ```powershell
   $env:GEMINI_API_KEY="본인의_실제_API_KEY_값"
   python run_pipeline.py
   ```
2. **영구 설정 (시스템 전체 설정)**:
   - `시작` -> `시스템 환경 변수 편집` 검색 후 실행
   - `환경 변수` 클릭 -> `사용자 변수` 영역에서 `새로 만들기` 클릭
   - 변수 이름: `GEMINI_API_KEY`, 변수 값: `본인의_실제_API_KEY_값` 입력 후 확인
   - 이후 새로운 터미널 창을 열면 자동으로 API 키가 주입되어 활성화됩니다.
3. **Python 라이브러리 설치**:
   Gemini API 연동을 사용하려면 아래 라이브러리를 설치해 주세요.
   ```bash
   pip install google-generativeai
   ```

---

## 📂 파일 구조 및 역할

- 📄 `tech_monitor.db`: 수집된 원본 및 가공 데이터가 저장되는 SQLite 데이터베이스.
- 📄 `db_schema.sql` / `init_db.py`: 데이터베이스 테이블 설계 스키마 및 초기 카테고리 데이터 주입 스크립트.
- 📄 `crawler_engine.py`: Google News 및 arXiv RSS 데이터를 실시간으로 크롤링하여 DB에 적재하는 엔진.
- 📄 `llm_analyzer.py`: 수집된 기사의 3줄 요약, 기술 성숙도 판단, 투자 영향도(Impact Score) 및 티커 분석 엔진.
- 📄 `run_pipeline.py`: 수집, 분석 및 대시보드 데이터 연동을 위한 종합 원클릭 실행 파이프라인.
- 📄 `data.json`: 대시보드 웹이 읽어들이는 최종 데이터 파일.
- 📄 `index.html` / `style.css` / `app.js`: 프리미엄 앰비언트 다크 테마 대시보드 웹 애플리케이션.
