import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { performancePages } from '../websitePerformanceContent';
import { useSEO, breadcrumbSchema, absoluteUrl } from '../seo';

export default function WebsitePerformance() {
  const description = 'Learn Core Web Vitals, PageSpeed Insights, GTmetrix and website speed optimization with simple Speed Pings guides.';
  useSEO({
    title: 'Website Performance Guides | Speed Pings',
    description,
    path: '/website-performance',
    schemas: [
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Website Performance', path: '/website-performance' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Website Performance Guides',
        description,
        url: absoluteUrl('/website-performance'),
        mainEntity: performancePages.map((page) => ({
          '@type': 'Article',
          headline: page.title,
          description: page.description,
          url: absoluteUrl(`/website-performance/${page.slug}`)
        }))
      }
    ]
  });

  return (
    <Layout>
      <main className="page-hero">
        <section className="page-title">
          <span className="hero-kicker">Website Performance</span>
          <h1>Website Performance, Core Web Vitals and Page Speed Guides</h1>
          <p>
            Learn how to improve website loading speed, Core Web Vitals, Google PageSpeed Insights scores,
            GTmetrix reports, mobile website speed and user experience without mixing these topics into the
            main internet speed test page.
          </p>
        </section>

        <section className="legal-container seo-section">
          <h2>Website Speed Learning Center</h2>
          <p>
            This section is for website owners, developers, bloggers, SEO professionals and marketers who want
            to understand page speed, Core Web Vitals, website speed test reports and practical optimization steps.
            For checking your internet connection speed, use the Speed Pings home page.
          </p>
        </section>

        <section className="article-grid">
          {performancePages.map((page) => (
            <Link className="article-card" key={page.slug} to={`/website-performance/${page.slug}`}>
              <div className="article-visual performance-icon" aria-hidden="true">{page.icon}</div>
              <h2>{page.title}</h2>
              <p>{page.description}</p>
              <strong>Read guide →</strong>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
