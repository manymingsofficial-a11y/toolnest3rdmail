import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CaseSensitive } from 'lucide-react';

import { CaseConverter } from '@/components/text/case-converter';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Case Converter — Convert Text Case Online Free | ToolNest',
  description:
    'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, or tOGGLE cASE. Free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('case-converter', 3).filter((t) =>
  ['word-counter', 'character-counter', 'text-sorter'].includes(t.slug)
);

export default function CaseConverterPage() {
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
            <span className="text-foreground">Case Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg shadow-brand-purple/25">
              <CaseSensitive className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Case Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert text between upper, lower, title, sentence and toggle case — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CaseConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Case Converter changes the capitalization of text between five common formats: UPPERCASE (all caps), lowercase (no caps), Title Case (each word capitalized), Sentence case (first letter of each sentence capitalized), and tOGGLE cASE (reverses the case of every letter). ToolNest's Case Converter shows a live preview of the converted text and lets you copy the result with one click. It is useful for fixing accidentally-enabled caps lock, formatting titles, and standardizing text for different contexts."
          howTo={[
            'Type or paste your text into the input area.',
            'Select a conversion mode: UPPERCASE, lowercase, Title Case, Sentence case, or tOGGLE cASE.',
            'The output updates automatically with a live preview.',
            'Click "Copy" to copy the converted text to your clipboard.',
          ]}
          benefits={[
            { title: 'Five case modes', description: 'Switch between UPPERCASE, lowercase, Title Case, Sentence case, and tOGGLE cASE — cover every common text formatting need.' },
            { title: 'Live preview', description: 'See the converted text instantly as you type and switch modes — no buttons to click, no waiting.' },
            { title: 'One-click copy', description: 'Copy the converted text to your clipboard with a single click for immediate use anywhere.' },
            { title: 'Free and private', description: 'All conversion happens in your browser. No uploads, no sign-up, no limits.' },
          ]}
          faqs={[
            { q: 'What is Title Case?', a: 'Title Case capitalizes the first letter of every word: "Hello World From Toolnest". It is commonly used for headings, titles, and book names.' },
            { q: 'What is Sentence case?', a: 'Sentence case capitalizes only the first letter of each sentence and leaves the rest lowercase: "Hello world from toolnest." It is used for normal prose.' },
            { q: 'What is tOGGLE cASE?', a: 'Toggle Case reverses the case of every letter — uppercase becomes lowercase and vice versa. It is useful for fixing text typed with caps lock on.' },
            { q: 'Does it work with large texts?', a: 'Yes. The converter handles large text blocks efficiently. However, it processes text in your browser, so extremely large files may be slow.' },
            { q: 'Is my text stored?', a: 'No. All conversion happens locally in your browser. Your text is never sent to a server, stored, or logged.' },
            { q: 'Can I convert multiple paragraphs?', a: 'Yes. Paste as many paragraphs as you like — the converter processes the entire text block at once.' },
          ]}
        />
      </section>

      <RelatedTools slug="case-converter" tools={relatedTools} />
    </>
  );
}
