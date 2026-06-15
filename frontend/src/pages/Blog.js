import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../content';
import { useSEO, breadcrumbSchema, absoluteUrl } from '../seo';

export default function Blog() {
  const description = 'Helpful internet speed test guides about WiFi speed, broadband speed, fiber internet, 4G, 5G, download speed, upload speed, ping, jitter, gaming and streaming.';
  useSEO({
    title: 'Internet Speed Test, WiFi and Broadband Guides | Speed Pings',
    description,
    path: '/guides',
    schemas: [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Internet Speed Guides',
        description,
        url: absoluteUrl('/guides'),
        mainEntity: articles.map((article) => ({
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          url: absoluteUrl(`/guides/${article.slug}`)
        }))
      }
    ]
  });
  return (
    <Layout>
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
