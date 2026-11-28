@echo off
echo =============================================================
echo   Push Waleed Hassan Portfolio to GitHub
echo   Target: https://github.com/Iwaleedhasan/Portfolio-website.git
echo =============================================================
echo.
git branch -M main

echo Pushing code to origin (main) ...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo =============================================================
    echo [!] Push failed. Please verify your remote configuration and
    echo     GitHub authentication (git remote -v / gh auth login).
    echo =============================================================
) else (
    echo.
    echo =============================================================
    echo [SUCCESS] Your code is live on GitHub!
    echo =============================================================
)
echo.
pause
