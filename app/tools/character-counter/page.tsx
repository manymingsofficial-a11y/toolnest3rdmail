import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Hash } from 'lucide-react';

import { CharacterCounter } from '@/components/text/word-character-counter';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Character Counter — Count Characters Online Free | ToolNest',
  description:
    'Count characters, letters, digits, spaces and words in real time. Perfect for social media limits — free, in your browser.',
};

const relatedTools = getRelatedTools('character-counter', 3).filter((t) =>
  ['word-counter', 'case-converter', 'lorem-ipsum-generator'].includes(t.slug)
);

export default function CharacterCounterPage() {
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
            <span className="text-foreground">Character Counter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-lg shadow-brand-purple/25">
              <Hash className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Character Counter</h1>
              <p className="mt-1 text-muted-foreground">Count characters, letters, digits and spaces live — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CharacterCounter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Character Counter counts the exact number of characters in a piece of text, broken down by type: total characters, characters without spaces, letters, digits, spaces, words, and lines. ToolNest's Character Counter updates in real time as you type. It is essential for staying within character limits on social media platforms, SMS messages, meta descriptions, and form fields with maximum lengths."
          howTo={[
            'Type or paste your text into the input area.',
            'Watch the character counts update live as you type.',
            'Review total characters, characters without spaces, letters, digits, and more.',
            'Use "Copy" to copy your text or "Clear" to start over.',
          ]}
          benefits={[
            { title: 'Detailed breakdown', description: 'See total characters, characters without spaces, letters, digits, spaces, words, and lines — all at once.' },
            { title: 'Perfect for social media', description: 'Stay within Twitter/X (280), SMS (160), Instagram caption (2200), and meta description (160) character limits.' },
            { title: 'Real-time updates', description: 'Every count updates instantly as you type — no buttons, no waiting, no page reloads.' },
            { title: '100% private', description: 'All counting happens locally in your browser. Your text never leaves your device.' },
          ]}
          faqs={[
            { q: 'What is the character limit for Twitter/X?', a: 'Twitter/X allows 280 characters per tweet. Use the total character count to ensure your tweet fits within the limit.' },
            { q: 'What counts as a character?', a: 'Every character counts, including letters, digits, spaces, punctuation, and symbols. The "Characters (no spaces)" count excludes whitespace.' },
            { q: 'Does it count emojis?', a: 'Yes, but note that emojis can be counted as 1 or 2 characters depending on the platform, because some emojis are represented as surrogate pairs in Unicode.' },
            { q: 'Is my text stored?', a: 'No. All counting happens in your browser. Your text is never sent to a server, stored, or logged.' },
            { q: 'Can I use it for SEO meta descriptions?', a: 'Yes. Google typically displays up to 160 characters of a meta description. Use the counter to stay within that limit.' },
            { q: 'What is the difference between this and the Word Counter?', a: 'The Character Counter focuses on character-level counts (letters, digits, spaces), while the Word Counter focuses on word, sentence, and paragraph counts with reading time. Both are useful for different tasks.' },
          ]}
        />
      </section>

      <RelatedTools slug="character-counter" tools={relatedTools} />
    </>
  );
}
