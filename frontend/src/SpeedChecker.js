import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeedTest from '@cloudflare/speedtest';
import { Wifi, Download, Upload, Activity, Gauge } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import './index.css';
import Footer from './components/Footer';

function SpeedChecker() {
  const testRef = useRef(null);

  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [testing, setTesting] = useState(false);
  const [history, setHistory] = useState([]);

  const [network, setNetwork] = useState({
    isp: 'Detecting...',
    server: 'Nearest Test Server',
    location: 'Detecting...',
    ip: 'Detecting...',
  });

  const toMbps = (bps) => {
    if (!bps || !Number.isFinite(bps)) return 0;
    return Math.round((bps / 1_000_000) * 10) / 10;
  };

  const safeNumber = (value) => {
    if (!value || !Number.isFinite(value)) return 0;
    return Math.round(value);
  };

  const loadNetworkInfo = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/', {
        cache: 'no-store',
      });

      const data = await response.json();

      setNetwork({
        isp: data.org || data.network || 'Unknown ISP',
        server: 'Nearest Test Server',
        location: `${data.city || ''}${data.city ? ', ' : ''}${data.country_name || ''}`,
        ip: data.ip || 'Hidden',
      });
    } catch (error) {
      console.error('Network info error:', error);

      setNetwork({
        isp: 'Unable to detect',
        server: 'Nearest Test Server',
        location: 'Unable to detect',
        ip: 'Hidden',
      });
    }
  }, []);

  useEffect(() => {
    loadNetworkInfo();

    return () => {
      if (testRef.current?.pause) {
        testRef.current.pause();
      }
    };
  }, [loadNetworkInfo]);

  const runTest = useCallback(async () => {
    if (testing) return;

    try {
      setTesting(true);
      setDownload(0);
      setUpload(0);
      setPing(0);
      setJitter(0);
      setHistory([]);

      await loadNetworkInfo();

      const test = new SpeedTest({
        autoStart: false,
        measureDownloadLoadedLatency: true,
        measureUploadLoadedLatency: true,
        measurements: [
          { type: 'latency', numPackets: 5 },
          { type: 'download', bytes: 100_000, count: 4, bypassMinDuration: true },
          { type: 'download', bytes: 1_000_000, count: 6 },
          { type: 'download', bytes: 10_000_000, count: 6 },
          { type: 'download', bytes: 25_000_000, count: 4 },
          { type: 'upload', bytes: 100_000, count: 4 },
          { type: 'upload', bytes: 1_000_000, count: 6 },
          { type: 'upload', bytes: 10_000_000, count: 4 },
        ],
      });

      testRef.current = test;

      test.onResultsChange = ({ type }) => {
        const results = test.results;

        if (type === 'latency') {
          const latency = results.getUnloadedLatency?.();
          const unloadedJitter = results.getUnloadedJitter?.();

          if (latency) setPing(safeNumber(latency));
          if (unloadedJitter) setJitter(safeNumber(unloadedJitter));
        }

        if (type === 'download') {
          const bps = results.getDownloadBandwidth?.();

          if (bps) {
            const mbps = toMbps(bps);

            setDownload(mbps);

            setHistory((prev) => [
              ...prev.slice(-25),
              {
                time: prev.length + 1,
                speed: mbps,
              },
            ]);
          }
        }

        if (type === 'upload') {
          const bps = results.getUploadBandwidth?.();

          if (bps) {
            setUpload(toMbps(bps));
          }
        }
      };

      test.onFinish = (results) => {
        setDownload(toMbps(results.getDownloadBandwidth?.()));
        setUpload(toMbps(results.getUploadBandwidth?.()));
        setPing(safeNumber(results.getUnloadedLatency?.()));
        setJitter(safeNumber(results.getUnloadedJitter?.()));
        setTesting(false);
      };

      test.onError = (error) => {
        console.error('Speed test error:', error);
        setTesting(false);
        alert('Speed test failed. Please try again.');
      };

      test.play();
    } catch (error) {
      console.error(error);
      setTesting(false);
      alert(error.message || 'Speed test failed.');
    }
  }, [loadNetworkInfo, testing]);

  return (
    <div className="speed-page">
      <div className="speed-app">
        <header className="topbar">
          <Link to="/" className="logo-link">
            ⚡ SpeedChecker
          </Link>

          <nav className="topnav">
            <Link className="nav-link" to="/blog">
              Blog
            </Link>

            <Link className="nav-link" to="/faq">
              FAQ
            </Link>

            <Link className="nav-link" to="/contact-us">
              Contact
            </Link>
          </nav>

          <button className="run-btn" onClick={runTest} disabled={testing}>
            {testing ? 'Testing...' : 'Start Test'}
          </button>
        </header>

        <main>
          <section className="hero-section">
            <div className="speed-value">{download}</div>
            <div className="speed-unit">Mbps</div>

            <div className={`neon-ring ${testing ? 'ring-active' : ''}`}>
              <div className="ring-inner">
                <Wifi size={34} />
                <span>{testing ? 'Running' : 'Ready'}</span>
              </div>
            </div>

            <p className="status-text">
              {testing
                ? 'Testing your internet connection...'
                : 'Click start to test your internet speed'}
            </p>
          </section>

          <section className="cards">
            <div className="card">
              <Download size={22} />
              <p>Download</p>
              <h3>{download} Mbps</h3>
            </div>

            <div className="card">
              <Upload size={22} />
              <p>Upload</p>
              <h3>{upload} Mbps</h3>
            </div>

            <div className="card">
              <Activity size={22} />
              <p>Ping</p>
              <h3>{ping} ms</h3>
            </div>

            <div className="card">
              <Gauge size={22} />
              <p>Jitter</p>
              <h3>{jitter} ms</h3>
            </div>
          </section>

          <section className="graph-box">
            <h2>Live Speed Graph</h2>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={history}>
                <XAxis dataKey="time" hide />
                <Tooltip
                  contentStyle={{
                    background: '#050816',
                    border: '1px solid #00f7ff',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="speed"
                  stroke="#00f7ff"
                  fill="rgba(0,247,255,0.2)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="network-box">
            <h2>Network Details</h2>

            <div className="network-grid">
              <div>
                <span>ISP</span>
                <strong>{network.isp}</strong>
              </div>

              <div>
                <span>Server</span>
                <strong>{network.server}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{network.location}</strong>
              </div>

              <div>
                <span>IP Address</span>
                <strong>{network.ip}</strong>
              </div>
            </div>
          </section>

          <section className="seo-box">
            <h2>Internet Speed Test</h2>
            <p>
              Check your download speed, upload speed, ping, jitter and network quality instantly.
              SpeedChecker helps you measure your internet connection for streaming, gaming, video
              calls and browsing.
            </p>

            <h2>What is a good internet speed?</h2>
            <p>
              For browsing, 10 Mbps is usually enough. For HD streaming, 25 Mbps or higher is
              better. For gaming and video calls, low ping and low jitter are as important as
              download speed.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default SpeedChecker;
