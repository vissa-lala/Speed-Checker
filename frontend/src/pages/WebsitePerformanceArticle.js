import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { performancePages } from '../websitePerformanceContent';

export default function WebsitePerformanceArticle() {
  const { slug } = useParams();
  const page = performancePages.find((item) => item.slug === slug) || performancePages[0];

  useEffect(() => {
    document.title = `${page.title} | Speed Pings`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', page.description);
    }
  }, [page]);

  return (
    <Layout>
      <main className="article-page">
        <article className="legal-container article-detail">
          <div className="article-visual big performance-icon" aria-hidden="true">{page.icon}</div>
          <div className="legal-header">
            <p className="hero-kicker">Website Performance Guide</p>
            <h1>{page.title}</h1>
            <p className="subtitle">{page.description}</p>
          </div>
          <div className="legal-content">
            {page.sections.map(([heading, body]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
            <section className="cta-panel">
              <h2>Want to check your internet connection too?</h2>
              <p>Use Speed Pings to test download speed, upload speed, ping and jitter.</p>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="primary-link">Run Internet Speed Test</Link>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
