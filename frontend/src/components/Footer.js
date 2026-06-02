import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about-us">About Us</Link>

        <span>|</span>

        <Link to="/blog">Blog</Link>

        <span>|</span>

        <Link to="/faq">FAQ</Link>

        <span>|</span>

        <Link to="/contact-us">Contact Us</Link>

        <span>|</span>

        <Link to="/privacy-policy">Privacy Policy</Link>

        <span>|</span>

        <Link to="/terms-of-service">Terms of Service</Link>

        <span>|</span>

        <Link to="/cookie-policy">Cookie Policy</Link>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Speed Checker. All rights reserved.
        <br />
        Powered by Speed Checker
      </div>
    </footer>
  );
}

export default Footer;
