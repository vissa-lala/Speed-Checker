# Neon Speed - Separate Frontend & Backend

This project now uses a proper client-server architecture with:

- **Backend**: Node.js + Express server (port 5000)
- **Frontend**: React application (port 3000)

## Project Structure

```
Speed-Checker/
├── backend/
│   ├── server.js           # Express server with speed test API
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js          # React component with speed test logic
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── package.json
│   └── .env (optional)
├── package.json
└── README.md
```

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

**For development with auto-reload:**

```bash
npm run dev
```

### 4. Start Frontend (in a new terminal)

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## How Speed Testing Works

### Backend API Endpoints

#### Ping Test

```
GET /api/ping
```

Measures round-trip latency to the server.

#### Download Test

```
GET /api/download?size=10485760
```

Downloads random data and measures speed.

- `size`: Bytes to download (default: 10MB)

#### Upload Test

```
POST /api/upload-large
```

Receives data and measures upload speed.

### Speed Calculation

The frontend measures speed using the **fast.com logic**:

1. **Download**: Multiple files (1MB, 5MB, 10MB) are downloaded sequentially
   - Speed = (Total Bytes × 8 bits) / (Time in seconds) / 1,000,000 = Mbps

2. **Upload**: Multiple data chunks (1MB, 5MB) are uploaded
   - Speed = (Total Bytes × 8 bits) / (Time in seconds) / 1,000,000 = Mbps

3. **Ping**: Measures latency using a simple fetch request
   - Ping = Round-trip time in milliseconds

## Key Improvements

✅ **Accurate Speed Measurement**: Uses actual data transfer instead of external URLs  
✅ **Local Testing**: Backend server runs locally  
✅ **Progressive Testing**: Downloads and uploads multiple file sizes  
✅ **Real-time Animation**: Shows speed building up in real-time  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Production Ready**: Proper error handling and CORS support

## Configuration

### Backend

Set custom port:

```bash
PORT=8000 npm start
```

### Frontend

Create a `.env` file in the frontend folder:

```
REACT_APP_API_URL=http://localhost:5000
```

For production, update this to your backend URL.

## Troubleshooting

### "Speed test failed" error

- Make sure backend is running on port 5000
- Check CORS is enabled (it is by default)
- Check browser console for detailed errors

### Wrong speeds

- Backend must be running locally for accurate measurement
- Network latency between frontend and backend affects results
- Ensure no firewall blocking localhost communication

### Frontend cannot connect to backend

- Verify backend is running: `http://localhost:5000/health`
- Check if you're using a custom port and update `.env` accordingly

## Development

### Adding Features

1. Add new API endpoints in `backend/server.js`
2. Update frontend to call the new endpoints in `frontend/src/App.js`
3. Test both frontend and backend in development mode

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend is ready as-is
```

## Performance Tips

- Backend and frontend should run on the same machine for accurate testing
- Close other bandwidth-consuming applications during testing
- Use a stable internet connection for best results
- Multiple test runs help identify connection stability

## License

MIT
