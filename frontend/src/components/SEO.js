import { useEffect } from 'react';

const SITE_URL = 'https://speedpings.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo-wide.png`;

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function removeOldStructuredData() {
  document.head
    .querySelectorAll('script[data-speedpings-schema="true"]')
    .forEach((element) => element.remove());
}

function addStructuredData(schema) {
  if (!schema) return;
  const schemas = Array.isArray(schema) ? schema : [schema];
  schemas.filter(Boolean).forEach((item, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-speedpings-schema', 'true');
    script.setAttribute('data-schema-index', String(index));
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export default function SEO({
  title = 'Free Internet Speed Test | WiFi, Broadband & 5G',
  description = 'Test your internet speed online for free with Speed Pings. Check download speed, upload speed, ping, jitter, latency, WiFi, broadband, fiber, 4G and 5G performance.',
  path = '/',
  image = DEFAULT_IMAGE,
  robots = 'index,follow,max-image-preview:large',
  type = 'website',
  schema = null,
}) {
  useEffect(() => {
    const cleanPath = path === '/' ? '/' : `/${String(path).replace(/^\/+|\/+$/g, '')}`;
    const canonicalUrl = `${SITE_URL}${cleanPath}`;

    document.title = title;
    upsertLink('canonical', canonicalUrl);

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });

    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    removeOldStructuredData();
    addStructuredData(schema);

    return removeOldStructuredData;
  }, [title, description, path, image, robots, type, schema]);

  return null;
}
