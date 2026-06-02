import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last Updated: June 2, 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Introduction</h2>
            <p>
              Speed Checker uses cookies and similar tracking technologies on our website
              (speedchecker.in) to enhance your experience and gather information about how our
              website is used. This Cookie Policy explains what cookies are, how we use them, and
              your choices regarding cookies.
            </p>
          </section>

          <section>
            <h2>What Are Cookies?</h2>
            <p>
              A cookie is a small text file that is stored on your device (computer, tablet, or
              mobile phone) when you visit a website. Cookies are widely used to remember user
              preferences, facilitate user login, track user behavior, and serve personalized
              content and advertisements.
            </p>
          </section>

          <section>
            <h2>Types of Cookies We Use</h2>
            <h3>1. Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly:</p>
            <ul>
              <li>Authentication cookies - Keep you logged in</li>
              <li>Security cookies - Protect against fraud</li>
              <li>User preference cookies - Remember your settings</li>
              <li>Session cookies - Track your current session</li>
            </ul>
            <p>
              <em>These cookies cannot be disabled.</em>
            </p>

            <h3>2. Analytics Cookies</h3>
            <p>These cookies help us understand how visitors use our website:</p>
            <ul>
              <li>
                <strong>Google Analytics</strong> - Tracks page views, user behavior, traffic
                sources
              </li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
              <li>Device information</li>
            </ul>

            <h3>3. Advertising Cookies</h3>
            <p>These cookies are used to display relevant advertisements:</p>
            <ul>
              <li>
                <strong>Google AdSense</strong> - Personalized ad serving
              </li>
              <li>Ad performance tracking</li>
              <li>User interest profiling</li>
              <li>Frequency capping (limiting ad repetition)</li>
            </ul>

            <h3>4. Third-Party Cookies</h3>
            <p>Third-party services may place their own cookies:</p>
            <ul>
              <li>Social media platforms</li>
              <li>Analytics providers</li>
              <li>Advertising networks</li>
              <li>Content delivery networks</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Cookies</h2>
            <h3>1. Essential Functions</h3>
            <ul>
              <li>Maintaining your session</li>
              <li>Security and fraud prevention</li>
              <li>Providing core website features</li>
              <li>Authentication and authorization</li>
            </ul>

            <h3>2. Analytics & Improvement</h3>
            <ul>
              <li>Measuring website traffic</li>
              <li>Analyzing user behavior</li>
              <li>Understanding user flow</li>
              <li>Improving website experience</li>
            </ul>

            <h3>3. Advertising & Marketing</h3>
            <ul>
              <li>Displaying relevant advertisements</li>
              <li>Measuring ad performance</li>
              <li>Personalizing content</li>
              <li>Marketing campaign tracking</li>
            </ul>

            <h3>4. User Experience</h3>
            <ul>
              <li>Remembering preferences</li>
              <li>Storing language selection</li>
              <li>Saving user settings</li>
              <li>Improving interface usability</li>
            </ul>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <h3>Browser Settings</h3>
            <p>Most browsers allow you to control cookies through settings:</p>
            <ul>
              <li>
                <strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other
                site data
              </li>
              <li>
                <strong>Firefox:</strong> Preferences &gt; Privacy &amp; Security &gt; Cookies and
                Site Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data
              </li>
              <li>
                <strong>Edge:</strong> Settings &gt; Privacy, Search, and Services &gt; Clear
                browsing data
              </li>
            </ul>

            <h3>Opt-Out Options</h3>
            <ul>
              <li>
                <strong>Google Analytics:</strong>{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit opt-out page
                </a>
              </li>
              <li>
                <strong>Google Ads Personalization:</strong>{' '}
                <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
                  Visit Ads Settings
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2>GDPR & CCPA Compliance</h2>
            <h3>For European Union Users:</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Request cookie information</li>
              <li>Withdraw consent</li>
              <li>Have cookies deleted</li>
              <li>Opt-out of tracking</li>
            </ul>

            <h3>For California Users:</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Know what cookies are used</li>
              <li>Delete cookies/data</li>
              <li>Opt-out of cookie tracking</li>
              <li>Learn how cookies are used</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>For questions about our Cookie Policy:</p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> contact@speedchecker.in
              </p>
              <p>
                <strong>Website:</strong> https://speedchecker.in
              </p>
              <p>
                <strong>Response Time:</strong> Within 7 business days
              </p>
            </div>
          </section>

          <section>
            <h2>Summary</h2>
            <ul>
              <li>We use cookies to enhance your experience</li>
              <li>Analytics cookies help us improve the site</li>
              <li>Advertising cookies provide relevant ads</li>
              <li>Essential cookies cannot be disabled</li>
              <li>You can manage cookies through browser settings</li>
              <li>We respect privacy and GDPR/CCPA rights</li>
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
