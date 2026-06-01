#!/bin/bash

echo ""
echo "========================================"
echo "  Neon Speed - Setup Script"
echo "========================================"
echo ""

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi
cd ..

echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "To start development:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
