import Layout from '../components/Layout';

export default function Disclaimer() {
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header"><span className="hero-kicker">Legal</span><h1>Disclaimer</h1></div>
        <div className="legal-content">
          <section><h2>General information</h2><p>Speed Pings provides internet speed testing and educational content for general informational purposes only. We do not represent any internet service provider.</p></section>
          <section><h2>Accuracy</h2><p>Speed test results may vary every time you test. Router quality, WiFi signal, device condition, traffic congestion, VPN usage and server routing can affect the result. Use multiple tests before making decisions.</p></section>
          <section><h2>External services</h2><p>The website may use third-party services for analytics, ads, network detection or performance testing. Their availability and behavior may change outside our control.</p></section>
        </div>
      </main>
    </Layout>
  );
}
