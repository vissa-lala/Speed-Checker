import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { performancePages } from '../websitePerformanceContent';

export default function WebsitePerformance() {
  useEffect(() => {
    document.title = 'Website Performance Guides | Speed Pings';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Learn Core Web Vitals, PageSpeed Insights, GTmetrix and website speed optimization with simple Speed Pings guides.');
    }
  }, []);

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
