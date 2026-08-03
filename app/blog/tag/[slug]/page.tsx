import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo';
import { fetchBlogPosts } from '@/lib/public-data';

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const posts = await fetchBlogPosts();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const tag = tags.find(
    (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.slug
  );
  if (!tag) return {};

  return {
    title: `#${tag} — Blog | ToolNest`,
    description: `Articles tagged with "${tag}" on the ToolNest blog.`,
    alternates: { canonical: `/blog/tag/${params.slug}` },
    openGraph: {
      title: `#${tag} — Blog | ToolNest`,
      description: `Articles tagged with "${tag}" on the ToolNest blog.`,
      url: `${SITE_URL}/blog/tag/${params.slug}`,
      siteName: 'ToolNest',
      locale: 'en_US',
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: { slug: string };
}) {
  const allPosts = await fetchBlogPosts();
  const tags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));
  const tag = tags.find(
    (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.slug
  );
  if (!tag) notFound();

  const posts = allPosts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: `#${tag}`, url: `/blog/tag/${params.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHeader
        eyebrow="Blog tag"
        title={`#${tag}`}
        description={`${posts.length} article${posts.length === 1 ? '' : 's'} tagged with this topic.`}
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl glass-card p-6 transition-all hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-brand-purple transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min
                </span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-purple opacity-0 transition-opacity group-hover:opacity-100">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
