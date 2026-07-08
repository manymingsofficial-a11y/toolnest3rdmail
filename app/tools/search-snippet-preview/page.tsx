import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';

import { SearchSnippetPreview } from '@/components/seo/analyzers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Search Snippet Preview — Google SERP Preview Tool | ToolNest',
  description:
    'Preview how your page title and meta description appear in Google search results. Test length, avoid truncation, and boost click-through — free.',
};

const relatedTools = getRelatedTools('search-snippet-preview', 3).filter((t) =>
  ['meta-tag-generator', 'open-graph-generator', 'twitter-card-generator'].includes(t.slug)
);

export default function SearchSnippetPreviewPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Search Snippet Preview</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Search className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Search Snippet Preview</h1>
              <p className="mt-1 text-muted-foreground">Preview your Google search result before you publish — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SearchSnippetPreview />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A search snippet preview tool renders a realistic mockup of how your page will appear in Google search results — the blue clickable title, the green URL breadcrumb, and the gray description beneath it. This lets you experiment with different titles and descriptions, see exactly where Google truncates them, and optimize for maximum click-through rate before you publish. ToolNest's preview mimics Google's desktop and mobile layouts, shows live character counts against Google's pixel-based truncation limits, and helps you write compelling, accurate snippets that earn more clicks from the same ranking position."
          howTo={[
            'Enter your page title and meta description into the input fields.',
            'Add your page URL to see how the breadcrumb-style URL will display.',
            'Toggle between desktop and mobile preview layouts.',
            'Watch the character counters change color as you approach truncation limits.',
            'Rewrite the title and description until the preview reads cleanly without being cut off.',
            'Copy your finalized title and description into your CMS or meta tags.',
          ]}
          benefits={[
            { title: 'See truncation before publishing', description: 'Pixel-based counters reveal exactly where Google will cut off your title and description, so you never ship a snippet that ends mid-word.' },
            { title: 'Desktop and mobile layouts', description: 'Switch between desktop and mobile previews, since mobile truncates at different widths and a snippet that works on one may fail on the other.' },
            { title: 'Higher click-through rate', description: 'Craft compelling, accurate titles and descriptions that attract clicks from the same ranking position — small wording changes can meaningfully lift CTR.' },
            { title: 'No publishing required', description: 'Iterate on your snippet entirely offline. You see the result instantly without deploying changes to a live page or waiting for re-crawling.' },
          ]}
          faqs={[
            { q: 'What is a search snippet?', a: 'A search snippet is the block of text Google displays for each result: the blue title, the URL breadcrumb, and the gray description. It is generated from your page title, meta description, and URL, and it heavily influences whether users click your result.' },
            { q: 'How long can the title be?', a: 'Google truncates titles at roughly 50–60 characters on desktop, though it uses pixel width rather than a strict character count. Aim for 60 characters maximum, and put the most important words near the start.' },
            { q: 'How long can the meta description be?', a: 'Descriptions are typically truncated around 155–160 characters on desktop and slightly shorter on mobile. Write around 150 characters to be safe, and front-load the most compelling information.' },
            { q: 'Will Google always use my title and description?', a: 'No. Google may rewrite titles or generate its own description based on page content and the user query. Your tags are strong suggestions, and writing clear, relevant snippets increases the chance they are used as-is.' },
            { q: 'Does the preview match exactly what Google shows?', a: 'The preview is a close approximation based on Google\'s typical truncation widths. Real results vary by device, language, and query. Use it as a reliable guide, not a pixel-perfect guarantee.' },
            { q: 'How does snippet quality affect SEO?', a: 'A well-written snippet improves click-through rate, which can indirectly benefit rankings through engagement signals. More importantly, higher CTR means more traffic from the same ranking position — a direct win even if rankings do not change.' },
          ]}
        />
      </section>

      <RelatedTools slug="search-snippet-preview" tools={relatedTools} />
    </>
  );
}
