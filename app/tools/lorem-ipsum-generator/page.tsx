import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Pilcrow } from 'lucide-react';

import { LoremIpsumGenerator } from '@/components/text/lorem-ipsum-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Placeholder Text Free | ToolNest',
  description:
    'Generate lorem ipsum placeholder text as words, sentences, or paragraphs. Copy or download — free, in your browser.',
};

const relatedTools = getRelatedTools('lorem-ipsum-generator', 3).filter((t) =>
  ['word-counter', 'character-counter', 'case-converter'].includes(t.slug)
);

export default function LoremIpsumGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Lorem Ipsum Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-lg shadow-brand-purple/25">
              <Pilcrow className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Lorem Ipsum Generator</h1>
              <p className="mt-1 text-muted-foreground">Generate placeholder text as words, sentences or paragraphs — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <LoremIpsumGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Lorem Ipsum Generator produces placeholder text — the classic Latin-like gibberish used by designers and developers to fill layouts before real content is available. ToolNest's Lorem Ipsum Generator lets you choose between generating words, sentences, or paragraphs, and control the quantity with a slider (1–100). The generated text uses the traditional lorem ipsum word pool with secure randomness for variety. You can copy the result or download it as a TXT file."
          howTo={[
            'Choose a unit: Words, Sentences, or Paragraphs.',
            'Use the slider to set how many to generate (1–100).',
            'The text generates automatically — click "Regenerate" for a fresh version.',
            'Click "Copy" to copy the text or "Download TXT" to save it as a file.',
          ]}
          benefits={[
            { title: 'Three output units', description: 'Generate exactly what you need: individual words, full sentences, or multi-sentence paragraphs.' },
            { title: 'Adjustable quantity', description: 'A slider lets you generate anywhere from 1 to 100 units, giving you precise control over the output length.' },
            { title: 'Copy or download', description: 'Copy the generated text to your clipboard or download it as a TXT file for use in your project.' },
            { title: 'Traditional word pool', description: 'Uses the classic lorem ipsum vocabulary so the placeholder text looks authentic in any design layout.' },
          ]}
          faqs={[
            { q: 'What is lorem ipsum?', a: 'Lorem ipsum is placeholder text derived from a 1st-century BC Latin work by Cicero. It has been used in printing and design since the 1500s to fill layouts with readable-looking text that does not distract from the visual design.' },
            { q: 'Why use lorem ipsum instead of real text?', a: 'Placeholder text lets designers and clients focus on visual layout, typography, and spacing without being distracted by the meaning of the words. It looks like real text but does not compete for attention.' },
            { q: 'Can I generate more than 100 paragraphs?', a: 'The slider goes up to 100. For more, click "Regenerate" and copy or download multiple batches, then combine them.' },
            { q: 'Is the generated text random?', a: 'Yes. Words are selected from the lorem ipsum pool using cryptographically secure randomness, so each generation produces a different arrangement.' },
            { q: 'Can I download the text?', a: 'Yes. Click "Download TXT" to save the generated text as a plain text file, ready to import into your project.' },
            { q: 'Is the text real Latin?', a: 'The words are real Latin, but the sentences are randomly assembled and do not form coherent Latin prose. This is intentional — the text is meant to be unreadable placeholder content.' },
          ]}
        />
      </section>

      <RelatedTools slug="lorem-ipsum-generator" tools={relatedTools} />
    </>
  );
}
