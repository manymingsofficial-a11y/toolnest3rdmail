import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FilePlus2 } from 'lucide-react';

import { PdfMerge } from '@/components/pdf/pdf-merge';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'PDF Merge — Combine PDFs Online Free | ToolNest',
  description:
    'Merge multiple PDF files into one. Drag & drop to upload, reorder pages, and download your combined PDF — free, in your browser, no sign-up.',
  openGraph: {
    title: 'PDF Merge — Combine PDFs Online Free | ToolNest',
    description:
      'Combine multiple PDFs into a single file. Drag, reorder, merge and download — free, no registration.',
  },
};

const relatedTools = getRelatedTools('pdf-merge', 3).filter((t) =>
  ['pdf-split', 'pdf-compress', 'qr-code-generator'].includes(t.slug)
);

export default function PdfMergePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-orange-400/20 blur-[120px]" />
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
            <span className="text-foreground">PDF Merge</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-brand-purple/25">
              <FilePlus2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                PDF Merge
              </h1>
              <p className="mt-1 text-muted-foreground">
                Combine multiple PDFs into one — drag, reorder, and download.
                Free, instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PdfMerge />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A PDF Merge tool combines several PDF files into a single document. Instead of emailing five separate attachments or switching between tabs, you load them all here, put them in the right order, and download one combined PDF. ToolNest's PDF Merge runs entirely in your browser using the open-source pdf-lib library — your files are never uploaded to a server. You can drag and drop to add files, drag to reorder them, remove individual files, and merge everything with a single click."
          howTo={[
            'Click the upload area or drag multiple PDF files onto it.',
            'Reorder the files by dragging them, or use the up and down arrows on each file.',
            'Remove any file you do not want with the X button, or use Clear All to start over.',
            'Click "Merge PDFs" — a progress bar shows each file being processed.',
            'When the merge is complete, click "Download merged PDF" to save the result.',
          ]}
          benefits={[
            {
              title: 'Drag & drop everything',
              description:
                'Add files by dragging them onto the upload area, and reorder them by dragging list items — no forms, no menus.',
            },
            {
              title: '100% private',
              description:
                'Files are processed locally in your browser with pdf-lib. Nothing is uploaded, so sensitive documents stay safe.',
            },
            {
              title: 'Unlimited and free',
              description:
                'Merge as many PDFs as you need with no file limits, no watermarks, and no registration.',
            },
            {
              title: 'Reorder with precision',
              description:
                'Drag to rearrange or use arrow buttons for exact control over the final page order before merging.',
            },
          ]}
          faqs={[
            {
              q: 'Is there a limit to how many PDFs I can merge?',
              a: 'There is no hard limit set by the tool. Because merging happens in your browser, the practical limit depends on your device memory. Most computers handle dozens of files without issue.',
            },
            {
              q: 'Are my files uploaded to a server?',
              a: 'No. PDF Merge runs entirely in your browser using the open-source pdf-lib library. Your files never leave your device.',
            },
            {
              q: 'Can I reorder the PDFs after uploading?',
              a: 'Yes. Drag any file in the list to reposition it, or use the up and down arrow buttons on each item.',
            },
            {
              q: 'Does merging reduce the quality of my PDFs?',
              a: 'No. Merging combines the original pages exactly as they are — no re-encoding, compression, or quality loss occurs.',
            },
            {
              q: 'Can I merge password-protected PDFs?',
              a: 'The tool attempts to load encrypted PDFs with ignoreEncryption enabled, but genuinely password-protected files that require a password to open cannot be merged.',
            },
            {
              q: 'Does it work on mobile?',
              a: 'Yes. The interface is fully responsive — you can upload, reorder, and merge PDFs on a phone or tablet.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="pdf-merge" tools={relatedTools} />
    </>
  );
}
