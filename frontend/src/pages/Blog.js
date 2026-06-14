import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { articles } from '../content';
import { organizationSchema, webPageSchema, itemListSchema, breadcrumbSchema } from '../schema';

export default function Blog() {
  return (
    <Layout>
      <SEO
        title="Internet Speed, WiFi & Ping Guides | Speed Pings"
        description="Read simple guides about internet speed tests, WiFi speed, broadband, fiber internet, download speed, upload speed, ping, jitter, gaming, streaming and video calls."
        path="/guides"
        schema={[
          organizationSchema,
          webPageSchema({
            path: '/guides',
            title: 'Internet Speed, WiFi & Ping Guides | Speed Pings',
            description: 'Read simple guides about internet speed tests, WiFi speed, broadband, fiber internet, download speed, upload speed, ping, jitter, gaming, streaming and video calls.',
            type: 'CollectionPage',
          }),
          itemListSchema({
            path: '/guides',
            title: 'Internet Speed, WiFi & Ping Guides',
            description: 'Speed Pings internet speed guide collection.',
            items: articles.map((article) => ({
              name: article.title,
              path: `/guides/${article.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
          ]),
        ]}
      />
      <main className="page-hero">
        <section className="page-title">
          <span className="hero-kicker">Speed Pings Guides</span>
          <h1>Internet Speed Test, WiFi, Ping and Broadband Guides</h1>
          <p>Helpful guides about internet speed tests, WiFi speed, broadband speed, fiber internet, 4G, 5G, download speed, upload speed, ping, jitter, gaming, streaming and video call quality.</p>
        </section>
        <section className="article-grid">
          {articles.map((article) => (
            <Link className="article-card" key={article.slug} to={`/guides/${article.slug}`}>
              <div className="article-visual"><img src={article.image} alt={article.title} loading="lazy" /></div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <strong>Read guide →</strong>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
