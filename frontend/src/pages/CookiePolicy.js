import Layout from '../components/Layout';

export default function CookiePolicy() {
  return (
    <Layout>
      <main className="legal-container">
        <div className="legal-header"><span className="hero-kicker">Legal</span><h1>Cookie Policy</h1></div>
        <div className="legal-content">
          <section><h2>What cookies are</h2><p>Cookies are small files stored by your browser. They can help websites remember preferences, measure usage and support advertising or security features.</p></section>
          <section><h2>How we may use cookies</h2><ul><li>To understand website traffic and popular pages</li><li>To improve performance and user experience</li><li>To support Google Analytics or similar tools</li><li>To support Google AdSense ads when enabled</li></ul></section>
          <section><h2>Your control</h2><p>You can block or delete cookies from your browser settings. Some features may work differently if cookies are disabled.</p></section>
        </div>
      </main>
    </Layout>
  );
}
