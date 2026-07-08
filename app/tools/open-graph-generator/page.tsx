import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Share2 } from 'lucide-react';

import { OpenGraphGenerator } from '@/components/seo/generators';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Open Graph Generator — Create OG Tags for Social Sharing | ToolNest',
  description:
    'Generate Open Graph (og:) meta tags for Facebook, LinkedIn, and other social platforms. Live preview and copy-ready HTML — free, no sign-up.',
};

const relatedTools = getRelatedTools('open-graph-generator', 3).filter((t) =>
  ['meta-tag-generator', 'twitter-card-generator', 'search-snippet-preview'].includes(t.slug)
);

export default function OpenGraphGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Open Graph Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-lg shadow-brand-purple/25">
              <Share2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Open Graph Generator</h1>
              <p className="mt-1 text-muted-foreground">Create Open Graph tags for rich social sharing — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <OpenGraphGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Open Graph Generator creates the og: meta tags that control how your page appears when shared on Facebook, LinkedIn, Slack, Discord, and most other social platforms. Originally introduced by Facebook, the Open Graph protocol has become the de facto standard for social link previews. ToolNest's Open Graph Generator lets you set og:title, og:description, og:image, og:url, og:type, and site name, then renders a live preview of the card exactly as it will look when shared. The output is clean, copy-ready HTML you can drop straight into your page's <head>."
          howTo={[
            'Enter the og:title — keep it concise and compelling (around 40–60 characters).',
            'Write an og:description that expands on the title (around 60–160 characters).',
            'Paste an absolute image URL (recommended 1200×630 px for best preview rendering).',
            'Set og:url to the canonical page URL and pick an og:type (website, article, etc.).',
            'Add your site name so platforms can attribute the shared link correctly.',
            'Review the live preview, then click "Copy HTML" and paste it into your <head>.',
          ]}
          benefits={[
            { title: 'Universal social support', description: 'Open Graph is read by Facebook, LinkedIn, Slack, Discord, Telegram, and most messaging apps — one set of tags covers nearly every platform.' },
            { title: 'Accurate live preview', description: 'See the exact card layout — image, title, description, and domain — before you publish, so there are no surprises when someone shares your link.' },
            { title: 'Image dimension guidance', description: 'Built-in tips remind you to use a 1200×630 px image so your preview renders crisply without cropping on any platform.' },
            { title: 'Copy-ready HTML', description: 'Generates valid og: tags you can paste directly into your <head> — no manual attribute formatting or typo risk.' },
          ]}
          faqs={[
            { q: 'What is Open Graph?', a: 'Open Graph is a protocol introduced by Facebook that lets any web page become a rich object in social graphs. By adding og: meta tags to your <head>, you control the title, description, and image that appear when your URL is shared on social platforms.' },
            { q: 'What image size should I use?', a: 'The recommended size for an og:image is 1200×630 pixels with a 1.91:1 aspect ratio. This renders cleanly across Facebook, LinkedIn, and most messaging apps. Use an absolute URL and ensure the image is publicly accessible.' },
            { q: 'Do I still need Twitter Card tags?', a: 'Twitter can fall back on Open Graph tags, but for the most reliable rendering you should also add explicit twitter:card tags. Many teams generate both sets so previews look correct on every platform.' },
            { q: 'Why is my social preview not updating?', a: 'Platforms cache link previews aggressively. Use Facebook\'s Sharing Debugger or Twitter\'s Card Validator to force a re-scrape after you update your tags. Also confirm your image URL is publicly reachable and returns a 200 status.' },
            { q: 'What does og:type do?', a: 'og:type tells the platform what kind of object your page represents — such as "website" for a homepage or "article" for a blog post. It affects which additional structured properties platforms may parse and how the card is displayed.' },
            { q: 'Are Open Graph tags a ranking factor?', a: 'Open Graph tags are not a direct Google ranking signal, but they improve click-through rate from social shares, which can drive traffic and indirect SEO benefits. Their primary purpose is social presentation, not search rankings.' },
          ]}
        />
      </section>

      <RelatedTools slug="open-graph-generator" tools={relatedTools} />
    </>
  );
}
