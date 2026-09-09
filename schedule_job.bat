@echo off
REM KEY TECH TREND - 09:00 SCHEDULED WORKER
cd /d "c:\Users\�鳲ö\.antigravity\KEY TECH TREND"

set LOG_FILE=schedule_job.log
echo ================================================== > %LOG_FILE%
echo   SCHEDULED JOB START: %date% %time% >> %LOG_FILE%
echo ================================================== >> %LOG_FILE%

echo [1/3] Running Python news crawler and Gemini AI analyzer... >> %LOG_FILE%
"C:\Python313\python.exe" run_pipeline.py >> %LOG_FILE% 2>&1

echo [2/3] Sending daily email report... >> %LOG_FILE%
"C:\Python313\python.exe" send_email_report.py >> %LOG_FILE% 2>&1

echo [3/3] Checking Git repository status... >> %LOG_FILE%
"C:\src\Git\cmd\git.exe" status >> %LOG_FILE% 2>&1

echo [Git] Auto-uploading latest data to GitHub... >> %LOG_FILE%
"C:\src\Git\cmd\git.exe" add data.js data.json >> %LOG_FILE% 2>&1
"C:\src\Git\cmd\git.exe" commit -m "Auto-update tech data" >> %LOG_FILE% 2>&1
"C:\src\Git\cmd\git.exe" push origin main >> %LOG_FILE% 2>&1
echo [Git] Upload complete. >> %LOG_FILE%

echo SCHEDULED JOB FINISHED: %date% %time% >> %LOG_FILE%
