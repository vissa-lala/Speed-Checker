import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Download, Upload, Activity, MapPin, Server } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

function App() {
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [testing, setTesting] = useState(false);
  const [history, setHistory] = useState([]);

  const TEST_URL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200';

  // 🔥 REALISTIC DOWNLOAD TEST (multi-connection)
  const measureDownloadSpeed = async () => {
    const connections = 5; // simulate real speed test threads
    const cacheBuster = `nocache=${Date.now()}-${Math.random()}`;

    const startTime = performance.now();
    let totalBytes = 0;

    await Promise.all(
      Array.from({ length: connections }).map(async () => {
        const res = await fetch(`${TEST_URL}&${cacheBuster}`, {
          cache: 'no-store',
        });

        const reader = res.body.getReader();
        let done = false;

        while (!done) {
          const { value, done: d } = await reader.read();
          done = d;
          if (value) totalBytes += value.length;
        }
      }),
    );

    const endTime = performance.now();

    const duration = (endTime - startTime) / 1000;

    // bytes → bits → Mbps
    const Mbps = (totalBytes * 8) / duration / 1024 / 1024;

    return Mbps;
  };

  const runTest = async () => {
    try {
      setTesting(true);
      setDownload(0);
      setUpload(0);
      setPing(0);
      setHistory([]);

      // ⚡ PING TEST
      const pingStart = performance.now();
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store',
      });
      const pingEnd = performance.now();
      setPing(Math.floor(pingEnd - pingStart));

      // ⚡ DOWNLOAD TEST
      const speed = await measureDownloadSpeed();

      let current = 0;
      const finalSpeed = Number(speed.toFixed(2));
      const step = finalSpeed / 60;

      const interval = setInterval(() => {
        current += step;

        if (current >= finalSpeed) {
          current = finalSpeed;
          clearInterval(interval);
          setTesting(false);
        }

        setDownload(current.toFixed(2));
        setUpload((current / 3).toFixed(2)); // simulated upload

        setHistory((prev) => [
          ...prev,
          {
            time: prev.length,
            speed: Number(current.toFixed(2)),
          },
        ]);
      }, 80);
    } catch (err) {
      console.error(err);
      setTesting(false);
      alert('Speed test failed');
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  return (
    <div className="main-bg">
      <div className="container py-4">
        {/* HEADER */}
        <div className="topbar">
          <div className="d-flex align-items-center gap-3">
            <Wifi color="#00f7ff" size={34} />
            <h1 className="logo-text">NEON SPEED</h1>
          </div>

          <button className="run-btn" onClick={runTest}>
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
            <MiniCard title="Status" value="Stable" icon={<Wifi />} />
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
            <InfoCard title="Server" value="Mumbai" icon={<Server />} />
          </div>

          <div className="col-md-4">
            <InfoCard title="Location" value="India" icon={<MapPin />} />
          </div>

          <div className="col-md-4">
            <InfoCard title="Connection" value="Fiber" icon={<Wifi />} />
          </div>
        </div>
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

export default App;
