import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Download, Upload, Activity, MapPin, Server } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

function SpeedChecker() {
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [testing, setTesting] = useState(false);
  const [history, setHistory] = useState([]);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Ping test - measures latency (multiple attempts for accuracy)
  const measurePing = useCallback(async () => {
    try {
      const pings = [];

      // Run 3 ping tests and take the average
      for (let i = 0; i < 3; i++) {
        const start = performance.now();
        await fetch(`${API_BASE}/api/ping`, { cache: 'no-store' });
        const end = performance.now();
        pings.push(end - start);
      }

      // Return average ping
      const avgPing = Math.floor(pings.reduce((a, b) => a + b) / pings.length);
      return avgPing;
    } catch (err) {
      console.error('Ping test failed:', err);
      return 0;
    }
  }, [API_BASE]);

  // Download test - matches fast.com methodology (4 parallel streams)
  const measureDownloadSpeed = useCallback(async () => {
    try {
      // Detect if running on localhost for payload sizing
      const isLocalhost = API_BASE.includes('localhost') || API_BASE.includes('127.0.0.1');
      const CHUNK_SIZE = isLocalhost ? 5 * 1024 * 1024 : 25 * 1024 * 1024; // 5MB localhost, 25MB production
      const NUM_PARALLEL = 4; // 4 parallel connections
      const NUM_RUNS = isLocalhost ? 2 : 3; // Fewer runs on localhost for speed
      const speeds = [];

      console.log(
        `Starting download test - localhost: ${isLocalhost}, chunk: ${CHUNK_SIZE / 1024 / 1024}MB`,
      );

      for (let attempt = 0; attempt < NUM_RUNS; attempt++) {
        // Record start time for the entire parallel batch
        const batchStart = performance.now();
        let totalBytes = 0;
        let testDuration = 0;

        // Run 4 parallel downloads
        const promises = Array.from({ length: NUM_PARALLEL }).map(async (_, idx) => {
          try {
            const url = `${API_BASE}/api/download?size=${CHUNK_SIZE}&t=${Date.now()}`;
            console.log(`Download ${idx} starting...`);

            const response = await fetch(url, {
              cache: 'no-store',
              headers: {
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
              },
            });

            if (!response.ok) {
              console.error(`Download ${idx} failed: ${response.status} ${response.statusText}`);
              throw new Error(`Download failed: ${response.status}`);
            }

            // Measure actual bytes received
            const contentLength = response.headers.get('content-length');
            const buffer = await response.arrayBuffer();
            const bytes = buffer.byteLength || parseInt(contentLength) || 0;

            console.log(`Download ${idx} completed: ${bytes} bytes`);
            return bytes;
          } catch (err) {
            console.error(`Download ${idx} error:`, err.message);
            return 0;
          }
        });

        const results = await Promise.all(promises);
        const batchEnd = performance.now();

        totalBytes = results.reduce((sum, bytes) => sum + bytes, 0);
        testDuration = (batchEnd - batchStart) / 1000; // Convert to seconds

        console.log(
          `Download attempt ${attempt}: ${totalBytes} bytes in ${testDuration.toFixed(3)}s`,
        );

        // Only count if test took at least 0.2 seconds (meaningful measurement)
        if (testDuration > 0.2 && totalBytes > 0) {
          const Mbps = (totalBytes * 8) / testDuration / 1000000;
          console.log(`Download speed: ${Mbps.toFixed(2)} Mbps`);
          speeds.push(Mbps);
        }
      }

      if (speeds.length === 0) {
        console.warn('No valid download speeds recorded');
        return 0;
      }

      // Sort and remove extreme outliers (top and bottom)
      speeds.sort((a, b) => a - b);
      console.log(
        'Download speeds:',
        speeds.map((s) => s.toFixed(2)),
      );

      // Remove top 33% and bottom 33% as outliers
      const removeCount = Math.ceil(speeds.length * 0.33);
      const filtered = speeds.slice(removeCount, speeds.length - removeCount);

      // Use average of remaining results
      const average = filtered.reduce((a, b) => a + b) / filtered.length;
      const final = Math.min(Math.max(average, 0.1), isLocalhost ? 500 : 1000);

      console.log(`Download final: ${final.toFixed(2)} Mbps`);
      return final;
    } catch (err) {
      console.error('Download test failed:', err);
      return 0;
    }
  }, [API_BASE]);

  // Upload test - matches speedtest.net methodology (2 parallel uploads)
  const measureUploadSpeed = useCallback(async () => {
    try {
      // Detect if running on localhost for payload sizing
      const isLocalhost = API_BASE.includes('localhost') || API_BASE.includes('127.0.0.1');
      const CHUNK_SIZE = isLocalhost ? 3 * 1024 * 1024 : 10 * 1024 * 1024; // 3MB localhost, 10MB production
      const NUM_PARALLEL = 2; // 2 parallel uploads
      const NUM_RUNS = isLocalhost ? 2 : 3; // Fewer runs on localhost for speed
      const speeds = [];

      console.log(
        `Starting upload test - localhost: ${isLocalhost}, chunk: ${CHUNK_SIZE / 1024 / 1024}MB`,
      );

      for (let attempt = 0; attempt < NUM_RUNS; attempt++) {
        // Record start time for the entire parallel batch
        const batchStart = performance.now();
        let totalBytes = 0;

        // Pre-generate fresh data for this batch
        const dataArrays = Array.from({ length: NUM_PARALLEL }).map(() => {
          const data = new Uint8Array(CHUNK_SIZE);
          crypto.getRandomValues(data);
          return data;
        });

        try {
          console.log(
            `Upload attempt ${attempt}: uploading ${NUM_PARALLEL} x ${CHUNK_SIZE / 1024 / 1024}MB...`,
          );

          // Upload in parallel
          const promises = dataArrays.map((data, idx) =>
            fetch(`${API_BASE}/api/upload-large?t=${Date.now()}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/octet-stream',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
              },
              body: data,
            })
              .then((res) => {
                if (!res.ok) throw new Error(`Upload ${idx} failed: ${res.status}`);
                return res.json();
              })
              .then((result) => {
                console.log(`Upload ${idx} completed: ${result.received} bytes`);
                return result.received || 0;
              })
              .catch((err) => {
                console.error(`Upload ${idx} error:`, err.message);
                return 0;
              }),
          );

          const results = await Promise.all(promises);
          const batchEnd = performance.now();

          totalBytes = results.reduce((sum, bytes) => sum + bytes, 0);
          const testDuration = (batchEnd - batchStart) / 1000; // Convert to seconds

          console.log(
            `Upload attempt ${attempt}: ${totalBytes} bytes in ${testDuration.toFixed(3)}s`,
          );

          // Only count if test took at least 0.2 seconds (meaningful measurement)
          if (testDuration > 0.2 && totalBytes >= CHUNK_SIZE) {
            const Mbps = (totalBytes * 8) / testDuration / 1000000;
            console.log(`Upload speed: ${Mbps.toFixed(2)} Mbps`);
            speeds.push(Mbps);
          }
        } catch (err) {
          console.error('Upload batch failed:', err);
          continue;
        }
      }

      if (speeds.length === 0) {
        console.warn('No valid upload speeds recorded');
        return 0;
      }

      // Sort and remove extreme outliers
      speeds.sort((a, b) => a - b);
      console.log(
        'Upload speeds:',
        speeds.map((s) => s.toFixed(2)),
      );

      // Remove top 33% and bottom 33% as outliers
      const removeCount = Math.ceil(speeds.length * 0.33);
      const filtered = speeds.slice(removeCount, speeds.length - removeCount);

      // Use average of remaining results
      const average = filtered.reduce((a, b) => a + b) / filtered.length;
      const final = Math.min(Math.max(average, 0.1), isLocalhost ? 300 : 1000);

      console.log(`Upload final: ${final.toFixed(2)} Mbps`);
      return final;
    } catch (err) {
      console.error('Upload test failed:', err);
      return 0;
    }
  }, [API_BASE]);

  const runTest = useCallback(async () => {
    try {
      console.log('=== SPEED TEST STARTED ===');
      setTesting(true);
      setDownload(0);
      setUpload(0);
      setPing(0);
      setHistory([]);

      // Step 1: Ping test
      console.log('Starting ping test...');
      const pingResult = await measurePing();
      console.log(`Ping result: ${pingResult}ms`);
      setPing(pingResult);

      // Step 2: Download speed test
      console.log('Starting download test...');
      const downloadSpeed = await measureDownloadSpeed();
      console.log(`Download speed: ${downloadSpeed.toFixed(2)} Mbps`);

      // Step 3: Upload speed test
      console.log('Starting upload test...');
      const uploadSpeed = await measureUploadSpeed();
      console.log(`Upload speed: ${uploadSpeed.toFixed(2)} Mbps`);
      console.log('=== SPEED TEST COMPLETED ===');

      // Animate to final values
      let current = 0;
      const downloadFinal = Number(downloadSpeed.toFixed(2));
      const uploadFinal = Number(uploadSpeed.toFixed(2));
      const step = Math.max(downloadFinal, uploadFinal) / 60;

      const interval = setInterval(() => {
        current += step;

        const downSpeed = Math.min(current, downloadFinal);
        const upSpeed = Math.min(current, uploadFinal);

        if (current >= Math.max(downloadFinal, uploadFinal)) {
          current = Math.max(downloadFinal, uploadFinal);
          clearInterval(interval);
          setTesting(false);
        }

        setDownload(downSpeed.toFixed(2));
        setUpload(upSpeed.toFixed(2));

        setHistory((prev) => [
          ...prev,
          {
            time: prev.length,
            speed: Number(downSpeed.toFixed(2)),
          },
        ]);
      }, 80);
    } catch (err) {
      console.error('Speed test error:', err);
      setTesting(false);
      alert(
        `Speed test failed: ${err.message}\n\nMake sure backend server is running on port 5000`,
      );
    }
  }, [measurePing, measureDownloadSpeed, measureUploadSpeed]);

  useEffect(() => {
    // Auto-run test on component mount
    const timer = setTimeout(() => runTest(), 500);
    return () => clearTimeout(timer);
  }, [runTest]);

  return (
    <div className="main-bg">
      <div className="container py-4">
        {/* HEADER */}
        <div className="topbar">
          <div className="d-flex align-items-center gap-3">
            <Wifi color="#00f7ff" size={34} />
            <h1 className="logo-text">SPEED CHECKER</h1>
          </div>

          <button className="run-btn" onClick={runTest} disabled={testing}>
            {testing ? 'TESTING...' : 'RUN TEST'}
          </button>
        </div>

        {/* TOP CARDS */}
        <div className="row g-4 mt-1">
          <div className="col-6 col-lg-3">
            <MiniCard title="Download" value={`${download} Mbps`} icon={<Download />} />
          </div>

          <div className="col-6 col-lg-3">
            <MiniCard title="Upload" value={`${upload} Mbps`} icon={<Upload />} />
          </div>

          <div className="col-6 col-lg-3">
            <MiniCard title="Ping" value={`${ping} ms`} icon={<Activity />} />
          </div>

          <div className="col-6 col-lg-3">
            <MiniCard title="Status" value={testing ? 'Testing' : 'Stable'} icon={<Wifi />} />
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="glass-panel mt-4">
          {/* SPEED DISPLAY */}
          <motion.div
            key={download}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="speed-display"
          >
            <h1 className="speed-value">{download}</h1>
            <div className="speed-unit">Mbps</div>
          </motion.div>

          {/* GRAPH */}
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f7ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00f7ff" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" stroke="#6ecfff" />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="speed"
                  stroke="#00f7ff"
                  fill="url(#colorSpeed)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM INFO */}
        <div className="row g-4 mt-1">
          <div className="col-md-4">
            <InfoCard title="Server" value="Local" icon={<Server />} />
          </div>

          <div className="col-md-4">
            <InfoCard title="Location" value="Your PC" icon={<MapPin />} />
          </div>

          <div className="col-md-4">
            <InfoCard title="Connection" value="Accurate" icon={<Wifi />} />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer-section">
          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link">
              Privacy Policy
            </Link>
            <span className="separator">|</span>
            <Link to="/terms-of-service" className="footer-link">
              Terms of Service
            </Link>
            <span className="separator">|</span>
            <Link to="/disclaimer" className="footer-link">
              Disclaimer
            </Link>
            <span className="separator">|</span>
            <Link to="/about-us" className="footer-link">
              About Us
            </Link>
            <span className="separator">|</span>
            <Link to="/cookie-policy" className="footer-link">
              Cookie Policy
            </Link>
          </div>
          <p className="footer-copyright">
            © 2026 Speed Checker. All rights reserved. Powered by Speed Checker
          </p>
        </footer>
      </div>
    </div>
  );
}

function MiniCard({ title, value, icon }) {
  return (
    <div className="mini-card">
      <div className="mini-icon">{icon}</div>
      <div className="mini-title">{title}</div>
      <div className="mini-value">{value}</div>
    </div>
  );
}

function InfoCard({ title, value, icon }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-title">{title}</div>
      <div className="info-value">{value}</div>
    </div>
  );
}

export default SpeedChecker;
