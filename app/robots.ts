import type { MetadataRoute } from 'next';

const SITE_URL = 'https://toolnest.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/favorites'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
