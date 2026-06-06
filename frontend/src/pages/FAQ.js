import Layout from '../components/Layout';
import { faqs } from '../content';

export default function FAQ() {
  return (
    <Layout>
      <main className="page-hero">
        <section className="page-title">
          <span className="hero-kicker">Frequently asked questions</span>
          <h1>Speed Pings FAQ</h1>
          <p>Answers to common questions about speed tests, accuracy, ISP differences, ping, jitter, WiFi and result quality.</p>
        </section>
        <section className="faq-list">
          {faqs.map(([question, answer]) => (
            <div className="faq-item" key={question}>
              <h2>{question}</h2>
              <p>{answer}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
