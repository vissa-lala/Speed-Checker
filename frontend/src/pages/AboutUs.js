import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>About Speed Checker</h1>
          <p className="subtitle">Your Trusted Internet Speed Test Tool</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Who We Are</h2>
            <p>
              Speed Checker is a free, fast, and accurate internet speed testing service designed to
              help you understand your connection quality. We provide real-time measurements of your
              download speed, upload speed, and latency (ping) using advanced testing methodologies.
            </p>
          </section>

          <section>
            <h2>Our Mission</h2>
            <p>To provide users with:</p>
            <ul>
              <li>
                <strong>Accurate speed testing</strong> using industry-standard methods
              </li>
              <li>
                <strong>Simple, accessible interface</strong> for everyone to use
              </li>
              <li>
                <strong>Detailed insights</strong> into internet connection quality
              </li>
              <li>
                <strong>Fast results</strong> without unnecessary complexity
              </li>
              <li>
                <strong>Free service</strong> with no hidden charges or subscriptions
              </li>
            </ul>
          </section>

          <section>
            <h2>Why Speed Checker?</h2>
            <h3>Simple & Fast</h3>
            <ul>
              <li>No registration required</li>
              <li>No installation needed</li>
              <li>Results in seconds</li>
              <li>Mobile and desktop friendly</li>
            </ul>
            <h3>Accurate Testing</h3>
            <ul>
              <li>Multi-parallel connection testing (like professional services)</li>
              <li>Real data transfer measurement</li>
              <li>No external dependencies</li>
              <li>Realistic test sizes matching real-world usage</li>
            </ul>
            <h3>Privacy Focused</h3>
            <ul>
              <li>No personal data collection</li>
              <li>No account creation required</li>
              <li>No data selling</li>
              <li>Complete transparency</li>
            </ul>
          </section>

          <section>
            <h2>How Speed Checker Works</h2>
            <ol>
              <li>
                <strong>Ping Test</strong> - Measures the round-trip latency between your device and
                our server
              </li>
              <li>
                <strong>Download Speed Test</strong> - Multiple parallel connections download data
                simultaneously
              </li>
              <li>
                <strong>Upload Speed Test</strong> - Sequential data uploads measure your upload
                bandwidth capacity
              </li>
            </ol>
          </section>

          <section>
            <h2>Our Testing Methodology</h2>
            <p>We use advanced techniques similar to professional speed testing services:</p>
            <ul>
              <li>
                <strong>Parallel connections</strong> - Multiple simultaneous data streams
              </li>
              <li>
                <strong>Streaming transfers</strong> - Efficient data flow management
              </li>
              <li>
                <strong>Realistic test sizes</strong> - 5MB+ for accurate results
              </li>
              <li>
                <strong>Crypto-secure randomness</strong> - True random data generation
              </li>
              <li>
                <strong>Multiple attempts</strong> - Average results for consistency
              </li>
            </ul>
          </section>

          <section>
            <h2>Features</h2>
            <ul>
              <li>✓ Download Speed Testing</li>
              <li>✓ Upload Speed Testing</li>
              <li>✓ Ping/Latency Testing</li>
              <li>✓ Real-time Visualization</li>
              <li>✓ Mobile Responsive</li>
              <li>✓ Dark Theme</li>
              <li>✓ No Ads</li>
              <li>✓ Privacy First</li>
            </ul>
          </section>

          <section>
            <h2>Use Cases</h2>
            <p>Speed Checker is useful for:</p>
            <ul>
              <li>
                <strong>Verifying ISP speed claims</strong> - Check if you get promised speeds
              </li>
              <li>
                <strong>Troubleshooting connection issues</strong> - Diagnose network problems
              </li>
              <li>
                <strong>Comparing networks</strong> - Test different locations or times
              </li>
              <li>
                <strong>Game/streaming verification</strong> - Check if you have enough speed
              </li>
              <li>
                <strong>Business connectivity</strong> - Verify business internet quality
              </li>
              <li>
                <strong>Network optimization</strong> - Monitor improvements after changes
              </li>
            </ul>
          </section>

          <section>
            <h2>Understanding Your Results</h2>
            <h3>Download Speed (Mbps)</h3>
            <ul>
              <li>How fast you receive data</li>
              <li>Important for: Streaming, browsing, downloads</li>
              <li>Good speed: 25+ Mbps</li>
            </ul>
            <h3>Upload Speed (Mbps)</h3>
            <ul>
              <li>How fast you send data</li>
              <li>Important for: Video calls, streaming, uploads</li>
              <li>Good speed: 5+ Mbps</li>
            </ul>
            <h3>Ping/Latency (ms)</h3>
            <ul>
              <li>Time for data to reach server and return</li>
              <li>Important for: Gaming, video calls, responsiveness</li>
              <li>Good latency: &lt;50 ms</li>
            </ul>
          </section>

          <section>
            <h2>Contact & Support</h2>
            <p>Have questions? Contact us:</p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> contact@speedchecker.in
              </p>
              <p>
                <strong>Website:</strong> https://speedchecker.in
              </p>
              <p>
                <strong>Support Hours:</strong> Available 24/7 via email
              </p>
            </div>
          </section>

          <section>
            <h2>Legal</h2>
            <ul>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
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
