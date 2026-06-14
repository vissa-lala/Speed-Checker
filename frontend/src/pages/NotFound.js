import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Page Not Found | Speed Pings"
        description="The requested Speed Pings page could not be found."
        path="/404"
        robots="noindex,follow"
      />
      <main className="legal-container">
        <div className="legal-header">
          <p className="hero-kicker">404</p>
          <h1>Page not found</h1>
          <p className="subtitle">This page may have been moved or the URL may be incorrect.</p>
        </div>
        <Link to="/" className="primary-link">Go to Home</Link>
      </main>
    </Layout>
  );
}
