import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ListOrdered } from 'lucide-react';

import { RemoveDuplicateLines } from '@/components/text/text-tools';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines — Deduplicate Text Online Free | ToolNest',
  description:
    'Remove duplicate lines from any text instantly. Case sensitive or insensitive — free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('remove-duplicate-lines', 3).filter((t) =>
  ['text-sorter', 'case-converter', 'word-counter'].includes(t.slug)
);

export default function RemoveDuplicateLinesPage() {
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
            <span className="text-foreground">Remove Duplicate Lines</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white shadow-lg shadow-brand-purple/25">
              <ListOrdered className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Remove Duplicate Lines</h1>
              <p className="mt-1 text-muted-foreground">Remove duplicate lines from any text instantly — free, private, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <RemoveDuplicateLines />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Remove Duplicate Lines tool scans a block of text and removes any lines that appear more than once, keeping only the first occurrence of each unique line. ToolNest's Remove Duplicate Lines tool works in real time and supports both case-sensitive and case-insensitive matching. It shows how many lines were removed and the remaining line count. It is perfect for cleaning up email lists, log files, CSV data, or any text where duplicates waste space or cause errors."
          howTo={[
            'Paste your text with duplicate lines into the input area.',
            'Toggle "Case sensitive" on to treat "Apple" and "apple" as different, or off to treat them as the same.',
            'The output updates automatically with only unique lines.',
            'Review how many duplicates were removed.',
            'Click "Copy" to copy the deduplicated text.',
          ]}
          benefits={[
            { title: 'Instant deduplication', description: 'Duplicates are removed in real time as you paste or type — no buttons, no waiting.' },
            { title: 'Case-sensitive or insensitive', description: 'Choose whether "Apple" and "apple" count as duplicates or distinct lines, depending on your data.' },
            { title: 'Clear statistics', description: 'See exactly how many lines were removed and how many remain, so you can verify the result at a glance.' },
            { title: '100% private', description: 'All processing happens in your browser. Your text is never uploaded to a server.' },
          ]}
          faqs={[
            { q: 'How does it decide which lines are duplicates?', a: 'Each line is compared to the lines that came before it. If a line has already appeared, it is removed. The first occurrence is always kept.' },
            { q: 'What does case sensitive mean?', a: 'When case sensitive is on, "Apple" and "apple" are treated as different lines. When off, they are treated as the same — only the first is kept.' },
            { q: 'Does it preserve line order?', a: 'Yes. Lines appear in the output in the same order as the input, with duplicates removed. The first occurrence of each line keeps its position.' },
            { q: 'Can it handle large text files?', a: 'Yes. The tool processes text efficiently in your browser and can handle thousands of lines without issues.' },
            { q: 'Is my text stored?', a: 'No. All processing happens locally in your browser. Your text is never sent to a server, stored, or logged.' },
            { q: 'Will it remove empty lines?', a: 'No. Empty lines are treated as regular lines. If there are multiple empty lines, only the first is kept. To remove all empty lines, use the Text Sorter tool.' },
          ]}
        />
      </section>

      <RelatedTools slug="remove-duplicate-lines" tools={relatedTools} />
    </>
  );
}
