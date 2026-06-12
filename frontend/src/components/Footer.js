import { Link } from 'react-router-dom';
import { articles } from '../content';
import { performancePages } from '../websitePerformanceContent';

const scrollTop = () => {
  window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" onClick={scrollTop} className="footer-brand" aria-label="Speed Pings Home">
            <img src="/logo-wide.png" alt="Speed Pings logo" />
          </Link>
          <p>
            Free internet speed test for download speed, upload speed, ping, jitter and practical
            network quality checks. Speed Pings is an independent network performance platform.
          </p>
        </div>
        <div>
          <h4>Pages</h4>
          <Link to="/" onClick={scrollTop}>
            Home
          </Link>
          <Link to="/guides" onClick={scrollTop}>
            Guides
          </Link>
          <Link to="/website-performance" onClick={scrollTop}>
            Website Performance
          </Link>
          <Link to="/about-us" onClick={scrollTop}>
            About Us
          </Link>
          <Link to="/contact-us" onClick={scrollTop}>
            Contact Us
          </Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/privacy-policy" onClick={scrollTop}>
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" onClick={scrollTop}>
            Terms & Conditions
          </Link>
        </div>
        <div>
          <h4>Popular Guides</h4>
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} to={`/guides/${article.slug}`} onClick={scrollTop}>
              {article.title}
            </Link>
          ))}
          {performancePages.slice(0, 2).map((page) => (
            <Link key={page.slug} to={`/website-performance/${page.slug}`} onClick={scrollTop}>
              {page.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} Speed Pings. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
