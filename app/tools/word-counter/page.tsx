import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, AlignLeft } from 'lucide-react';

import { WordCounter } from '@/components/text/word-character-counter';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Word Counter — Count Words & Characters Online Free | ToolNest',
  description:
    'Count words, characters, sentences, paragraphs and reading time in real time. Free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('word-counter', 3).filter((t) =>
  ['character-counter', 'case-converter', 'text-sorter'].includes(t.slug)
);

export default function WordCounterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Word Counter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-purple/25">
              <AlignLeft className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Word Counter</h1>
              <p className="mt-1 text-muted-foreground">Count words, characters, sentences and reading time live — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <WordCounter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Word Counter counts the number of words, characters, sentences, paragraphs, and lines in a piece of text, and estimates reading time. ToolNest's Word Counter updates all statistics in real time as you type or paste text. It is perfect for writers, students, and professionals who need to meet word count requirements for essays, articles, social media posts, or SEO content. The tool runs entirely in your browser — no text is uploaded."
          howTo={[
            'Type or paste your text into the input area.',
            'Watch the statistics panel update live as you type.',
            'Use "Copy" to copy your text or "Clear" to start over.',
            'Review word count, character count, sentences, paragraphs, and estimated reading time.',
          ]}
          benefits={[
            { title: 'Real-time counting', description: 'Every statistic updates instantly as you type — no buttons to click, no waiting.' },
            { title: 'Comprehensive stats', description: 'Words, characters (with and without spaces), sentences, paragraphs, lines, and reading time — all at a glance.' },
            { title: 'Reading time estimate', description: 'See how long it would take to read your text at average speed, useful for blog posts and presentations.' },
            { title: '100% private', description: 'All counting happens in your browser. Your text is never uploaded to a server.' },
          ]}
          faqs={[
            { q: 'How are words counted?', a: 'Words are counted by splitting the text on whitespace. Groups of non-whitespace characters separated by spaces, tabs, or newlines each count as one word.' },
            { q: 'What is reading time based on?', a: 'Reading time is estimated at 200 words per minute, which is the average silent reading speed for adults. It is a rough guide, not an exact measurement.' },
            { q: 'Does it count characters with spaces?', a: 'Yes. The tool shows both total characters (including spaces) and characters without spaces, so you can match any word count requirement.' },
            { q: 'Is my text stored?', a: 'No. All analysis happens locally in your browser. Your text is never sent to a server, stored, or logged.' },
            { q: 'Can I use it for social media limits?', a: 'Yes. Use the character counter to stay within Twitter/X (280), SMS (160), or meta description (160) limits.' },
            { q: 'Does it work offline?', a: 'Once the page is loaded, the word counting works without an internet connection since all processing happens in your browser.' },
          ]}
        />
      </section>

      <RelatedTools slug="word-counter" tools={relatedTools} />
    </>
  );
}
