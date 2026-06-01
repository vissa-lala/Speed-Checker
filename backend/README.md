# Neon Speed Backend

A high-performance Node.js + Express server for accurate internet speed measurement using the fast.com logic.

## Features

- ⚡ **Accurate Speed Testing**: Measure download, upload, and ping using actual data transfer
- 🚀 **Progressive Testing**: Download/upload multiple file sizes for accuracy
- 🔒 **CORS Enabled**: Works with any frontend
- 📊 **Production Ready**: Error handling and proper response headers

## Installation

```bash
npm install
```

## Running

**Development** (with auto-reload):

```bash
npm run dev
```

**Production**:

```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Health Check

```
GET /health
```

Returns server status.

**Response:**

```json
{
  "status": "ok"
}
```

### Ping Test

```
GET /api/ping
```

Measures round-trip latency.

**Response:**

```json
{
  "timestamp": 1700000000000,
  "message": "pong"
}
```

**How to use:**

```javascript
const start = performance.now();
await fetch('http://localhost:5000/api/ping');
const ping = Math.floor(performance.now() - start);
```

### Download Test

```
GET /api/download?size=10485760
```

Serves random binary data to measure download speed.

**Query Parameters:**

- `size` (optional): Size in bytes. Default: 10MB (10485760 bytes)

**Example sizes:**

- 1MB: `1048576`
- 5MB: `5242880`
- 10MB: `10485760`

**How to use:**

```javascript
const start = performance.now();
const response = await fetch('http://localhost:5000/api/download?size=10485760', {
  cache: 'no-store',
});
const buffer = await response.arrayBuffer();
const time = (performance.now() - start) / 1000; // seconds
const Mbps = (buffer.byteLength * 8) / time / 1000000;
```

### Upload Test

```
POST /api/upload
```

Receives form data for simple uploads.

**Request:**

```javascript
await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  body: formData,
});
```

**Response:**

```json
{
  "received": 1048576,
  "timestamp": 1700000000000,
  "success": true
}
```

### Large Upload Test

```
POST /api/upload-large
```

Optimized endpoint for measuring large uploads. Use this for accurate speed testing.

**Request:**

```javascript
const data = new Uint8Array(5242880); // 5MB random data
const start = performance.now();
const response = await fetch('http://localhost:5000/api/upload-large', {
  method: 'POST',
  headers: { 'Content-Type': 'application/octet-stream' },
  body: data,
});
const time = (performance.now() - start) / 1000;
const Mbps = (data.byteLength * 8) / time / 1000000;
```

**Response:**

```json
{
  "received": 5242880,
  "timestamp": 1700000000000,
  "success": true
}
```

## Speed Testing Strategy (fast.com Logic)

1. **Ping**: Single request to measure latency
2. **Download**:
   - Test 1MB file
   - Test 5MB file
   - Test 10MB file
   - Calculate average Mbps
3. **Upload**:
   - Send 1MB data
   - Send 5MB data
   - Calculate average Mbps

## Configuration

### Environment Variables

```bash
# Port (default 5000)
PORT=5000

# CORS origin (default *)
CORS_ORIGIN=*
```

Example:

```bash
PORT=8000 npm start
```

## How It Works

### Download Speed

When you request `/api/download`:

1. Server generates random binary data of specified size
2. Sends it to the client with proper headers to prevent caching
3. Client reads the entire response and measures time
4. Speed = (Bytes × 8 bits) ÷ (Time in seconds) ÷ 1,000,000 = **Mbps**

### Upload Speed

When you POST to `/api/upload-large`:

1. Server accepts the binary data stream
2. Counts all received bytes
3. Responds with total bytes received
4. Client calculates time and computes speed

### Advantages

- ✅ Uses actual network transfer, not simulated
- ✅ No external CDN dependencies
- ✅ Measures true local network speed
- ✅ Configurable file sizes for different scenarios
- ✅ Proper caching headers prevent misleading results

## Testing with cURL

```bash
# Health check
curl http://localhost:5000/health

# Ping test
curl http://localhost:5000/api/ping

# Download 1MB test
curl -O http://localhost:5000/api/download?size=1048576

# Upload test (create test file first)
dd if=/dev/urandom bs=1M count=5 of=testfile
curl -X POST --data-binary @testfile http://localhost:5000/api/upload-large
```

## Performance Tips

- Run backend on same machine as frontend for testing
- Use wired connection for most accurate results
- Close other bandwidth-consuming apps
- Run multiple tests for consistent results
- Backend can handle concurrent requests efficiently

## Troubleshooting

### High RAM Usage

The server generates data in memory. For very large uploads:

- Reduce request size limits in production
- Use compression if supported

### Slow Speeds

- Check actual network bandwidth
- Ensure backend and frontend on same/fast connection
- Test with different file sizes

### CORS Errors

CORS is enabled by default for all origins. To restrict:
Edit `server.js`:

```javascript
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
```

## License

MIT
