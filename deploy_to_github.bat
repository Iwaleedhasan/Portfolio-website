@echo off
echo =============================================================
echo   Push Waleed Hassan Portfolio to GitHub
echo   Target: https://github.com/Iwaleedhasan/Portfolio-website.git
echo =============================================================
echo.
git remote remove origin 2>nul
git remote add origin https://github.com/Iwaleedhasan/Portfolio-website.git
git branch -M main

echo Pushing code to https://github.com/Iwaleedhasan/Portfolio-website.git ...
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo =============================================================
    echo [!] PERMISSION ERROR (403):
    echo Your Windows is currently saved with GitHub account: 'Waleedhasn'.
    echo Your new repo belongs to: 'Iwaleedhasan'.
    echo.
    echo CHOOSE A SOLUTION:
    echo.
    echo [Option 1] Add 'Waleedhasn' as a collaborator to your new repo:
    echo            https://github.com/Iwaleedhasan/Portfolio-website/settings/access
    echo            (Then run this bat file again and it pushes instantly!)
    echo.
    echo [Option 2] Switch your Windows Git sign-in to 'Iwaleedhasan':
    echo =============================================================
    set /p CHOICE="Press S to switch Git login to Iwaleedhasan (or any key to exit): "
    if /i "%CHOICE%"=="S" (
        echo.
        echo Removing old saved GitHub account...
        cmdkey /delete:LegacyGeneric:target=git:https://github.com 2>nul
        cmdkey /delete:git:https://github.com 2>nul
        echo.
        echo Sign in with your 'Iwaleedhasan' account in the browser:
        git push -u origin main --force
    )
) else (
    echo.
    echo =============================================================
    echo [SUCCESS] Your code is live on GitHub:
    echo https://github.com/Iwaleedhasan/Portfolio-website
    echo =============================================================
)
echo.
pause
