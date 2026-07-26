import type { MetadataRoute } from 'next';
import { tools } from '@/lib/data';

const SITE_URL = 'https://toolnest.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/categories', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.4, changeFrequency: 'monthly' as const },
    { url: '/favorites', priority: 0.3, changeFrequency: 'monthly' as const },
  ];

  const toolPages = tools.map((t) => ({
    url: `/tools/${t.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...toolPages].map((p) => ({
    url: `${SITE_URL}${p.url}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
