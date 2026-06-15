import Layout from '../components/Layout';
import { useSEO, breadcrumbSchema, absoluteUrl } from '../seo';

export default function TermsOfService() {
  const description = 'Read the Speed Pings Terms and Conditions for using the free internet speed test, guides and website content.';
  useSEO({
    title: 'Terms and Conditions | Speed Pings',
    description,
    path: '/terms-of-service',
    schemas: [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Terms and Conditions', path: '/terms-of-service' }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Terms and Conditions', description, url: absoluteUrl('/terms-of-service') }
    ]
  });
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header">
          <span className="hero-kicker">Legal</span>
          <h1>Terms & Conditions</h1>
          <p className="last-updated">Last updated: June 8, 2026</p>
        </div>
        <div className="legal-content">
          <section>
            <h2>Use of the website</h2>
            <p>
              By using Speed Pings, you agree to use the website for lawful personal or
              informational purposes. You must not misuse the service, attempt unauthorized access,
              overload the website or interfere with normal operation.
            </p>
          </section>
          <section>
            <h2>Speed test results</h2>
            <p>
              Speed test results are estimates based on current network conditions. They may vary
              due to WiFi quality, device limitations, browser behavior, network congestion, server
              route, VPN usage and other factors. Results should not be treated as a guaranteed
              measurement from your internet provider.
            </p>
          </section>
          <section>
            <h2>Independent service</h2>
            <p>
              Speed Pings is an independent internet speed testing and network information website.
              We are not affiliated with any speed checking sites, internet service
              providers, device manufacturers or telecom companies unless clearly stated.
            </p>
          </section>
          <section>
            <h2>Content and guides</h2>
            <p>
              Our guides are provided for general educational purposes. We try to keep information
              useful and clear, but we do not guarantee that all content is complete, error-free,
              current or suitable for every situation.
            </p>
          </section>
          <section>
            <h2>Intellectual property</h2>
            <p>
              The Speed Pings name, design, logo, website content and original guide material belong
              to Speed Pings unless otherwise noted. You may not copy, republish or misuse our
              branding or content without permission.
            </p>
          </section>
          <section>
            <h2>Limitation of liability</h2>
            <p>
              Speed Pings is provided on an “as is” basis. We are not responsible for losses,
              internet service issues, business interruption, device issues or decisions made based
              on speed test results or website content.
            </p>
          </section>
          <section>
            <h2>Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the website after changes means
              you accept the updated terms.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
