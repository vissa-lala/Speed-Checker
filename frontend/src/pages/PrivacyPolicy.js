import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header">
          <span className="hero-kicker">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: June 6, 2026</p>
        </div>
        <div className="legal-content">
          <section>
            <h2>Information we collect</h2>
            <p>
              Speed Pings may process basic usage data such as browser type, pages visited,
              approximate location, device information, IP-derived network details and
              non-identifiable speed test results. If you contact us, we may receive your name,
              email address and message.
            </p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>
              We may use cookies or similar technologies to remember preferences, understand website
              usage and support advertising features. You can control cookies from your browser
              settings.
            </p>
          </section>
          <section>
            <h2>Google Analytics</h2>
            <p>
              We may use Google Analytics or similar analytics tools to understand traffic, popular
              pages, device types and general visitor behavior. Analytics information helps us
              improve the website and content.
            </p>
          </section>
          <section>
            <h2>Google AdSense and advertising</h2>
            <p>
              We may display Google AdSense ads. Google and its partners may use cookies to serve
              personalized or non-personalized ads based on your visits to this and other websites.
              You can manage ad personalization through your Google ad settings.
            </p>
          </section>
          <section>
            <h2>User data handling</h2>
            <p>
              We do not sell personal information. We use collected information to operate the speed
              test, improve content, respond to messages, protect the website and understand
              performance. We keep information only as long as reasonably needed for these purposes.
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
