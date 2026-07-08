import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Repeat } from 'lucide-react';

import { ImageConverter } from '@/components/image/image-converter';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Image Converter — Convert JPG, PNG, WEBP Online Free | ToolNest',
  description:
    'Convert images between JPG, PNG and WEBP formats. See before/after comparison and file size change — free, in your browser, no sign-up.',
  openGraph: {
    title: 'Image Converter — Convert JPG, PNG, WEBP Online Free | ToolNest',
    description:
      'Convert images between JPG, PNG and WEBP. Free, fast, and no registration.',
  },
};

const relatedTools = getRelatedTools('image-converter', 3).filter((t) =>
  ['image-compressor', 'image-resizer', 'image-cropper'].includes(t.slug)
);

export default function ImageConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-[120px]" />
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
            <span className="text-foreground">Image Converter</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 text-white shadow-lg shadow-brand-purple/25">
              <Repeat className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Image Converter
              </h1>
              <p className="mt-1 text-muted-foreground">
                Convert images between JPG, PNG and WEBP — free, instant, no
                sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ImageConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Image Converter changes the file format of an image — for example, turning a PNG into a JPG or a JPG into a WEBP — without changing its visual content. Different formats serve different purposes: JPG is best for photographs, PNG preserves transparency and sharp edges, and WEBP delivers the smallest file size with good quality for modern websites. ToolNest's Image Converter runs entirely in your browser using the native Canvas API, so your images are never uploaded. A before/after slider lets you compare the result, and you see both the source and converted file sizes before downloading."
          howTo={[
            'Drag an image onto the upload area or click to browse.',
            'Choose a target format: JPG, PNG, or WEBP.',
            'Click "Convert" — the progress bar shows the process.',
            'Use the before/after slider to compare the result visually.',
            'Review the source format, output format, and file size.',
            'Click "Download" to save the converted image.',
          ]}
          benefits={[
            {
              title: 'Three modern formats',
              description:
                'Convert to JPG for photos, PNG for transparency, or WEBP for the smallest modern file size — all from one tool.',
            },
            {
              title: 'Smart format handling',
              description:
                'When converting to JPG, transparent backgrounds are automatically filled white so you never get an ugly black background.',
            },
            {
              title: 'See the size difference',
              description:
                'The result panel shows both the original and converted file sizes, so you know exactly how the format change affects storage.',
            },
            {
              title: 'Private and free',
              description:
                'Conversion runs locally in your browser. No uploads, no watermarks, no registration, and no limits.',
            },
          ]}
          faqs={[
            {
              q: 'Which format should I convert to?',
              a: 'Use JPG for photographs and images without transparency. Use PNG when you need transparency or sharp edges like logos. Use WEBP for websites — it produces the smallest files with quality comparable to JPG and PNG.',
            },
            {
              q: 'What happens to transparency when I convert PNG to JPG?',
              a: 'JPG does not support transparency. The converter automatically fills transparent areas with white so the result looks clean rather than having a black background.',
            },
            {
              q: 'Will conversion reduce the quality of my image?',
              a: 'Converting between lossy formats (like JPG to WEBP) involves re-encoding at high quality, so visible loss is minimal. Converting to PNG preserves full quality since PNG is lossless.',
            },
            {
              q: 'Are my images uploaded to a server?',
              a: 'No. All conversion happens in your browser using the native Canvas API. Your images never leave your device.',
            },
            {
              q: 'Can I convert multiple images at once?',
              a: 'This tool processes one image at a time for precise control and preview. For batch processing, convert each image individually — it takes just a few seconds each.',
            },
            {
              q: 'Is WEBP supported in all browsers?',
              a: 'WEBP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge. If you need maximum compatibility with older systems, choose JPG or PNG instead.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="image-converter" tools={relatedTools} />
    </>
  );
}
