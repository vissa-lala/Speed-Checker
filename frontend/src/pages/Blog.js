import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../content';

export default function Blog() {
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
