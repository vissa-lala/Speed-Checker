import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ContactUs() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Contact Us</h1>
          <p className="subtitle">
            Contact SpeedChecker for support, feedback, privacy, or advertising questions.
          </p>
        </div>

        <div className="legal-content">
          <section>
            <h2>Get in Touch</h2>
            <p>
              If you have questions about SpeedChecker, speed test results, website feedback,
              privacy, cookies, advertising, or technical issues, contact us by email.
            </p>

            <div className="contact-info">
              <p>
                <strong>Email:</strong> contact@speedchecker.in
              </p>
              <p>
                <strong>Website:</strong> https://speedchecker.in
              </p>
              <p>
                <strong>Response Time:</strong> Usually within 2–7 business days
              </p>
            </div>
          </section>

          <section>
            <h2>Before Contacting Us</h2>
            <p>
              Speed test results may differ between tools because each service can use different
              servers, locations, and testing methods. For best results, test with Ethernet, close
              background apps, and run multiple tests.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Speed Test
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
