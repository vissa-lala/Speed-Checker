import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { articles } from '../content';
import { organizationSchema, webPageSchema, articleSchema, breadcrumbSchema } from '../schema';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug) || articles[0];

  return (
    <Layout>
      <SEO
        title={`${article.title} | Speed Pings`}
        description={article.description}
        path={`/guides/${article.slug}`}
        image={`https://speedpings.com${article.image}`}
        type="article"
        schema={[
          organizationSchema,
          webPageSchema({
            path: `/guides/${article.slug}`,
            title: `${article.title} | Speed Pings`,
            description: article.description,
            type: 'Article',
          }),
          articleSchema({
            path: `/guides/${article.slug}`,
            title: article.title,
            description: article.description,
            image: article.image,
            sections: article.sections,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
            { name: article.title, path: `/guides/${article.slug}` },
          ]),
        ]}
      />
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
