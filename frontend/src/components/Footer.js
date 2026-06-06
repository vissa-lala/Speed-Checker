import { Link } from 'react-router-dom';
import { articles } from '../content';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>⚡ Speed Pings</h3>
          <p>Free internet speed test for download speed, upload speed, ping, jitter and practical network quality checks.</p>
        </div>
        <div>
          <h4>Pages</h4>
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms & Conditions</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
        </div>
        <div>
          <h4>Popular Blog Posts</h4>
          {articles.slice(0, 5).map((article) => (
            <Link key={article.slug} to={`/blog/${article.slug}`}>{article.title}</Link>
          ))}
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} Speed Pings. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
