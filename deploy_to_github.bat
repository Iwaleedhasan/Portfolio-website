@echo off
echo =============================================================
echo   Push Waleed Hassan Portfolio to GitHub
echo =============================================================
echo.
set /p REPOURL="Enter your GitHub repository URL (press ENTER for default: https://github.com/Iwaleedhasan/Portfolio-website.git): "
if "%REPOURL%"=="" set REPOURL=https://github.com/Iwaleedhasan/Portfolio-website.git

echo.
echo [1/3] Setting remote to: %REPOURL%
git remote remove origin 2>nul
git remote add origin %REPOURL%

echo.
echo [2/3] Checking branch status...
git branch -M main

echo.
echo [3/3] Pushing to GitHub (using stored credentials or browser login)...
git push -u origin main --force

echo.
echo =============================================================
echo Done! Your code is on GitHub:
echo %REPOURL%
echo.
echo To enable free live website on GitHub Pages:
echo 1. Open: https://github.com/Iwaleedhasan/Portfolio-website/settings/pages
echo 2. Under 'Build and deployment' -> 'Source', select 'Deploy from a branch'
echo 3. Select Branch: 'main' and Folder: '/(root)', then click Save!
echo.
echo Your live site will be at:
echo https://iwaleedhasan.github.io/Portfolio-website/
echo =============================================================
pause
