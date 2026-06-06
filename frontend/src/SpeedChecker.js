import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeedTest from '@cloudflare/speedtest';
import { Download, Upload, Activity, Gauge, Wifi, RadioTower, Gamepad2 } from 'lucide-react';
import './index.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import { articles } from './content';

function SpeedChecker() {
  const testRef = useRef(null);
  const testRunIdRef = useRef(0);

  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [testing, setTesting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

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
      testRunIdRef.current += 1;
      if (testRef.current?.pause) {
        testRef.current.pause();
      }
      testRef.current = null;
    };
  }, [loadNetworkInfo]);

  const stopActiveTest = useCallback(() => {
    const activeTest = testRef.current;
    testRunIdRef.current += 1;

    // Update UI immediately. Any late callbacks from the old test are ignored by runId checks.
    setTesting(false);
    setPaused(true);
    setProgress((prev) => (prev > 0 ? prev : 0));
    testRef.current = null;

    if (activeTest?.pause) {
      activeTest.pause();
    }
  }, []);

  const runTest = useCallback(async () => {
    if (testing) {
      stopActiveTest();
      return;
    }

    const runId = testRunIdRef.current + 1;
    testRunIdRef.current = runId;

    try {
      setTesting(true);
      setPaused(false);
      setDownload(0);
      setUpload(0);
      setPing(0);
      setJitter(0);
      setProgress(4);

      // Refresh network details in the background so the test can start immediately.
      loadNetworkInfo();

      if (testRunIdRef.current !== runId) return;

      const test = new SpeedTest({
        autoStart: false,
        measureDownloadLoadedLatency: true,
        measureUploadLoadedLatency: true,
        measurements: [
          { type: 'latency', numPackets: 3 },
          { type: 'download', bytes: 100_000, count: 3, bypassMinDuration: true },
          { type: 'download', bytes: 1_000_000, count: 4 },
          { type: 'download', bytes: 10_000_000, count: 4 },
          { type: 'upload', bytes: 100_000, count: 3 },
          { type: 'upload', bytes: 1_000_000, count: 4 },
          { type: 'upload', bytes: 5_000_000, count: 3 },
        ],
      });

      testRef.current = test;

      const isCurrentRun = () => testRunIdRef.current === runId && testRef.current === test;

      test.onResultsChange = ({ type }) => {
        if (!isCurrentRun()) return;

        const results = test.results;

        if (type === 'latency') {
          const latency = results.getUnloadedLatency?.();
          const unloadedJitter = results.getUnloadedJitter?.();

          if (latency) setPing(safeNumber(latency));
          if (unloadedJitter) setJitter(safeNumber(unloadedJitter));
          setProgress((prev) => Math.max(prev, 22));
        }

        if (type === 'download') {
          const bps = results.getDownloadBandwidth?.();

          if (bps) {
            const mbps = toMbps(bps);

            setDownload(mbps);

            setProgress((prev) => Math.min(72, Math.max(prev + 7, 32)));
          }
        }

        if (type === 'upload') {
          const bps = results.getUploadBandwidth?.();

          if (bps) {
            setUpload(toMbps(bps));
            setProgress((prev) => Math.min(94, Math.max(prev + 8, 76)));
          }
        }
      };

      test.onFinish = (results) => {
        if (!isCurrentRun()) return;

        setDownload(toMbps(results.getDownloadBandwidth?.()));
        setUpload(toMbps(results.getUploadBandwidth?.()));
        setPing(safeNumber(results.getUnloadedLatency?.()));
        setJitter(safeNumber(results.getUnloadedJitter?.()));
        setProgress(100);
        setTesting(false);
        setPaused(false);
        testRef.current = null;
      };

      test.onError = (error) => {
        if (!isCurrentRun()) return;

        console.error('Speed test error:', error);
        setTesting(false);
        setPaused(false);
        setProgress(0);
        testRef.current = null;
        alert('Speed test failed. Please try again.');
      };

      test.play();
    } catch (error) {
      if (testRunIdRef.current !== runId) return;

      console.error(error);
      setTesting(false);
      setPaused(false);
      setProgress(0);
      testRef.current = null;
      alert(error.message || 'Speed test failed.');
    }
  }, [loadNetworkInfo, stopActiveTest, testing]);

  return (
    <div className="speed-page">
      <div className="speed-app">
        <Header onStartTest={runTest} testing={testing} paused={paused} showAction />

        <main>
          <section className="hero-section">
            <div className="speed-value">{download}</div>
            <div className="speed-unit">Mbps</div>

            <div
              className={`neon-ring ${testing ? 'ring-active' : ''} ${progress >= 100 ? 'ring-complete' : ''}`}
              style={{ '--progress': `${progress}%` }}
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(progress)}
            >
              <span className="progress-label">
                {progress >= 100
                  ? 'Completed'
                  : testing
                    ? `${Math.round(progress)}% testing`
                    : 'Ready to test'}
              </span>
            </div>

            <p className="status-text">
              {testing
                ? 'Testing your internet connection... Click Pause to stop.'
                : paused
                  ? 'Test paused. Click Restart to test again.'
                  : 'Click start button to test your internet speed'}
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

          <section className="visual-strip">
            <div className="visual-card wifi-art">
              <Wifi size={34} />
              <h3>WiFi Quality</h3>
              <p>Check signal, speed and stability.</p>
            </div>
            <div className="visual-card stream-art">
              <RadioTower size={34} />
              <h3>Streaming Ready</h3>
              <p>Understand HD and 4K performance.</p>
            </div>
            <div className="visual-card game-art">
              <Gamepad2 size={34} />
              <h3>Gaming Latency</h3>
              <p>Measure ping and jitter for lag.</p>
            </div>
          </section>

          <section className="seo-box long-content">
            <h1>Free Internet Speed Test for Home, Work, Gaming and Streaming</h1>
            <p>
              Speed Pings is a free internet speed test tool that helps you measure download speed,
              upload speed, ping, jitter and basic network quality from your browser. You can use it
              on mobile, tablet, laptop or desktop to understand whether your connection is suitable
              for browsing, video calls, streaming, online gaming, file downloads and work from
              home. The result gives a practical view of your current connection at the time of
              testing.
            </p>

            <h2>What is internet speed?</h2>
            <p>
              Internet speed describes how fast data moves between your device and the online
              services you use. It is normally shown in Mbps, which means megabits per second. A
              higher Mbps number allows more data to move every second, so websites can load faster,
              videos can stream at higher quality and large files can download more quickly.
              However, speed is not only one number. A good internet connection also needs stable
              latency, low jitter and a reliable WiFi or wired connection. That is why Speed Pings
              shows download speed, upload speed, ping and jitter together instead of focusing only
              on one result.
            </p>

            <h2>How speed testing works</h2>
            <p>
              A speed test transfers sample data between your browser and a test server, then
              calculates how much data moved within a measured time. During the download test, your
              device receives data to estimate how quickly it can pull information from the
              internet. During the upload test, your device sends data to estimate how quickly it
              can share information online. The ping test checks how long a small request takes to
              travel to the server and return. Jitter checks how stable that latency is during the
              test. Results can change based on WiFi signal, router quality, device performance,
              background apps, VPN usage, server distance and local ISP congestion.
            </p>

            <div className="content-grid">
              <article>
                <h2>Download speed meaning</h2>
                <p>
                  Download speed measures how fast your device receives data from the internet. It
                  affects website loading, video streaming, app downloads, game updates, cloud file
                  access and social media browsing. For simple browsing, around 10 Mbps can be
                  enough. For HD streaming, 25 Mbps or more is usually better. For 4K streaming,
                  large downloads and multiple users, 50 to 100 Mbps or higher gives a smoother
                  experience.
                </p>
              </article>
              <article>
                <h2>Upload speed meaning</h2>
                <p>
                  Upload speed measures how fast your device sends data to the internet. It matters
                  for video calls, sending attachments, uploading videos, cloud backup, live
                  streaming and remote work. If your upload speed is low, video calls may become
                  blurry, file uploads may take longer and cloud sync may slow down other activities
                  on your network.
                </p>
              </article>
              <article>
                <h2>Ping meaning</h2>
                <p>
                  Ping is the response time of your connection, measured in milliseconds. Lower ping
                  means your device gets a faster reply from the server. Ping is very important for
                  online gaming, video meetings, live classes, remote desktop and voice calls. A
                  ping below 50 ms is good for most users, while lower than 30 ms is excellent for
                  real-time tasks.
                </p>
              </article>
              <article>
                <h2>Why results can differ</h2>
                <p>
                  Your internet provider may advertise the maximum plan speed, but your real result
                  can be lower because of WiFi distance, router limitations, old cables, many
                  connected devices, network congestion or background downloads. For best results,
                  test near your router, close heavy apps, disconnect unnecessary devices and run
                  multiple tests at different times of the day.
                </p>
              </article>
            </div>

            <h2>How to get a better reading</h2>
            <p>
              For the most accurate result, connect through Ethernet when possible or stand close to
              your WiFi router. Pause downloads, cloud backups, video streaming and large uploads
              before testing. Run the test two or three times and compare the average. If your WiFi
              result is much lower than your plan, test again using a wired connection. If wired
              speed is good but WiFi is poor, your router placement, router age or wireless
              interference may be the main issue. If both wired and WiFi results are poor for many
              days, contact your internet provider with screenshots of several tests.
            </p>
          </section>

          <section className="guide-preview">
            <div className="section-heading">
              <span className="hero-kicker">Helpful guides</span>
              <h2>Learn more about internet speed</h2>
            </div>
            <div className="article-grid compact">
              {articles.slice(0, 6).map((article) => (
                <Link className="article-card" key={article.slug} to={`/blog/${article.slug}`}>
                  <div className="article-visual">
                    <img src={article.image} alt={article.title} loading="lazy" />
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}

export default SpeedChecker;
