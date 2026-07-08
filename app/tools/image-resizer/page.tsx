import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Scaling } from 'lucide-react';

import { ImageResizer } from '@/components/image/image-resizer';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Image Resizer — Resize Images Online Free | ToolNest',
  description:
    'Resize images to exact pixel dimensions with aspect ratio lock. Quick percentage presets, before/after preview — free, in your browser, no sign-up.',
  openGraph: {
    title: 'Image Resizer — Resize Images Online Free | ToolNest',
    description:
      'Resize images to exact dimensions with aspect ratio lock. Free, fast, and no registration.',
  },
};

const relatedTools = getRelatedTools('image-resizer', 3).filter((t) =>
  ['image-compressor', 'image-converter', 'image-cropper'].includes(t.slug)
);

export default function ImageResizerPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-[120px]" />
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
            <span className="text-foreground">Image Resizer</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-brand-purple/25">
              <Scaling className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Image Resizer
              </h1>
              <p className="mt-1 text-muted-foreground">
                Resize images to exact dimensions with aspect ratio lock —
                free, instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ImageResizer />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Image Resizer changes the pixel dimensions of an image — its width and height — so it fits a specific layout, upload requirement, or display size. ToolNest's Image Resizer lets you type exact pixel values for width and height, with an aspect ratio lock that keeps the proportions correct when you change one dimension. Quick percentage presets (25%, 50%, 75%) scale the image in one click. The tool runs entirely in your browser using the native Canvas API, so your images are never uploaded to a server. A before/after slider lets you preview the result before downloading."
          howTo={[
            'Drag an image onto the upload area or click to browse.',
            'Enter the desired width and/or height in pixels.',
            'Keep the link icon locked to preserve the aspect ratio, or unlock it for free dimensions.',
            'Use the 25%, 50%, or 75% buttons for quick proportional scaling.',
            'Click "Resize" and preview the result with the before/after slider.',
            'Click "Download" to save the resized image.',
          ]}
          benefits={[
            {
              title: 'Exact pixel control',
              description:
                'Type precise width and height values in pixels to meet any dimension requirement, from social media avatars to print layouts.',
            },
            {
              title: 'Aspect ratio lock',
              description:
                'When locked, changing width automatically updates height (and vice versa) to prevent stretched or distorted images.',
            },
            {
              title: 'Quick percentage presets',
              description:
                'Scale an image to 25%, 50%, or 75% of its original size in a single click — no math required.',
            },
            {
              title: 'Private and free',
              description:
                'Resizing runs locally in your browser. No uploads, no watermarks, no registration, and no limits.',
            },
          ]}
          faqs={[
            {
              q: 'How does the aspect ratio lock work?',
              a: 'When the link icon between width and height is active (blue), changing one value automatically calculates the other based on the original proportions. Click the icon to unlock and set width and height independently.',
            },
            {
              q: 'What happens if I unlock the aspect ratio?',
              a: 'You can set width and height to any values independently. This may stretch or squash the image if the new proportions differ from the original, which is useful for specific layout requirements.',
            },
            {
              q: 'Will resizing reduce the file size?',
              a: 'Reducing dimensions usually reduces file size because there are fewer pixels to store. Increasing dimensions will not improve quality — it only makes the file larger.',
            },
            {
              q: 'Are my images uploaded to a server?',
              a: 'No. All resizing happens in your browser using the native Canvas API. Your images never leave your device.',
            },
            {
              q: 'What formats are supported?',
              a: 'JPG and PNG are supported. The output format matches your input. For format conversion, use the Image Converter tool.',
            },
            {
              q: 'Is there a size limit?',
              a: 'There is no set limit, but very large images may be constrained by your browser memory. Images under 50MB resize reliably.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="image-resizer" tools={relatedTools} />
    </>
  );
}
