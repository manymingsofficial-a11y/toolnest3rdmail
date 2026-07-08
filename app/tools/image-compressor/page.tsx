import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Gauge } from 'lucide-react';

import { ImageCompressor } from '@/components/image/image-compressor';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Image Compressor — Reduce Image Size Online Free | ToolNest',
  description:
    'Compress JPG and PNG images with Low, Medium, or High compression. See before/after comparison and percentage saved — free, in your browser, no sign-up.',
  openGraph: {
    title: 'Image Compressor — Reduce Image Size Online Free | ToolNest',
    description:
      'Shrink image file size with three compression levels. Free, fast, and no registration.',
  },
};

const relatedTools = getRelatedTools('image-compressor', 3).filter((t) =>
  ['image-resizer', 'image-converter', 'image-cropper'].includes(t.slug)
);

export default function ImageCompressorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-[120px]" />
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
            <span className="text-foreground">Image Compressor</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-600 text-white shadow-lg shadow-brand-purple/25">
              <Gauge className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Image Compressor
              </h1>
              <p className="mt-1 text-muted-foreground">
                Reduce image file size with three compression levels — free,
                instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ImageCompressor />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Image Compressor reduces the file size of an image so it loads faster on websites, fits into email attachments, and takes up less storage — all while keeping the picture looking good. ToolNest's Image Compressor offers three compression levels: Low for the best quality with a mild reduction, Medium for a balance of quality and size, and High for the smallest possible file. The tool runs entirely in your browser using the native Canvas API, so your images are never uploaded to a server. A before/after slider lets you compare the result visually, and you see the exact file size and percentage saved before downloading."
          howTo={[
            'Drag an image onto the upload area or click to browse.',
            'Select a compression level: Low, Medium, or High.',
            'Click "Compress" — the progress bar shows the process.',
            'Use the before/after slider to compare quality visually.',
            'Review the original size, compressed size, and percentage saved.',
            'Click "Download" to save the compressed image.',
          ]}
          benefits={[
            {
              title: 'Three precision levels',
              description:
                'Choose Low for near-original quality, Medium for a balanced reduction, or High for the smallest file — you decide the trade-off.',
            },
            {
              title: 'Visual before/after comparison',
              description:
                'A draggable slider lets you see exactly how the compression affects your image before you commit to downloading.',
            },
            {
              title: '100% private',
              description:
                'Compression runs locally in your browser using the Canvas API. Your images are never uploaded anywhere.',
            },
            {
              title: 'Free with no watermarks',
              description:
                'Compress unlimited images at no cost. The output has no watermarks and no registration is required.',
            },
          ]}
          faqs={[
            {
              q: 'Which compression level should I use?',
              a: 'Use Low when visual quality is critical and you only need a mild reduction. Use Medium for websites and email — it gives a good balance. Use High when you need the smallest possible file and can accept some quality loss.',
            },
            {
              q: 'What image formats are supported?',
              a: 'JPG and PNG are supported. The output format matches your input — PNG stays PNG (lossless), and JPG stays JPG (lossy compression with the quality you select).',
            },
            {
              q: 'Are my images uploaded to a server?',
              a: 'No. All compression happens in your browser using the native Canvas API. Your images never leave your device.',
            },
            {
              q: 'Will compression reduce the dimensions of my image?',
              a: 'No. The compressor only reduces file size through quality adjustments — your image keeps its original width and height.',
            },
            {
              q: 'How much can I expect to save?',
              a: 'It depends on the image. Already-optimized JPGs may compress 10-30%, while large PNGs and uncompressed photos can shrink 50-80% at Medium or High levels.',
            },
            {
              q: 'Is there a file size limit?',
              a: 'There is no set limit, but because compression runs in your browser, very large images may be constrained by your device memory. Images under 50MB work reliably.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="image-compressor" tools={relatedTools} />
    </>
  );
}
