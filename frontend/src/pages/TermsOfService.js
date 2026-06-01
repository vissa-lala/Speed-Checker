import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: June 2, 2026</p>
        </div>

        <div className="legal-content">
          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using Speed Checker (speedchecker.in), you accept and agree to be
              bound by the terms and provision of this agreement. If you do not agree to abide by
              the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information
              or software) from Speed Checker for personal, non-commercial transitory viewing only.
              Under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>
                Attempt to decompile or reverse engineer any software contained on Speed Checker
              </li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>
                Transfer the materials to another person or "mirror" the materials on any other
                server
              </li>
              <li>Use the materials in a way that violates any laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2>3. Speed Test Results</h2>
            <h3>Accuracy Disclaimer:</h3>
            <ul>
              <li>
                Speed test results are estimates based on network conditions at the time of testing
              </li>
              <li>
                Results may vary based on multiple factors (network congestion, hardware, software,
                etc.)
              </li>
              <li>Speed Checker does not guarantee accuracy of test results</li>
              <li>Results should not be used as definitive proof of internet speed</li>
            </ul>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
              In no event shall Speed Checker, its directors, employees, or agents be liable for any
              indirect, incidental, special, consequential, or punitive damages resulting from your
              use or inability to use the website or services.
            </p>
          </section>

          <section>
            <h2>5. User Responsibilities</h2>
            <p>
              You agree to use Speed Checker only for lawful purposes and in a way that does not
              infringe upon the rights of others. Prohibited behavior includes:
            </p>
            <ul>
              <li>Harassing, causing fear, or distressing any person</li>
              <li>Disrupting the normal flow of dialogue within Speed Checker</li>
              <li>Transmitting or storing any viruses</li>
              <li>Attempting to gain unauthorized access to systems</li>
            </ul>
          </section>

          <section>
            <h2>6. Modifications</h2>
            <p>
              Speed Checker may revise these terms of service for its website at any time without
              notice. By using this website, you are agreeing to be bound by the then current
              version of these terms of service.
            </p>
          </section>

          <section>
            <h2>7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws
              of India, and you irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </section>

          <section>
            <h2>8. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us:</p>
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
            ← Back to Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
