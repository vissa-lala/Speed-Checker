import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header">
          <span className="hero-kicker">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: June 8, 2026</p>
        </div>
        <div className="legal-content">
          <section>
            <h2>Information we collect</h2>
            <p>
              Speed Pings may process basic technical and usage information such as browser type,
              pages visited, approximate region, device type, IP-derived network details and general
              website performance data. If you contact us, we may receive your name, email address
              and message so we can respond.
            </p>
          </section>
          <section>
            <h2>Speed test results</h2>
            <p>
              Speed test results are processed to show download speed, upload speed, ping and jitter
              in your browser during the test. We do not create user accounts or sell speed test
              results. Unless a future feature clearly says otherwise, speed test results are not
              stored as personal profiles by Speed Pings.
            </p>
          </section>
          <section>
            <h2>Google Analytics</h2>
            <p>
              We use Google Analytics to understand website traffic, popular pages, device types,
              approximate regions and general visitor behavior. Google Analytics may use cookies or
              similar technologies to measure visits and improve reporting. This helps us improve the
              website, speed test experience and guide content.
            </p>
          </section>
          <section>
            <h2>Google AdSense and advertising</h2>
            <p>
              We may display Google AdSense ads. Google and its partners may use cookies or similar
              technologies to serve and measure personalized or non-personalized ads based on visits
              to this and other websites. You can manage ad personalization from your Google ad
              settings and browser privacy controls.
            </p>
          </section>
          <section>
            <h2>Contact form data</h2>
            <p>
              When you submit the contact form, your message details may be processed by our form or
              email delivery provider for delivering your message to us. We do not sell contact form
              submissions or use them for unrelated marketing.
            </p>
          </section>
          <section>
            <h2>Third-party services</h2>
            <p>
              Our website may rely on trusted third-party services for analytics, advertising,
              hosting, email delivery and security. These providers may process limited data according
              to their own privacy policies and applicable laws.
            </p>
          </section>
          <section>
            <h2>User data handling</h2>
            <p>
              We do not sell personal information. We use collected information to operate the speed
              test, improve content, respond to messages, protect the website, understand performance
              and comply with applicable requirements.
            </p>
          </section>
          <section>
            <h2>Children's privacy</h2>
            <p>
              Speed Pings is a general internet utility and is not designed to knowingly collect
              personal information from children. If you believe a child has submitted personal
              information through our contact form, please contact us so we can review it.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>For privacy questions, contact us at contact@speedpings.com.</p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
