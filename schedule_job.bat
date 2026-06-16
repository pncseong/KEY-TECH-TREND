@echo off
REM KEY TECH TREND - 09:00 SCHEDULED WORKER
cd /d "c:\Users\백남철\.antigravity\KEY TECH TREND"

echo [1/3] 최신 데이터 수집 및 AI 분석 파이프라인 가동...
"C:\Python313\python.exe" run_pipeline.py

echo [2/3] 분야별 최고 중요 기사 발췌 및 이메일 리포트 발송...
"C:\Python313\python.exe" send_email_report.py

echo [3/3] 깃허브(GitHub) 자동 배포 검사...
git status >nul 2>&1
if %errorlevel% equ 0 (
    echo [배포] 깃허브(GitHub)에 최신 데이터를 자동 업로드하는 중...
    git add data.js data.json
    git commit -m "Auto-update tech data: %date% %time%"
    git push origin main
    echo [완료] 깃허브 배포가 완료되었습니다.
) else (
    echo [정보] 현재 폴더는 Git 저장소가 아닙니다. 로컬 대시보드(index.html)만 갱신되었습니다.
)

echo [완료] 스케줄러 작업이 정상 완료되었습니다.
