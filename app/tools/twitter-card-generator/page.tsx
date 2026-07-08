import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Twitter } from 'lucide-react';

import { TwitterCardGenerator } from '@/components/seo/generators';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Twitter Card Generator — Create Twitter Meta Tags Online | ToolNest',
  description:
    'Generate Twitter Card meta tags (summary, summary_large_image, player) with a live preview. Copy-ready HTML for rich tweets — free, no sign-up.',
};

const relatedTools = getRelatedTools('twitter-card-generator', 3).filter((t) =>
  ['open-graph-generator', 'meta-tag-generator', 'search-snippet-preview'].includes(t.slug)
);

export default function TwitterCardGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Twitter Card Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Twitter className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Twitter Card Generator</h1>
              <p className="mt-1 text-muted-foreground">Create Twitter Card tags for eye-catching link previews — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TwitterCardGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Twitter Card Generator builds the twitter: meta tags that turn a plain text link into a rich media card on X (formerly Twitter). When someone tweets a URL with proper Twitter Card tags, X automatically attaches a preview image, title, and description instead of showing a bare link. ToolNest's generator supports the common card types — summary (a small square card) and summary_large_image (a full-width image card) — and lets you set twitter:title, twitter:description, twitter:image, and your twitter:site handle. A live preview shows exactly how the card will render in a tweet."
          howTo={[
            'Choose a card type: "summary" for a compact card or "summary_large_image" for a big image.',
            'Enter the twitter:title and twitter:description (keep them tweet-friendly and concise).',
            'Paste an absolute image URL — 1200×628 px for summary_large_image, 1200×600 for summary.',
            'Add your twitter:site handle (e.g. @yourbrand) so X can attribute the card.',
            'Watch the live preview update to reflect your tweet-style card.',
            'Click "Copy HTML" and paste the tags into your page <head>.',
          ]}
          benefits={[
            { title: 'Higher engagement', description: 'Tweets with rich image cards consistently earn more clicks and retweets than plain-text links, making your shared content far more noticeable.' },
            { title: 'Card-type choice', description: 'Pick summary for a compact, text-forward card or summary_large_image for a bold, image-led preview — the right card for the right content.' },
            { title: 'Live tweet preview', description: 'See the exact card layout — image, title, description, and handle — rendered as it will appear in a real tweet, before you publish.' },
            { title: 'Copy-ready HTML', description: 'One click gives you valid twitter: meta tags to paste straight into your <head>, with no manual formatting or tag-order worries.' },
          ]}
          faqs={[
            { q: 'What is a Twitter Card?', a: 'A Twitter Card is a rich preview attached to a tweeted link. By adding twitter: meta tags to your page, X displays an image, title, and description alongside the URL instead of a plain text link, making your tweets more engaging.' },
            { q: 'What are the main card types?', a: 'The two most common are "summary" (a small square card with a thumbnail) and "summary_large_image" (a full-width image card). There are also "player" and "app" cards for media and mobile-app content.' },
            { q: 'What image dimensions should I use?', a: 'For summary_large_image, use 1200×628 pixels. For summary cards, 1200×600 pixels works well. Images must be under 5 MB and hosted at a publicly accessible absolute URL.' },
            { q: 'Does X still use Twitter Cards?', a: 'Yes. Despite the rebrand to X, the twitter: meta tag names remain unchanged and the platform continues to render rich cards. The underlying protocol is the same.' },
            { q: 'How do I test my Twitter Card?', a: 'Use the X Card Validator (or Twitter\'s legacy Card Validator) by pasting your URL. It forces a re-scrape and shows you the exact card preview. This is also the fix when an old preview is cached.' },
            { q: 'Do Twitter Card tags help SEO?', a: 'Twitter Card tags are not a direct Google ranking factor, but richer tweets drive more clicks and traffic, which can indirectly support your SEO through engagement and brand visibility.' },
          ]}
        />
      </section>

      <RelatedTools slug="twitter-card-generator" tools={relatedTools} />
    </>
  );
}
