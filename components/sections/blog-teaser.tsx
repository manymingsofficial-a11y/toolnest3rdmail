import Link from 'next/link';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

import type { PublicBlogPost } from '@/lib/public-data';

export function BlogTeaser({ posts }: { posts: PublicBlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
              <ArrowUpRight className="h-4 w-4" />
              From the blog
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Guides &amp; tutorials
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Learn how to get the most out of free online tools with our
              practical how-to guides.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-brand-blue"
          >
            Read the blog
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl glass-card p-6 transition-all hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1"
            >
              <span className="rounded-md bg-gradient-brand/10 px-2 py-1 text-xs font-medium text-brand-purple">
                {post.category}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight group-hover:text-brand-purple transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
