import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ListOrdered } from 'lucide-react';

import { TextSorter } from '@/components/text/text-tools';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Text Sorter — Sort Lines Online Free | ToolNest',
  description:
    'Sort text lines A-Z, Z-A, reverse order, or remove empty lines. Free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('text-sorter', 3).filter((t) =>
  ['remove-duplicate-lines', 'case-converter', 'word-counter'].includes(t.slug)
);

export default function TextSorterPage() {
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
            <span className="text-foreground">Text Sorter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 text-white shadow-lg shadow-brand-purple/25">
              <ListOrdered className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Text Sorter</h1>
              <p className="mt-1 text-muted-foreground">Sort lines alphabetically, reverse, or remove empty lines — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TextSorter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Text Sorter rearranges the lines of a text block according to a chosen rule: alphabetical (A→Z), reverse alphabetical (Z→A), reverse order (last line first), or by removing empty lines. ToolNest's Text Sorter applies the selected sort mode instantly and shows the result in a side-by-side output panel. It is useful for organizing lists, sorting data exports, cleaning up CSV files, or preparing text for further processing."
          howTo={[
            'Paste your text into the input area.',
            'Click a sort option: Sort A→Z, Sort Z→A, Reverse order, or Remove empty lines.',
            'The sorted output appears instantly in the output panel.',
            'Click "Copy" to copy the sorted result.',
          ]}
          benefits={[
            { title: 'Four sort modes', description: 'Alphabetical (A→Z), reverse alphabetical (Z→A), reverse order, and remove empty lines — cover every common sorting need.' },
            { title: 'Instant results', description: 'The sorted output appears the moment you click a sort option — no waiting, no page reloads.' },
            { title: 'Side-by-side view', description: 'Input and output are shown side by side so you can compare the original and sorted text at a glance.' },
            { title: 'Free and private', description: 'All sorting happens in your browser. No uploads, no sign-up, no limits.' },
          ]}
          faqs={[
            { q: 'What is the difference between Sort Z→A and Reverse order?', a: 'Sort Z→A sorts lines in reverse alphabetical order (Zebra before Apple). Reverse order simply flips the current line sequence (last line becomes first) without sorting.' },
            { q: 'Does sorting preserve my original text?', a: 'Yes. The input text is never modified. The sorted result appears in the output panel, and you can copy it or start over at any time.' },
            { q: 'Can I sort CSV or TSV data?', a: 'Yes, but the tool sorts entire lines, not individual fields. For CSV data, each row is treated as a single line and sorted by its full content.' },
            { q: 'Is the sorting case sensitive?', a: 'Sorting uses localeCompare with default settings, which is typically case-insensitive. "apple" and "Apple" will sort together.' },
            { q: 'Is my text stored?', a: 'No. All sorting happens locally in your browser. Your text is never sent to a server, stored, or logged.' },
            { q: 'Can I combine sorting with removing duplicates?', a: 'Yes. Sort first, then copy the output and paste it into the Remove Duplicate Lines tool for a clean, sorted, deduplicated list.' },
          ]}
        />
      </section>

      <RelatedTools slug="text-sorter" tools={relatedTools} />
    </>
  );
}
