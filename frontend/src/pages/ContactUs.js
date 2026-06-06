import Layout from '../components/Layout';

export default function ContactUs() {
  return (
    <Layout>
      <main className="page-hero split-page">
        <section className="page-title left">
          <span className="hero-kicker">Contact us</span>
          <h1>Need help with Speed Pings?</h1>
          <p>
            Send feedback, report issues, or contact us about privacy, content, advertising, or
            website improvements.
          </p>
          <div className="info-card">
            <strong>Email</strong>
            <p>contact@speedpings.com</p>
          </div>
        </section>
        <section className="contact-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="your@email.com" />
            </label>
            <label>
              Message
              <textarea rows="6" placeholder="Write your message" />
            </label>
            <button className="run-btn" type="submit">
              Submit Message
            </button>
            <p className="form-note">
              This frontend form is ready for UI. Connect it to EmailJS, Formspree, Netlify Forms,
              or your Node.js backend before production.
            </p>
          </form>
        </section>
      </main>
    </Layout>
  );
}
