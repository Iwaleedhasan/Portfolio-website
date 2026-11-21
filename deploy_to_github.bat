@echo off
echo =============================================================
echo   Push Waleed Hassan Portfolio to GitHub
echo =============================================================
echo.
set /p REPONAME="Enter your GitHub repository name (e.g. portfolio): "
if "%REPONAME%"=="" set REPONAME=portfolio

echo.
echo [1/3] Setting remote to: https://github.com/Waleedhasn/%REPONAME%.git
git remote remove origin 2>nul
git remote add origin https://github.com/Waleedhasn/%REPONAME%.git

echo.
echo [2/3] Checking branch status...
git branch -M main

echo.
echo [3/3] Pushing to GitHub (Sign in with your browser if prompted)...
git push -u origin main

echo.
echo =============================================================
echo Done! Your code is on GitHub:
echo https://github.com/Waleedhasn/%REPONAME%
echo.
echo To enable free live website on GitHub Pages:
echo 1. Open: https://github.com/Waleedhasn/%REPONAME%/settings/pages
echo 2. Under 'Branch', select 'main' and '/(root)', then click Save.
echo =============================================================
pause
