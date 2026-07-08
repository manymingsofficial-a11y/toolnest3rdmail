import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Scissors } from 'lucide-react';

import { PdfSplit } from '@/components/pdf/pdf-split';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'PDF Split — Extract & Split PDF Pages Online Free | ToolNest',
  description:
    'Split a PDF by page range or into individual pages. Download each part separately — free, runs in your browser, no sign-up required.',
  openGraph: {
    title: 'PDF Split — Extract & Split PDF Pages Online Free | ToolNest',
    description:
      'Split any PDF by page range or into single-page files. Free, fast, and no registration.',
  },
};

const relatedTools = getRelatedTools('pdf-split', 3).filter((t) =>
  ['pdf-merge', 'pdf-compress', 'barcode-generator'].includes(t.slug)
);

export default function PdfSplitPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-rose-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">PDF Split</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 text-white shadow-lg shadow-brand-purple/25">
              <Scissors className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                PDF Split
              </h1>
              <p className="mt-1 text-muted-foreground">
                Extract page ranges or split every page into separate PDFs —
                free, instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PdfSplit />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A PDF Split tool divides a single PDF document into multiple smaller PDFs. You can either extract specific page ranges — for example, pages 1-3 and 7-9 as separate files — or split every page into its own one-page PDF. ToolNest's PDF Split runs entirely in your browser using the open-source pdf-lib library, so your documents are never uploaded to a server. It is perfect for sending just the pages someone needs, separating chapters, or breaking a large report into manageable sections."
          howTo={[
            'Upload a PDF by dragging it onto the upload area or clicking to browse.',
            'Choose a split mode: "By page range" or "Every page".',
            'If using page ranges, enter them as 1-based numbers separated by commas (e.g. 1-3, 5, 7-9).',
            'Click "Split PDF" — the progress bar shows each part being created.',
            'Download individual files from the results panel, or click "Download all" to save every part.',
          ]}
          benefits={[
            {
              title: 'Two flexible split modes',
              description:
                'Extract exact page ranges like 1-3 and 7-9, or instantly split every page into its own PDF file.',
            },
            {
              title: 'Completely private',
              description:
                'Splitting happens locally in your browser with pdf-lib. Your document is never uploaded anywhere.',
            },
            {
              title: 'Download individually or all at once',
              description:
                'Grab just the part you need, or download every split file with one click — your choice.',
            },
            {
              title: 'Free with no limits',
              description:
                'Split as many PDFs as you want, as many times as you need. No watermarks, no sign-up, no cost.',
            },
          ]}
          faqs={[
            {
              q: 'How do I specify page ranges?',
              a: 'Use 1-based page numbers separated by commas. A range is written with a hyphen, e.g. "1-3, 5, 7-9" produces three files: pages 1-3, page 5, and pages 7-9.',
            },
            {
              q: 'Can I split every page into its own PDF?',
              a: 'Yes. Select the "Every page" mode and the tool creates one single-page PDF per page in the document.',
            },
            {
              q: 'Are my files sent to a server?',
              a: 'No. All splitting is performed in your browser using pdf-lib. Your PDF never leaves your device.',
            },
            {
              q: 'Does splitting affect the quality of my PDF?',
              a: 'No. Splitting copies the original pages exactly into new PDF files — there is no re-encoding or quality loss.',
            },
            {
              q: 'What happens to pages I do not include in a range?',
              a: 'Pages not listed in any range are simply not included in the output. The original file on your device is never modified.',
            },
            {
              q: 'How are the output files named?',
              a: 'Each file is named after the original with a part number appended, e.g. "report-part-1.pdf", "report-part-2.pdf".',
            },
          ]}
        />
      </section>

      <RelatedTools slug="pdf-split" tools={relatedTools} />
    </>
  );
}
