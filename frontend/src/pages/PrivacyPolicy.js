import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: June 2, 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Information Collection and Use</h2>
            <p>
              Speed Checker ("we," "us," "our," or "Company") operates the speedchecker.in website
              and related services. We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
          </section>

          <section>
            <h3>Types of Data Collected:</h3>
            <h4>Personal Data:</h4>
            <ul>
              <li>Email address (if you contact us)</li>
              <li>Name (if you contact us)</li>
              <li>Contact information (phone, address if provided)</li>
              <li>Cookies and Usage Data</li>
            </ul>
          </section>

          <section>
            <h4>Usage Data:</h4>
            <ul>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
              <li>Device information (type, OS, unique device identifier)</li>
              <li>IP address (anonymized)</li>
              <li>Approximate geographic location</li>
              <li>Speed test results (non-identifiable)</li>
            </ul>
          </section>

          <section>
            <h2>2. Use of Data</h2>
            <p>Speed Checker uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support and respond to your inquiries</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical and security issues</li>
              <li>To provide advertising and marketing content</li>
            </ul>
          </section>

          <section>
            <h2>3. Third-Party Service Providers</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our Service. These
              parties have access to your Personal Data only to perform these tasks on our behalf
              and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2>4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of
              transmission over the Internet or method of electronic storage is 100% secure. While
              we strive to use commercially acceptable means to protect your Personal Data, we
              cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>5. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect
              personally identifiable information from children under 13. If we become aware that a
              child under 13 has provided us with Personal Data, we immediately delete such
              information from our servers.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> contact@speedchecker.in
              </p>
              <p>
                <strong>Website:</strong> https://speedchecker.in
              </p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <Link to="/" className="back-link">
            ← Back to Speed Checker
          </Link>
        </div>
      </div>
    </div>
  );
}
