import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools, tools } from '@/lib/data';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';

export type ToolSeoContent = {
  whatIs: string;
  howTo: string[];
  benefits: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export type ToolPageTemplateProps = {
  slug: string;
  children: React.ReactNode;
  seo: ToolSeoContent;
  relatedSlugs?: string[];
  gradientOverride?: string;
  blurColor?: string;
};

function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function buildToolMetadata(
  slug: string,
  title: string,
  description: string
): Metadata {
  return {
    title: `${title} — Free Online Tool | ToolNest`,
    description,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${title} — Free Online Tool | ToolNest`,
      description,
    },
  };
}

export function ToolPageTemplate({
  slug,
  children,
  seo,
  relatedSlugs,
  blurColor = 'bg-brand-purple/20',
}: ToolPageTemplateProps) {
  const tool = getTool(slug);
  if (!tool) return null;

  const ToolIcon = tool.icon as LucideIcon;
  const gradient = tool.gradient;

  const relatedTools = relatedSlugs
    ? relatedSlugs
        .map((s) => tools.find((t) => t.slug === s))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
    : getRelatedTools(slug, 3);

  const toolJsonLd = generateToolJsonLd(slug);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ]);

  return (
    <>
      {toolJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div
            className={`absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full ${blurColor} blur-[120px]`}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/tools"
              className="transition-colors hover:text-foreground"
            >
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-brand-purple/25`}
            >
              <ToolIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {tool.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{tool.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {children}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent {...seo} />
      </section>

      <RelatedTools slug={slug} tools={relatedTools} />
    </>
  );
}
