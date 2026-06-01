@echo off
echo.
echo ========================================
echo   Neon Speed - Setup Script
echo ========================================
echo.

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start development:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause
