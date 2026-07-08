import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Slash } from 'lucide-react';

import { SlugGenerator } from '@/components/seo/analyzers';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Slug Generator — Create SEO-Friendly URL Slugs Online | ToolNest',
  description:
    'Convert titles into clean, SEO-friendly URL slugs. Lowercase, hyphenated, stop-word removal, and transliteration — free, no sign-up.',
};

const relatedTools = getRelatedTools('slug-generator', 3).filter((t) =>
  ['keyword-density-checker', 'canonical-url-generator', 'meta-tag-generator'].includes(t.slug)
);

export default function SlugGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Slug Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Slash className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Slug Generator</h1>
              <p className="mt-1 text-muted-foreground">Turn titles into clean, SEO-friendly URL slugs — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SlugGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A slug generator converts a page title or headline into a clean, URL-safe slug — the human-readable portion of a web address. Good slugs are lowercase, use hyphens to separate words, strip punctuation and special characters, and keep the most meaningful keywords. ToolNest's Slug Generator handles all of this automatically: it lowercases your text, transliterates accented characters, removes stop words if you choose, and collapses multiple spaces or hyphens into a single delimiter. The result is a concise, crawlable slug ideal for blog posts, product pages, and documentation."
          howTo={[
            'Paste or type your page title into the input field.',
            'Toggle stop-word removal to drop filler words like "the", "a", and "of".',
            'Choose a separator — hyphen is the SEO standard, but underscore is available.',
            'Optionally set a maximum slug length to keep URLs short and tidy.',
            'Watch the slug update instantly as you adjust the options.',
            'Click "Copy" to grab the slug and use it in your CMS or route.',
          ]}
          benefits={[
            { title: 'Readable, keyword-rich URLs', description: 'Produces concise slugs that highlight your most important keywords, which users and search engines both prefer over random IDs.' },
            { title: 'Accented-character transliteration', description: 'Automatically converts accented and non-ASCII characters to their plain equivalents so URLs stay valid across every browser and server.' },
            { title: 'Stop-word control', description: 'Optionally strip common filler words to keep slugs shorter and focused on the terms that actually matter for search relevance.' },
            { title: 'Instant, private generation', description: 'Slugs are generated live in your browser as you type — nothing is sent to a server, and there is no sign-up required.' },
          ]}
          faqs={[
            { q: 'What is a URL slug?', a: 'A slug is the human-readable part of a URL that identifies a specific page, usually derived from the page title. For example, in "/blog/how-to-bake-bread", the slug is "how-to-bake-bread".' },
            { q: 'Should slugs use hyphens or underscores?', a: 'Hyphens are the SEO standard. Google treats hyphens as word separators, while underscores are treated as part of a single word. Always use hyphens for maximum readability and search clarity.' },
            { q: 'How long should a slug be?', a: 'Aim for 3–5 words. Shorter slugs are easier to read, share, and remember, and they put your key terms closer to the root domain. Avoid slugging an entire long headline verbatim.' },
            { q: 'Should I remove stop words from slugs?', a: 'Removing filler words like "the", "a", and "of" shortens the slug and focuses on meaningful keywords. It is generally recommended, but keep stop words when removing them would make the slug confusing or grammatically odd.' },
            { q: 'Do slugs affect SEO?', a: 'Yes, indirectly. Descriptive, keyword-rich slugs help search engines and users understand what a page is about, and they can improve click-through rate in search results. Avoid vague slugs like /p=123 in favor of readable ones.' },
            { q: 'Can I change a slug after publishing?', a: 'You can, but always set up a 301 redirect from the old URL to the new one. Changing a slug without redirecting breaks links, loses accumulated ranking signals, and creates a poor user experience.' },
          ]}
        />
      </section>

      <RelatedTools slug="slug-generator" tools={relatedTools} />
    </>
  );
}
