import type { MetadataRoute } from 'next';
import { tools as staticTools } from '@/lib/data';
import { blogPosts as staticBlogPosts, SITE_URL } from '@/lib/seo';
import { fetchTools, fetchBlogPosts } from '@/lib/public-data';
import { getIndexPolicy } from '@/lib/tool-classification';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date('2025-10-01'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: new Date('2025-10-01'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: new Date('2025-10-01'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date('2025-10-01'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date('2025-09-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date('2025-09-01'), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date('2025-08-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2025-08-01'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [dbTools, dbBlogPosts] = await Promise.all([
    fetchTools(),
    fetchBlogPosts(),
  ]);

  const tools = dbTools.length > 0 ? dbTools : staticTools;
  const blogPosts = dbBlogPosts.length > 0 ? dbBlogPosts : staticBlogPosts;

  // Filter out tools that should not be indexed
  const indexableTools = tools.filter((t) => getIndexPolicy(t.slug).index);

  const toolPages: MetadataRoute.Sitemap = indexableTools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: new Date(t.addedDaysAgo ? Date.now() - t.addedDaysAgo * 86400000 : '2025-10-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
