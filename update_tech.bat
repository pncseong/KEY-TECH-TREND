@echo off
title KEY TECH TREND - AUTO UPDATE
echo ==================================================
echo   8대 핵심 기술 정보 실시간 수집 및 AI 분석 중...
echo ==================================================
echo 1. Google News 및 arXiv 최신 소식 크롤링 시작
echo 2. 유료 Gemini AI 연동 투자 영향도 및 요약 분석 진행
echo 3. 대시보드 연동 데이터(data.js) 최종 업데이트
echo ==================================================
echo 잠시만 기다려 주십시오. (약 1분 소요)
echo.

cd /d "c:\Users\백남철\.antigravity\KEY TECH TREND"
"C:\Python313\python.exe" run_pipeline.py

echo.
echo ==================================================
echo [완료] 최신 데이터 갱신 작업이 성공적으로 끝났습니다!
echo 대시보드(index.html) 창으로 가셔서 [F5] 새로고침을 누르세요.
echo ==================================================
pause
