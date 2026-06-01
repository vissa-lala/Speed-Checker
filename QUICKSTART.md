# Quick Start Guide

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Two terminal windows (one for backend, one for frontend)

## One-Command Setup (Windows)

```bash
setup.bat
```

## One-Command Setup (macOS/Linux)

```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

### 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Start Backend (Terminal 1)

```bash
cd backend
npm start
```

You should see:

```
⚡ Speed test server running on http://localhost:5000
```

### 4️⃣ Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Browser will automatically open to `http://localhost:3000`

## Usage

1. Click **"RUN TEST"** button
2. Wait for tests to complete (~30 seconds)
3. View results:
   - Download speed in Mbps
   - Upload speed in Mbps
   - Ping/latency in ms
   - Real-time speed graph

## Directory Structure

```
Speed-Checker/
├── backend/          ← Node.js + Express server
│   ├── server.js
│   └── package.json
├── frontend/         ← React dashboard
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Troubleshooting

### Backend won't start

- Check if port 5000 is in use: `netstat -ano | findstr :5000` (Windows)
- Change port: `PORT=8000 npm start`

### Frontend can't connect to backend

- Verify backend is running: Visit `http://localhost:5000/health` in browser
- Check `.env` file in frontend folder (if exists)

### Inaccurate speeds

- Both apps should run on same machine
- Close bandwidth-consuming apps
- Run test multiple times

## Development Mode

**Backend** (with auto-reload):

```bash
cd backend
npm run dev
```

**Frontend** (auto-reloads by default):

```bash
cd frontend
npm start
```

## Building for Production

```bash
cd frontend
npm run build
```

Creates optimized build in `frontend/build/` folder.

## Documentation

- [Backend API Docs](backend/README.md)
- [Frontend UI Docs](frontend/README.md)
- [Full Documentation](README.md)

## Next Steps

1. ✅ Get both servers running
2. ✅ Run your first speed test
3. ✅ Customize colors/sizes in `frontend/src/index.css`
4. ✅ Add features (check docs for details)

## Support

If you encounter issues:

1. Check browser console (F12 → Console)
2. Check terminal output
3. Verify ports 5000 and 3000 are free
4. Ensure Node.js version is 20.x or higher

---

**Happy testing! 🚀**
