import type { MetadataRoute } from 'next';
import { tools, categories } from '@/lib/data';
import { blogPosts, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/recent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/categories?cat=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogCategoryPages: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.map((p) => p.category))).map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const blogTagPages: MetadataRoute.Sitemap = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).map((tag) => ({
    url: `${SITE_URL}/blog/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages, ...blogCategoryPages, ...blogTagPages];
}
