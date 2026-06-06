import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../content';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug) || articles[0];

  return (
    <Layout>
      <main className="article-page">
        <article className="legal-container article-detail">
          <div className="article-visual big"><img src={article.image} alt={article.title} /></div>
          <div className="legal-header">
            <p className="hero-kicker">Speed Pings Blog</p>
            <h1>{article.title}</h1>
            <p className="subtitle">{article.description}</p>
          </div>
          <div className="legal-content">
            {article.sections.map(([heading, body]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
            <section className="cta-panel">
              <h2>Ready to test your connection?</h2>
              <p>Go back to the home page to check your download speed, upload speed, ping and jitter.</p>
              <Link to="/#site-header" className="primary-link">Back to Home</Link>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
