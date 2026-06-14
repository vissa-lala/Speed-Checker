const SITE_URL = 'https://speedpings.com';
const SITE_NAME = 'Speed Pings';
const LOGO_URL = `${SITE_URL}/logo-wide.png`;
const DEFAULT_IMAGE = `${SITE_URL}/logo-wide.png`;
const CONTACT_EMAIL = 'contact@speedpings.com';

export const absoluteUrl = (path = '/') => {
  if (!path) return SITE_URL;
  if (String(path).startsWith('http')) return path;
  const cleanPath = path === '/' ? '/' : `/${String(path).replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_URL}${cleanPath}`;
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
  },
  email: CONTACT_EMAIL,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export function webPageSchema({ path = '/', title, description, type = 'WebPage' }) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#speed-test-tool`,
    name: 'Speed Pings Internet Speed Test',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web browser',
    url: SITE_URL,
    description: 'Free browser-based internet speed test for download speed, upload speed, ping, jitter, latency, WiFi, broadband, fiber, 4G and 5G connections.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function itemListSchema({ path, title, description, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#itemlist`,
    name: title,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
    })),
  };
}

export function articleSchema({ path, title, description, image = DEFAULT_IMAGE, sections = [] }) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    headline: title,
    description,
    image: [absoluteUrl(image)],
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: '2026-06-08',
    dateModified: '2026-06-15',
    articleSection: sections.map((section) => section[0]).filter(Boolean),
  };
}

export function contactPageSchema({ title, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact-us#webpage`,
    url: `${SITE_URL}/contact-us`,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'customer support',
        availableLanguage: ['English'],
      },
    },
  };
}
