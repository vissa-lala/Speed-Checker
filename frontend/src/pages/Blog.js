import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../content';

export default function Blog() {
  return (
    <Layout>
      <main className="page-hero">
        <section className="page-title">
          <span className="hero-kicker">Speed Pings Blog</span>
          <h1>Internet Speed Test Blog</h1>
          <p>Helpful blog posts about download speed, upload speed, ping, jitter, WiFi performance, streaming, gaming, and broadband quality.</p>
        </section>
        <section className="article-grid">
          {articles.map((article) => (
            <Link className="article-card" key={article.slug} to={`/blog/${article.slug}`}>
              <div className="article-visual"><img src={article.image} alt={article.title} loading="lazy" /></div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <strong>Read blog →</strong>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
