import { Link, Navigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { articles } from '../content';
import { useSEO, articleSchema, breadcrumbSchema, absoluteUrl } from '../seo';

export default function ArticlePage() {
  const { slug } = useParams();
  const foundArticle = articles.find((item) => item.slug === slug);
  const article = foundArticle || articles[0];
  const path = `/guides/${article.slug}`;
  const imageUrl = absoluteUrl(article.image);
  useSEO({
    title: `${article.title} | Speed Pings Guide`,
    description: article.description,
    path,
    type: 'article',
    image: imageUrl,
    schemas: [
      articleSchema({ title: article.title, description: article.description, path, image: imageUrl }),
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }, { name: article.title, path }])
    ]
  });

  if (!foundArticle) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <Layout>
      <main className="article-page">
        <article className="legal-container article-detail">
          <div className="article-visual big"><img src={article.image} alt={article.title} /></div>
          <div className="legal-header">
            <p className="hero-kicker">Speed Pings Guides</p>
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
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="primary-link">Back to Home</Link>
            </section>
          </div>
        </article>
      </main>
    </Layout>
  );
}
