import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { AdPlaceholder } from '@/components/ads/ad-placeholder';
import { Newsletter } from '@/components/ads/newsletter';
import {
  generateBlogMetadata,
  generateItemListJsonLd,
  blogPosts,
  getBlogCategories,
  getBlogTags,
  SITE_URL,
} from '@/lib/seo';

export const metadata: Metadata = generateBlogMetadata();

export default function BlogPage() {
  const categories = getBlogCategories();
  const tags = getBlogTags();
  const itemListJsonLd = generateItemListJsonLd(
    blogPosts.map((p) => ({
      slug: p.slug,
      name: p.title,
      description: p.description,
      category: p.category,
      icon: (() => {}) as any,
      gradient: '',
      popularity: 0,
    })),
    '/blog'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHeader
        eyebrow="Insights & guides"
        title="The ToolNest Blog"
        description="How-to guides, tool reviews, and productivity tips for getting the most out of free online tools."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <AdPlaceholder slot="blog-top" className="mb-10" />

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog posts */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl glass-card p-6 transition-all hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-md bg-gradient-brand/10 px-2 py-1 font-medium text-brand-purple">
                  {post.category}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight group-hover:text-brand-purple transition-colors">
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
                  {post.readingTime} min read
                </span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-purple opacity-0 transition-opacity group-hover:opacity-100">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <AdPlaceholder slot="blog-middle" className="mt-10" />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <AdPlaceholder slot="blog-bottom" className="mt-12" />
        <Newsletter className="mt-12" />
      </section>
    </>
  );
}
