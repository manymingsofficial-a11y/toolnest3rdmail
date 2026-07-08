import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Archive } from 'lucide-react';

import { PdfCompress } from '@/components/pdf/pdf-compress';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'PDF Compress — Reduce PDF File Size Online Free | ToolNest',
  description:
    'Compress PDF files with Low, Medium, or High compression. See original vs compressed size and percentage saved — free, in your browser, no sign-up.',
  openGraph: {
    title: 'PDF Compress — Reduce PDF File Size Online Free | ToolNest',
    description:
      'Shrink PDF file size with three compression levels. Free, fast, and no registration required.',
  },
};

const relatedTools = getRelatedTools('pdf-compress', 3).filter((t) =>
  ['pdf-merge', 'pdf-split', 'image-compressor'].includes(t.slug)
);

export default function PdfCompressPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-red-400/20 blur-[120px]" />
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
            <span className="text-foreground">PDF Compress</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-400 to-orange-600 text-white shadow-lg shadow-brand-purple/25">
              <Archive className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                PDF Compress
              </h1>
              <p className="mt-1 text-muted-foreground">
                Reduce PDF file size with three compression levels — free,
                instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PdfCompress />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A PDF Compress tool reduces the file size of a PDF document so it is easier to email, upload, or share. ToolNest's PDF Compress offers three compression levels — Low for best quality with mild reduction, Medium for a balance of quality and size, and High for the smallest possible file. The tool runs entirely in your browser using the open-source pdf-lib and pdf.js libraries, so your documents are never uploaded to a server. You see the original size, the compressed size, and the exact percentage saved before downloading."
          howTo={[
            'Upload a PDF by dragging it onto the upload area or clicking to browse.',
            'Select a compression level: Low, Medium, or High.',
            'Click "Compress PDF" — the progress bar shows each page being processed.',
            'Review the original size, compressed size, and percentage saved in the result panel.',
            'Click "Download compressed PDF" to save the smaller file.',
          ]}
          benefits={[
            {
              title: 'Three compression levels',
              description:
                'Choose Low for near-original quality, Medium for a balanced reduction, or High for the smallest file size.',
            },
            {
              title: 'See exactly how much you saved',
              description:
                'The result panel shows the original size, the compressed size, and the percentage saved — no guesswork.',
            },
            {
              title: 'Private and secure',
              description:
                'Compression runs locally in your browser. Your PDF is never uploaded to any server.',
            },
            {
              title: 'Free with no watermarks',
              description:
                'Compress unlimited PDFs at no cost. The output file has no watermarks and no registration is required.',
            },
          ]}
          faqs={[
            {
              q: 'Which compression level should I choose?',
              a: 'Use Low when quality matters most and you only need a mild reduction. Use Medium for email attachments and general sharing. Use High when you need the smallest possible file and can accept lower image quality.',
            },
            {
              q: 'How does the compression work?',
              a: 'The tool re-renders each page as an optimized JPEG image at a resolution and quality matching your chosen level, then rebuilds the PDF with object stream compression. Text-heavy PDFs may compress less than image-heavy ones.',
            },
            {
              q: 'Will the text in my PDF stay selectable?',
              a: 'At High and Medium levels, pages are rendered as images so text is no longer selectable — it remains fully visible and readable. At Low level the original structure is preserved whenever possible.',
            },
            {
              q: 'Are my files uploaded to a server?',
              a: 'No. All compression happens in your browser using the open-source pdf-lib and pdf.js libraries. Your document never leaves your device.',
            },
            {
              q: 'Why is my compressed file sometimes not much smaller?',
              a: 'PDFs that are already optimized or contain mostly text may have little redundant data to remove. Image-heavy PDFs and scanned documents see the largest reductions.',
            },
            {
              q: 'Is there a file size limit?',
              a: 'There is no set limit, but because compression runs in your browser, very large PDFs may be limited by your device memory. For best results, compress files under a few hundred megabytes.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="pdf-compress" tools={relatedTools} />
    </>
  );
}
