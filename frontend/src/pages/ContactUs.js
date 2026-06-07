import { useState } from 'react';
import Layout from '../components/Layout';

const CONTACT_EMAIL = 'contact@speedpings.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (status === 'sent' || status === 'error') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const submitContactForm = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedback('Please fill in your name, email, and message before submitting.');
      return;
    }

    setStatus('sending');
    setFeedback('Sending your message...');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: 'New contact form message from Speed Pings',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Message delivery failed');
      }

      setFormData({ name: '', email: '', message: '' });
      setStatus('sent');
      setFeedback('Message sent successfully. We will get back to you soon.');
    } catch (error) {
      setStatus('error');
      setFeedback(`Could not send automatically. Please email us directly at ${CONTACT_EMAIL}.`);
    }
  };

  const submitButtonText =
    status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent' : 'Submit Message';

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
            <p>{CONTACT_EMAIL}</p>
          </div>
        </section>
        <section className="contact-card">
          <form onSubmit={submitContactForm}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={updateField}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={updateField}
                placeholder="your@email.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Message
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={updateField}
                placeholder="Write your message"
                required
              />
            </label>
            <button
              className={`run-btn contact-submit-btn ${status === 'sent' ? 'sent-mode' : ''}`}
              type="submit"
              disabled={status === 'sending'}
            >
              {submitButtonText}
            </button>
            <p
              className={`form-note ${
                status === 'sent' ? 'success-note' : status === 'error' ? 'error-note' : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {feedback ||
                'Your message will be delivered to contact@speedpings.com and may be processed by our email/form delivery provider.'}
            </p>
          </form>
        </section>
      </main>
    </Layout>
  );
}
