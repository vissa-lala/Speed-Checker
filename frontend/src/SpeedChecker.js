import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeedTest from '@cloudflare/speedtest';
import { Download, Upload, Activity, Gauge, Wifi, RadioTower, Gamepad2 } from 'lucide-react';
import './index.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import { articles, faqs } from './content';
import { useCopy } from './i18n';
import { useSEO, appSchema, websiteSchema, organizationSchema } from './seo';

function SpeedPings() {
  useSEO({
    title: 'Free Internet Speed Test | WiFi, Broadband & 5G | Speed Pings',
    description: 'Run a free internet speed test for WiFi, broadband, fiber and 5G. Check download speed, upload speed, ping, jitter and latency online with Speed Pings.',
    path: '/',
    schemas: [appSchema, websiteSchema, organizationSchema, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.slice(0, 6).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }]
  });
  const testRef = useRef(null);
  const testRunIdRef = useRef(0);

  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [testing, setTesting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const copy = useCopy();

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

  const getSpeedRating = () => {
    if (progress < 100 && download === 0 && upload === 0 && ping === 0) {
      return null;
    }

    const downloadScore =
      download >= 100 ? 4 : download >= 50 ? 3 : download >= 25 ? 2 : download >= 10 ? 1 : 0;
    const pingScore =
      ping === 0 ? 2 : ping <= 30 ? 4 : ping <= 50 ? 3 : ping <= 100 ? 2 : ping <= 150 ? 1 : 0;
    const jitterScore =
      jitter === 0
        ? 2
        : jitter <= 10
          ? 4
          : jitter <= 20
            ? 3
            : jitter <= 40
              ? 2
              : jitter <= 60
                ? 1
                : 0;
    const totalScore = downloadScore + pingScore + jitterScore;

    const overall =
      totalScore >= 10
        ? 'Excellent'
        : totalScore >= 7
          ? 'Good'
          : totalScore >= 4
            ? 'Average'
            : 'Poor';
    const streaming =
      download >= 50 ? 'Excellent' : download >= 25 ? 'Good' : download >= 10 ? 'Average' : 'Poor';
    const gaming =
      ping > 0 && ping <= 50 && jitter <= 20
        ? 'Excellent'
        : ping > 0 && ping <= 100
          ? 'Good'
          : ping > 0 && ping <= 150
            ? 'Average'
            : 'Poor';
    const videoCalls =
      upload >= 10 && ping <= 100
        ? 'Excellent'
        : upload >= 5
          ? 'Good'
          : upload >= 2
            ? 'Average'
            : 'Poor';

    return { overall, streaming, gaming, videoCalls };
  };

  const speedRating = getSpeedRating();

  return (
    <div className="speed-page">
      <div className="speed-app">
        <Header />

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
                  ? copy.completed
                  : testing
                    ? `${Math.round(progress)}% ${copy.testingPercent}`
                    : copy.ready}
              </span>
            </div>

            <p className="status-text">
              {testing ? copy.statusTesting : paused ? copy.statusPaused : copy.statusReady}
            </p>

            <button
              className={`run-btn hero-action ${testing ? 'pause-mode' : ''}`}
              onClick={runTest}
            >
              {testing ? copy.pause : paused ? copy.restart : copy.start}
            </button>
          </section>

          <section className="cards">
            <div className="card">
              <Download size={22} />
              <p>{copy.download}</p>
              <h3>{download} Mbps</h3>
            </div>

            <div className="card">
              <Upload size={22} />
              <p>{copy.upload}</p>
              <h3>{upload} Mbps</h3>
            </div>

            <div className="card">
              <Activity size={22} />
              <p>{copy.ping}</p>
              <h3>{ping} ms</h3>
            </div>

            <div className="card">
              <Gauge size={22} />
              <p>{copy.jitter}</p>
              <h3>{jitter} ms</h3>
            </div>
          </section>

          {speedRating && (
            <section className="network-box speed-rating-box" aria-label="Internet speed rating">
              <h2>Speed Rating</h2>
              <div className="network-grid">
                <div>
                  <span>Overall</span>
                  <strong>{speedRating.overall}</strong>
                </div>
                <div>
                  <span>Streaming</span>
                  <strong>{speedRating.streaming}</strong>
                </div>
                <div>
                  <span>Gaming</span>
                  <strong>{speedRating.gaming}</strong>
                </div>
                <div>
                  <span>Video Calls</span>
                  <strong>{speedRating.videoCalls}</strong>
                </div>
              </div>
            </section>
          )}

          <section className="network-box">
            <h2>{copy.networkDetails}</h2>

            <div className="network-grid">
              <div>
                <span>{copy.isp}</span>
                <strong>{network.isp}</strong>
              </div>

              <div>
                <span>{copy.server}</span>
                <strong>{network.server}</strong>
              </div>

              <div>
                <span>{copy.location}</span>
                <strong>{network.location}</strong>
              </div>

              <div>
                <span>{copy.ipAddress}</span>
                <strong>{network.ip}</strong>
              </div>
            </div>
          </section>

          <section class="seo-box quick-seo-section">
            <h1 class="hero-seo-title">Free Internet Speed Test</h1>
            <p class="hero-seo-subtitle">
              Check WiFi speed, broadband speed, 5G speed, download, upload, ping test online and
              jitter in one simple test.
            </p>
          </section>

          <section className="visual-strip">
            <div className="visual-card wifi-art">
              <Wifi size={34} />
              <h3>{copy.wifiQuality}</h3>
              <p>{copy.wifiQualityText}</p>
            </div>
            <div className="visual-card stream-art">
              <RadioTower size={34} />
              <h3>{copy.streamingReady}</h3>
              <p>{copy.streamingReadyText}</p>
            </div>
            <div className="visual-card game-art">
              <Gamepad2 size={34} />
              <h3>{copy.gamingLatency}</h3>
              <p>{copy.gamingLatencyText}</p>
            </div>
          </section>

          <section className="seo-box long-content">
            <h2>{copy.seoTitle}</h2>
            <p>{copy.seoIntro}</p>

            <h2>{copy.whatSpeed}</h2>
            <p>{copy.whatSpeedText}</p>

            <h2>{copy.howWorks}</h2>
            <p>{copy.howWorksText}</p>

            <div className="content-grid">
              <article>
                <h2>{copy.downloadMeaning}</h2>
                <p>
                  Download speed measures how fast your device receives data from the internet. It
                  affects website loading, YouTube and Netflix streaming, app downloads, game
                  updates, cloud file access, social media browsing and software updates. For simple
                  browsing, around 10 Mbps can be enough. For HD streaming, 25 Mbps or more is
                  usually better. For 4K streaming, large downloads and multiple users, 50 to 100
                  Mbps or higher gives a smoother experience.
                </p>
              </article>
              <article>
                <h2>{copy.uploadMeaning}</h2>
                <p>
                  Upload speed measures how fast your device sends data to the internet. It matters
                  for WhatsApp and Zoom video calls, sending attachments, uploading videos, cloud
                  backup, live streaming, online classes and remote work. If your upload speed is
                  low, video calls may become blurry, file uploads may take longer and cloud sync
                  may slow down other activities on your network.
                </p>
              </article>
              <article>
                <h2>{copy.pingMeaning}</h2>
                <p>
                  Ping is the response time of your connection, measured in milliseconds. Lower ping
                  means your device gets a faster reply from the server. Ping is very important for
                  online gaming, video meetings, live classes, remote desktop, voice calls and other
                  real-time apps. A ping below 50 ms is good for most users, while lower than 30 ms
                  is excellent for gaming and real-time communication.
                </p>
              </article>
              <article>
                <h2>{copy.whyDiffer}</h2>
                <p>
                  Your internet provider may advertise the maximum plan speed, but your real speed
                  test result can be lower because of WiFi distance, router limitations, old cables,
                  many connected devices, network congestion, VPN usage, mobile signal quality or
                  background downloads. For best results, test near your router, close heavy apps,
                  disconnect unnecessary devices and run multiple tests at different times of the
                  day.
                </p>
              </article>
            </div>

            <h2>{copy.betterReading}</h2>
            <p>
              For the most accurate internet speed test result, connect through Ethernet when
              possible or stand close to your WiFi router. Pause downloads, cloud backups, video
              streaming, VPN apps and large uploads before testing. Run the test two or three times
              and compare the average. If your WiFi speed test result is much lower than your plan,
              test again using a wired connection. If wired speed is good but WiFi is poor, your
              router placement, router age or wireless interference may be the main issue. If both
              wired and WiFi results are poor for many days, contact your internet provider with
              screenshots of several tests.
            </p>
          </section>

          <section className="guide-preview">
            <div className="section-heading">
              <span className="hero-kicker">{copy.helpfulGuides}</span>
              <h2>{copy.learnMore}</h2>
            </div>
            <div className="article-grid compact">
              {articles.slice(0, 6).map((article) => (
                <Link className="article-card" key={article.slug} to={`/guides/${article.slug}`}>
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

export default SpeedPings;
