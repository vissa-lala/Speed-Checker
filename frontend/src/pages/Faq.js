import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles, faqs } from '../content';
import { useSEO, breadcrumbSchema, absoluteUrl } from '../seo';

export default function Faq() {
  const description =
    'Answers to common questions about Speed Pings, internet speed tests, download speed, upload speed, ping, jitter, WiFi, gaming, streaming and website performance.';

  useSEO({
    title: 'Internet Speed Test FAQ | Speed Pings',
    description,
    path: '/faq',
    schemas: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' }
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: 'Speed Pings FAQ',
        description,
        url: absoluteUrl('/faq'),
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  });

  return (
    <Layout>
      <main className="page-hero">
        <section className="page-title">
          <span className="hero-kicker">Help Center</span>
          <h1>Internet Speed Test FAQ</h1>
          <p>
            Find clear answers about download speed, upload speed, ping, jitter, WiFi performance,
            gaming latency, streaming quality and how to read your Speed Pings results.
          </p>
        </section>

        <section className="legal-container seo-section">
          <h2>Quick help before you test</h2>
          <p>
            Internet speed can change based on your device, router, WiFi signal, time of day,
            background apps and the server route used by your connection. For a fair result, test
            close to your router, pause heavy downloads, and repeat the test more than once.
          </p>
        </section>

        <section className="faq-list" aria-label="Frequently asked questions">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </section>

        <section className="guide-preview">
          <div className="section-heading">
            <span className="hero-kicker">Learn More</span>
            <h2>Helpful internet speed guides</h2>
          </div>
          <div className="article-grid compact">
            {articles.slice(0, 3).map((article) => (
              <Link className="article-card" key={article.slug} to={`/guides/${article.slug}`}>
                <div className="article-visual">
                  <img src={article.image} alt={article.title} loading="lazy" />
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
