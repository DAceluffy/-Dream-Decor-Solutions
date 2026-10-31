@echo off
title Push Dream Decor Solutions to GitHub
color 0A
echo =======================================================
echo Pushing Dream Decor Solutions to GitHub...
echo =======================================================
echo.
cd /d "d:\project\dream-decor-solutions"

echo [1/4] Checking Git Branch...
git branch -M main

echo [2/4] Setting Remote to: https://github.com/DAceluffy/-Dream-Decor-Solutions.git
git remote remove origin 2>nul
git remote add origin https://github.com/DAceluffy/-Dream-Decor-Solutions.git

echo [3/4] Configuring SSL Revocation Settings...
git config http.schannelCheckRevoke false

echo [4/4] Uploading commits to GitHub...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo [SUCCESS] Code successfully pushed to GitHub!
    echo.
    echo Ab bas 2 minute mein website LIVE ho jayegi:
    echo 1. https://github.com/DAceluffy/-Dream-Decor-Solutions
    echo 2. Go to Settings -^> Pages
    echo 3. Branch mein 'main' select karke Save click karein.
    echo.
    echo Live URL: https://daceluffy.github.io/-Dream-Decor-Solutions/
    echo =======================================================
) else (
    echo.
    echo [ERROR] Push failed. Check your internet connection or GitHub login.
)

echo.
pause
