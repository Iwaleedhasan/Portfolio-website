@echo off
echo =============================================================
echo   Push Waleed Hassan Portfolio to GitHub
echo =============================================================
echo.
set /p REPONAME="Enter your GitHub repository name (press ENTER for default: Computer-science-Portfolio-website): "
if "%REPONAME%"=="" set REPONAME=Computer-science-Portfolio-website

echo.
echo [1/3] Setting remote to: https://github.com/Waleedhasn/%REPONAME%.git
git remote remove origin 2>nul
git remote add origin https://github.com/Waleedhasn/%REPONAME%.git

echo.
echo [2/3] Checking branch status...
git branch -M main

echo.
echo [3/3] Pushing to GitHub (using stored credentials or browser login)...
git push -u origin main --force

echo.
echo =============================================================
echo Done! Your code is on GitHub:
echo https://github.com/Waleedhasn/%REPONAME%
echo.
echo To enable free live website on GitHub Pages:
echo 1. Open: https://github.com/Waleedhasn/%REPONAME%/settings/pages
echo 2. Under 'Build and deployment' -> 'Source', select 'Deploy from a branch'
echo 3. Select Branch: 'main' and Folder: '/(root)', then click Save!
echo.
echo Your live site will be at:
echo https://waleedhasn.github.io/%REPONAME%/
echo =============================================================
pause
