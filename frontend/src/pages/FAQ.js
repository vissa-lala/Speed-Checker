import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function FAQ() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">
            Answers about internet speed tests, download speed, upload speed, ping, and jitter.
          </p>
        </div>

        <div className="legal-content">
          <section>
            <h2>What is SpeedChecker?</h2>
            <p>
              SpeedChecker is a free internet speed test tool that helps you check your download
              speed, upload speed, ping, jitter, and basic network quality from your browser.
            </p>
          </section>

          <section>
            <h2>Why are my results different from Other Testing Sites?</h2>
            <p>
              Different speed test tools may use different servers, routes, and measurement methods.
              Your result can also change depending on WiFi strength, background downloads, VPN
              usage, device performance, and ISP congestion.
            </p>
          </section>

          <section>
            <h2>What is a good download speed?</h2>
            <p>
              For normal browsing, 10 Mbps can be enough. For HD streaming, 25 Mbps or higher is
              better. For 4K streaming or multiple users, 50–100 Mbps or higher is recommended.
            </p>
          </section>

          <section>
            <h2>What is a good upload speed?</h2>
            <p>
              Upload speed matters for video calls, cloud backups, file uploads, online classes, and
              livestreaming. For video calls, 5–10 Mbps upload is usually good.
            </p>
          </section>

          <section>
            <h2>What is ping?</h2>
            <p>
              Ping is the time it takes for data to travel from your device to a server and back. It
              is measured in milliseconds. Lower ping is better for gaming, video calls, and
              real-time apps.
            </p>
          </section>

          <section>
            <h2>What is jitter?</h2>
            <p>
              Jitter is the variation in ping over time. Low jitter means a more stable connection.
              High jitter can cause video freezing, voice delay, and gaming lag.
            </p>
          </section>

          <section>
            <h2>How can I get a more accurate speed test result?</h2>
            <ul>
              <li>Use Ethernet instead of WiFi when possible</li>
              <li>Close downloads, streaming apps, and VPNs</li>
              <li>Move closer to your router</li>
              <li>Disconnect unused devices</li>
              <li>Test multiple times at different times of day</li>
            </ul>
          </section>

          <section>
            <h2>Is SpeedChecker free?</h2>
            <p>Yes. SpeedChecker is free to use and does not require registration.</p>
          </section>

          <section>
            <h2>Related Pages</h2>
            <ul>
              <li>
                <Link to="/">Run an Internet Speed Test</Link>
              </li>
              <li>
                <Link to="/blog">Read Internet Speed Guides</Link>
              </li>
              <li>
                <Link to="/about-us">About SpeedChecker</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Speed Test
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
