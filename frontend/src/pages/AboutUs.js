import Layout from '../components/Layout';
import { useSEO, breadcrumbSchema, absoluteUrl } from '../seo';

export default function AboutUs() {
  const description = 'Learn about Speed Pings, a free internet speed test and network education platform for download speed, upload speed, ping, jitter, WiFi and broadband guides.';
  useSEO({
    title: 'About Speed Pings | Internet Speed Test Tool',
    description,
    path: '/about-us',
    schemas: [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About Speed Pings', path: '/about-us' }]),
      { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Speed Pings', description, url: absoluteUrl('/about-us') }
    ]
  });
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header">
          <span className="hero-kicker">About Speed Pings</span>
          <h1>Built to make internet speed easy to understand</h1>
          <p className="subtitle">Speed Pings helps users test their connection and learn what download speed, upload speed, ping and jitter mean in real life.</p>
        </div>
        <div className="legal-content">
          <section><h2>Why we built Speed Pings</h2><p>Many users know their internet plan name but do not know whether the connection is actually suitable for streaming, gaming, video calls, remote work or daily browsing. Speed Pings was built as a simple tool that gives quick results and explains what those numbers mean.</p></section>
          <section><h2>Our mission</h2><p>Our mission is to provide a clean, free and mobile-friendly internet speed test with helpful educational content. We want visitors to understand their connection quality, identify common WiFi issues and make better decisions before upgrading a plan or contacting an internet provider.</p></section>
          <section><h2>Features</h2><ul><li>Download speed test in Mbps</li><li>Upload speed test in Mbps</li><li>Ping and jitter measurement</li><li>Live speed graph</li><li>Network and ISP information</li><li>Responsive design for mobile, tablet and desktop</li><li>Helpful guides for internet speed, WiFi, gaming and streaming</li></ul></section><section><h2>Independent platform</h2><p>Speed Pings is an independent internet speed testing and network education platform. We are not affiliated with any speed checking sites, internet service providers or telecom companies unless clearly stated.</p></section>
        </div>
      </main>
    </Layout>
  );
}
