import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Link as LinkIcon } from 'lucide-react';

import { CanonicalUrlGenerator } from '@/components/seo/analyzers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Canonical URL Generator — Fix Duplicate Content with rel=canonical | ToolNest',
  description:
    'Generate canonical URL tags to consolidate duplicate pages and tell search engines your preferred URL. Copy-ready HTML — free, no sign-up.',
};

const relatedTools = getRelatedTools('canonical-url-generator', 3).filter((t) =>
  ['meta-tag-generator', 'sitemap-generator', 'slug-generator'].includes(t.slug)
);

export default function CanonicalUrlGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Canonical URL Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 text-white shadow-lg shadow-brand-purple/25">
              <LinkIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Canonical URL Generator</h1>
              <p className="mt-1 text-muted-foreground">Create canonical tags to consolidate duplicate content — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CanonicalUrlGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A canonical URL generator creates the rel=&quot;canonical&quot; link tag that tells search engines which URL is the master version of a page when multiple URLs serve identical or near-identical content. Without a canonical tag, duplicate URLs — caused by tracking parameters, sort filters, session IDs, or www vs non-www variations — can split ranking signals across copies. By placing a single canonical tag in your page head, you consolidate link equity onto your preferred URL. ToolNest's generator builds a correctly formatted canonical tag, normalizes trailing slashes and protocol, and flags common mistakes so you publish with confidence."
          howTo={[
            'Enter the preferred (canonical) URL for your page.',
            'The tool normalizes protocol, www/non-www, and trailing slash to a consistent form.',
            'Review the generated <link rel="canonical" href="..."> tag in the preview.',
            'Check for warnings about missing protocol, mixed case, or trailing-slash mismatches.',
            'Click "Copy HTML" to copy the tag.',
            'Paste the tag inside the <head> of every duplicate page that points to this canonical URL.',
          ]}
          benefits={[
            { title: 'Consolidates ranking signals', description: 'Directs link equity and ranking power from duplicate URLs onto a single canonical version so your pages rank as strongly as possible.' },
            { title: 'Prevents duplicate-content issues', description: 'Stops search engines from indexing parameter-laden or filtered variants of the same page, which can dilute relevance and crawl budget.' },
            { title: 'Automatic normalization', description: 'Standardizes protocol, host, and trailing slashes so your canonical URL is consistent and unambiguous to every crawler.' },
            { title: 'Mistake detection', description: 'Flags common errors like relative URLs, missing HTTPS, or case mismatches that can silently break canonicalization and waste your effort.' },
          ]}
          faqs={[
            { q: 'What is a canonical URL?', a: 'A canonical URL is the single, preferred web address you designate for a piece of content when multiple URLs serve the same or very similar page. The rel="canonical" tag tells search engines which version to index and rank.' },
            { q: 'When do I need a canonical tag?', a: 'Use one whenever a page is reachable through more than one URL — for example, with tracking parameters, sort filters, session IDs, print versions, or www vs non-www and http vs https variants of the same content.' },
            { q: 'Is canonical the same as a 301 redirect?', a: 'No. A 301 redirect sends users and bots to a different URL. A canonical tag is a hint to search engines only — users still see the duplicate URL, but crawlers consolidate ranking signals to the canonical one.' },
            { q: 'Can canonical tags be relative URLs?', a: 'While technically allowed, absolute URLs are strongly recommended. Relative canonical URLs can be misinterpreted by crawlers, especially on sites with subdomains or mixed protocols. Always use the full, absolute URL.' },
            { q: 'Do search engines always honor canonical tags?', a: 'Google treats canonical as a strong hint, not a command. In rare cases — such as conflicting signals or very different content — it may choose a different URL. Keep your tags consistent and accurate to maximize compliance.' },
            { q: 'Should every page have a self-referencing canonical?', a: 'Yes. Best practice is to add a self-referencing canonical tag to every page, even if it has no duplicates. This protects against unexpected duplicate URLs created by parameters or scraper sites linking to you.' },
          ]}
        />
      </section>

      <RelatedTools slug="canonical-url-generator" tools={relatedTools} />
    </>
  );
}
