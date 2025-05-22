@echo off
echo Instaluji zavislosti...
CALL npm install
echo.
echo Vytvarim build aplikace...
CALL npm run build
echo.
echo Spoustim aplikaci...
CALL npx serve dist
pause