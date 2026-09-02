import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { ToolActions } from '@/components/tool-actions';
import { AdSlot } from '@/components/ads/ad-slot';
import { Newsletter } from '@/components/ads/newsletter';
import { getIcon } from '@/lib/icon-map';
import { getRelatedTools, tools, categories } from '@/lib/data';
import { generateToolSeoContent, isBoilerplateSeo } from '@/lib/tool-seo-content';
import {
  generateToolJsonLd,
  generateWebApplicationJsonLd,
  generateBreadcrumbJsonLd,
  generateHowToJsonLd,
  generateFaqJsonLd,
  generateToolMetadata,
} from '@/lib/seo';

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
  title?: string,
  description?: string
): Metadata {
  return generateToolMetadata(slug, title, description);
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

  const ToolIcon = getIcon(tool.icon);
  const gradient = tool.gradient;

  const relatedTools = relatedSlugs
    ? relatedSlugs
        .map((s) => tools.find((t) => t.slug === s))
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
    : getRelatedTools(slug, 3);

  const toolJsonLd = generateToolJsonLd(slug);
  const webAppJsonLd = generateWebApplicationJsonLd(slug);
  const toolCategory = categories.find((c) => c.name === tool.category);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    ...(toolCategory ? [{ name: toolCategory.name, url: `/categories?cat=${toolCategory.slug}` }] : []),
    { name: tool.name, url: `/tools/${tool.slug}` },
  ]);
  // Detect boilerplate content and replace with generated tool-specific content
  const effectiveSeo = isBoilerplateSeo(seo) ? generateToolSeoContent(slug) : seo;

  const howtoJsonLd = effectiveSeo.howTo.length > 0 ? generateHowToJsonLd(tool.name, effectiveSeo.howTo) : null;
  const faqJsonLd = effectiveSeo.faqs.length > 0 ? generateFaqJsonLd(effectiveSeo.faqs) : null;

  return (
    <>
      {toolJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
        />
      )}
      {webAppJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {howtoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div
            className={`absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full ${blurColor} blur-[120px]`}
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
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
            {toolCategory && (
              <>
                <Link
                  href={`/categories?cat=${toolCategory.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {toolCategory.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot slot="tool-top" className="my-6" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {children}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot="tool-sidebar" minHeight={250} />
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdSlot slot="tool-after" className="my-8" />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent {...effectiveSeo} />
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdSlot slot="tool-bottom" className="my-8" />
      </div>

      <ToolActions slug={slug} />
      <RelatedTools slug={slug} tools={relatedTools} />
    </>
  );
}
