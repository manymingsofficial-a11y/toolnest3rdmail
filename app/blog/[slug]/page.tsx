import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowUpRight, ArrowLeft, PenLine } from 'lucide-react';

import {
  getBlogPost,
  getRelatedBlogPosts,
  generateBlogPostMetadata,
  generateBlogPostJsonLd,
  generateBreadcrumbJsonLd,
  blogPosts,
} from '@/lib/seo';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return generateBlogPostMetadata(params.slug);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(params.slug, 3);
  const blogPostJsonLd = generateBlogPostJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
          <span className="text-muted-foreground/50">/</span>
          <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mt-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-gradient-brand/10 px-2.5 py-1 text-xs font-medium text-brand-purple">
              {post.category}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <PenLine className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
            {post.updatedAt && (
              <span className="text-xs">
                Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </header>

        {/* Table of contents */}
        <nav className="mt-8 rounded-2xl glass-card p-6" aria-label="Table of contents">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {post.content.map((section, i) => (
              <li key={i}>
                <a
                  href={`#section-${i}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand-purple"
                >
                  {i + 1}. {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="mt-10 space-y-10">
          {post.content.map((section, i) => (
            <section key={i} id={`section-${i}`}>
              <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((para, j) => (
                  <p key={j} className="text-base leading-relaxed text-foreground/80">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Back to blog */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple transition-colors hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Related articles</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group rounded-2xl glass-card p-6 transition-all hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1"
              >
                <span className="rounded-md bg-gradient-brand/10 px-2 py-1 text-xs font-medium text-brand-purple">
                  {rp.category}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight group-hover:text-brand-purple transition-colors">
                  {rp.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {rp.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(rp.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {rp.readingTime} min
                  </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-purple opacity-0 transition-opacity group-hover:opacity-100">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
