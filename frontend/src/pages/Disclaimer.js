import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Disclaimer</h1>
          <p className="last-updated">Last Updated: June 2, 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Speed Test Accuracy Disclaimer</h2>
            <p>
              <strong>Speed Checker provides speed test results that are estimates only</strong> and
              should not be considered as official or guaranteed measurements of your internet
              connection speed. Speed test results are based on network conditions at the moment of
              testing and may vary significantly based on multiple factors.
            </p>
          </section>

          <section>
            <h2>Important Notice</h2>
            <p>By using Speed Checker, you acknowledge and agree that:</p>
            <ol>
              <li>
                <strong>Speed test results are estimates</strong> - Not guaranteed or official
                measurements
              </li>
              <li>
                <strong>Results may vary</strong> - Based on numerous factors beyond our control
              </li>
              <li>
                <strong>No liability</strong> - Speed Checker is not responsible for any reliance on
                test results
              </li>
              <li>
                <strong>For reference only</strong> - Use results for informational purposes only
              </li>
            </ol>
          </section>

          <section>
            <h2>Factors Affecting Speed</h2>
            <p>The following factors can significantly impact speed test results:</p>
            <h3>Network Factors:</h3>
            <ul>
              <li>ISP network congestion</li>
              <li>Peak vs. off-peak hours</li>
              <li>Network infrastructure limitations</li>
              <li>Distance to testing server</li>
            </ul>
            <h3>Connection Factors:</h3>
            <ul>
              <li>WiFi signal strength</li>
              <li>WiFi interference (microwaves, cordless phones, etc.)</li>
              <li>Ethernet connection status</li>
              <li>Wired vs. wireless connection</li>
            </ul>
          </section>

          <section>
            <h2>Verification of Speed</h2>
            <p>If you believe your ISP is not providing contracted speeds:</p>
            <ol>
              <li>Contact your ISP directly - Report suspected speed issues</li>
              <li>Request official testing - ISPs can perform certified speed tests</li>
              <li>Check service agreement - Verify your contracted speed tier</li>
              <li>Test multiple times - Speeds vary throughout the day</li>
            </ol>
          </section>

          <section>
            <h2>Not an Official Service</h2>
            <p>
              Speed Checker is a third-party speed testing service and is{' '}
              <strong>not affiliated with</strong>:
            </p>
            <ul>
              <li>Your Internet Service Provider (ISP)</li>
              <li>Ookla (Speedtest.net)</li>
              <li>Netflix (Fast.com)</li>
              <li>Any telecommunications authority</li>
              <li>Any government agency</li>
            </ul>
          </section>

          <section>
            <h2>No Warranty</h2>
            <p>
              Speed Checker provides this service on an "AS-IS" basis with{' '}
              <strong>no warranties</strong>, either express or implied, including:
            </p>
            <ul>
              <li>No warranty of accuracy</li>
              <li>No warranty of reliability</li>
              <li>No warranty of availability</li>
              <li>No warranty of uninterrupted service</li>
            </ul>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>In no event shall Speed Checker be liable for:</p>
            <ul>
              <li>Inaccurate test results</li>
              <li>Damages from reliance on test results</li>
              <li>Lost data or information</li>
              <li>Business interruption or loss</li>
              <li>Service interruptions</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For questions regarding this disclaimer:</p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> contact@speedchecker.in
              </p>
              <p>
                <strong>Website:</strong> https://speedchecker.in
              </p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Speed Checker
          </Link>
        </div>
      </div>
    </div>
  );
}
