import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Network } from 'lucide-react';

import { SitemapGenerator } from '@/components/seo/generators';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sitemap Generator — Create XML Sitemaps for Search Engines | ToolNest',
  description:
    'Generate an XML sitemap listing your site URLs with lastmod, changefreq, and priority. Help search engines discover and crawl your pages — free.',
};

const relatedTools = getRelatedTools('sitemap-generator', 3).filter((t) =>
  ['robots-txt-generator', 'meta-tag-generator', 'canonical-url-generator'].includes(t.slug)
);

export default function SitemapGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Sitemap Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-brand-purple/25">
              <Network className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sitemap Generator</h1>
              <p className="mt-1 text-muted-foreground">Create XML sitemaps to help search engines crawl your site — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SitemapGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A sitemap generator creates an XML sitemap — a structured file that lists all the URLs on your site you want search engines to discover and crawl. Each entry can include a lastmod date, a changefreq hint, and a priority value that signals the relative importance of a page. Submitting a sitemap through Google Search Console or Bing Webmaster Tools accelerates discovery of new and updated content, especially on large or freshly launched sites. ToolNest's generator takes a list of URLs (one per line or pasted) and produces valid sitemap XML you can upload to your root directory."
          howTo={[
            'Paste your site URLs into the input box, one per line.',
            'Optionally set a default lastmod date, changefreq, and priority for all entries.',
            'Review the generated XML in the preview panel as you add or edit URLs.',
            'Click "Copy XML" to copy the sitemap, or "Download" to save it as sitemap.xml.',
            'Upload the file to your site root so it is reachable at /sitemap.xml.',
            'Submit the sitemap URL in Google Search Console and Bing Webmaster Tools.',
          ]}
          benefits={[
            { title: 'Faster content discovery', description: 'New and updated pages are surfaced to search engines quickly, which is especially valuable for large sites or freshly published content.' },
            { title: 'Per-URL metadata', description: 'Attach lastmod, changefreq, and priority to each URL so crawlers understand what changed and which pages matter most.' },
            { title: 'Valid XML output', description: 'The generator produces schema-compliant sitemap XML, complete with the correct namespace and URL-encoding for special characters.' },
            { title: 'Bulk URL input', description: 'Paste dozens or hundreds of URLs at once — the tool parses them into properly formatted <url> entries in seconds.' },
          ]}
          faqs={[
            { q: 'What is an XML sitemap?', a: 'An XML sitemap is a file that lists your site URLs along with optional metadata like last modification date, change frequency, and priority. It helps search engines discover and crawl your pages efficiently, especially on large or complex sites.' },
            { q: 'Does a sitemap guarantee indexing?', a: 'No. A sitemap helps search engines find your URLs, but indexing still depends on content quality, crawl budget, and other ranking factors. Think of it as a helpful hint, not a guarantee.' },
            { q: 'What is the 50,000 URL limit?', a: 'A single sitemap file may contain up to 50,000 URLs and be no larger than 50 MB. For larger sites, split URLs across multiple sitemap files and list them in a sitemap index file.' },
            { q: 'Do changefreq and priority matter?', a: 'They are considered hints, not commands. Google has stated it largely ignores changefreq and priority, but lastmod is respected when accurate. Still, including them does no harm and helps some other search engines.' },
            { q: 'Where should I host my sitemap?', a: 'Upload sitemap.xml to your site root so it is reachable at https://example.com/sitemap.xml. You can also reference it in robots.txt with a Sitemap: directive so crawlers find it automatically.' },
            { q: 'How often should I regenerate my sitemap?', a: 'Regenerate whenever you add, remove, or significantly update pages. For dynamic sites, automate sitemap generation so it always reflects your current URL structure and latest lastmod dates.' },
          ]}
        />
      </section>

      <RelatedTools slug="sitemap-generator" tools={relatedTools} />
    </>
  );
}
