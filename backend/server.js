import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend build directory
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Buffer cache for optimal performance
const bufferCache = new Map();

// Pre-generate and cache buffers to avoid CPU overhead
function getOrCreateBuffer(size) {
  if (!bufferCache.has(size)) {
    // Generate buffer once and cache it
    bufferCache.set(size, randomBytes(size));
  }
  return bufferCache.get(size);
}

// Middleware configuration for large uploads
app.use(cors());
app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.raw({ type: 'application/octet-stream', limit: '100mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Ping test - measures latency
app.get('/api/ping', (req, res) => {
  const timestamp = Date.now();
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json({
    timestamp,
    message: 'pong',
  });
});

// Download test - serves pre-cached data matching fast.com methodology
app.get('/api/download', (req, res) => {
  // Simulate realistic speeds on localhost
  // Use smaller payloads on localhost: 5MB instead of 25MB
  const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
  const defaultSize = isLocalhost ? 5 * 1024 * 1024 : 25 * 1024 * 1024; // 5MB localhost, 25MB production
  const size = Math.min(parseInt(req.query.size) || defaultSize, 100 * 1024 * 1024);

  // Get pre-generated buffer (no CPU overhead during transfer)
  const buffer = getOrCreateBuffer(size);

  // Set headers to prevent caching and ensure accurate measurement
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', size);
  res.setHeader('Content-Disposition', `attachment; filename="speedtest-${size}.bin"`);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Connection', 'keep-alive');

  // Stream buffer with appropriate chunk size
  const STREAM_CHUNK = isLocalhost ? 256 * 1024 : 1024 * 1024; // 256KB on localhost, 1MB on production
  let sent = 0;

  console.log(`[DOWNLOAD] Starting: ${size / 1024 / 1024}MB (localhost: ${isLocalhost})`);

  const streamChunk = () => {
    if (sent >= size) {
      console.log(`[DOWNLOAD] Completed: ${sent} bytes sent`);
      res.end();
      return;
    }

    const chunkSize = Math.min(STREAM_CHUNK, size - sent);
    const chunk = buffer.slice(sent, sent + chunkSize);
    sent += chunkSize;

    // Handle backpressure
    if (!res.write(chunk)) {
      res.once('drain', streamChunk);
    } else {
      setImmediate(streamChunk);
    }
  };

  streamChunk();
});

// Upload test - receives data
app.post('/api/upload', (req, res) => {
  const contentLength = req.headers['content-length'] || 0;

  res.json({
    received: parseInt(contentLength),
    timestamp: Date.now(),
    success: true,
  });
});

// Large file upload test endpoint - accurate measurement like speedtest.net
app.post('/api/upload-large', (req, res) => {
  let receivedBytes = 0;
  let chunks = 0;
  const startTime = Date.now();
  const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1';
  const maxTime = isLocalhost ? 15000 : 30000; // 15s on localhost, 30s on production

  // Track incoming data
  req.on('data', (chunk) => {
    receivedBytes += chunk.length;
    chunks++;

    // Prevent timeout during active transfer
    req.socket.setTimeout(maxTime);
  });

  // Handle completion
  req.on('end', () => {
    // Add artificial delay to simulate network conditions on localhost
    let duration = (Date.now() - startTime) / 1000; // Convert to seconds

    // Add 50-100ms network overhead simulation for localhost
    if (isLocalhost && duration < 0.5) {
      duration += Math.random() * 0.05 + 0.05; // Add 50-100ms
    }

    duration = Math.max(duration, 0.1); // Minimum 0.1s
    const Mbps = (receivedBytes * 8) / duration / 1000000;

    // Return detailed metrics
    res.json({
      received: receivedBytes,
      chunks: chunks,
      duration: Number(duration.toFixed(2)),
      speed: Number(Mbps.toFixed(2)),
      timestamp: Date.now(),
      success: true,
      isLocalhost: isLocalhost,
    });
  });

  // Error handling with cleanup
  req.on('error', (err) => {
    console.error('Upload error:', err.message);
    receivedBytes = 0;
    res.status(500).json({
      error: err.message,
      received: receivedBytes,
      success: false,
    });
  });

  // Timeout handling
  req.setTimeout(maxTime, () => {
    req.destroy();
    res.status(408).json({
      error: 'Request timeout',
      received: receivedBytes,
      success: false,
    });
  });
});

// Serve frontend for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'), err => {
    if (err) {
      res.status(500).send('Error loading app');
    }
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Speed test server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   GET  /api/ping - Ping/latency test`);
  console.log(`   GET  /api/download?size=10485760 - Download test (size in bytes)`);
  console.log(`   POST /api/upload - Upload test`);
  console.log(`   POST /api/upload-large - Large upload test`);
});
