import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { performancePages } from '../websitePerformanceContent';
import { organizationSchema, webPageSchema, itemListSchema, breadcrumbSchema } from '../schema';

export default function WebsitePerformance() {
  return (
    <Layout>
      <SEO
        title="Website Performance Guides | Speed Pings"
        description="Learn Core Web Vitals, PageSpeed Insights, GTmetrix and website speed optimization with simple Speed Pings guides."
        path="/website-performance"
        schema={[
          organizationSchema,
          webPageSchema({
            path: '/website-performance',
            title: 'Website Performance Guides | Speed Pings',
            description: 'Learn Core Web Vitals, PageSpeed Insights, GTmetrix and website speed optimization with simple Speed Pings guides.',
            type: 'CollectionPage',
          }),
          itemListSchema({
            path: '/website-performance',
            title: 'Website Performance Guides',
            description: 'Website speed and Core Web Vitals guide collection.',
            items: performancePages.map((page) => ({
              name: page.title,
              path: `/website-performance/${page.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Website Performance', path: '/website-performance' },
          ]),
        ]}
      />
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
