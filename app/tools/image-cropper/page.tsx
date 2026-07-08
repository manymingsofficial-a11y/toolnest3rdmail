import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Crop } from 'lucide-react';

import { ImageCropper } from '@/components/image/image-cropper';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Image Cropper — Crop Images Online Free | ToolNest',
  description:
    'Crop images into free, square, 16:9, 4:3 or circle shapes. Drag to adjust the crop area, preview, and download — free, in your browser, no sign-up.',
  openGraph: {
    title: 'Image Cropper — Crop Images Online Free | ToolNest',
    description:
      'Crop images into square, 16:9, 4:3 or circle shapes. Free, fast, and no registration.',
  },
};

const relatedTools = getRelatedTools('image-cropper', 3).filter((t) =>
  ['image-resizer', 'image-compressor', 'image-converter'].includes(t.slug)
);

export default function ImageCropperPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px]" />
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
            <span className="text-foreground">Image Cropper</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-brand-purple/25">
              <Crop className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Image Cropper
              </h1>
              <p className="mt-1 text-muted-foreground">
                Crop images into square, 16:9, 4:3 or circle shapes — free,
                instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ImageCropper />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="An Image Cropper lets you cut out a specific region of an image and discard the rest — useful for removing unwanted edges, fitting a photo to a social media size, or creating a circular profile picture. ToolNest's Image Cropper provides five crop shapes: Free for any proportions, Square (1:1) for profile pictures and thumbnails, 16:9 for widescreen banners and YouTube covers, 4:3 for classic photo formats, and Circle for round avatars. You drag to position the crop area, see a live preview, and download the result. Everything runs in your browser using the open-source react-image-crop library and the native Canvas API — your images are never uploaded."
          howTo={[
            'Drag an image onto the upload area or click to browse.',
            'Choose a crop shape: Free, Square, 16:9, 4:3, or Circle.',
            'Drag the crop handles to adjust the area you want to keep.',
            'Click "Apply Crop" — the progress bar shows the process.',
            'Preview the cropped result (circle crops show as a round preview).',
            'Click "Download" to save the cropped image.',
          ]}
          benefits={[
            {
              title: 'Five crop shapes',
              description:
                'Free, Square (1:1), 16:9, 4:3, and Circle — cover profile pictures, banners, thumbnails, and round avatars from one tool.',
            },
            {
              title: 'Interactive drag handles',
              description:
                'Move and resize the crop area by dragging its handles. The crop updates live as you adjust, so you see exactly what you will get.',
            },
            {
              title: 'True circle output',
              description:
                'The Circle option produces a genuine round PNG with transparent corners — not just a round preview over a square image.',
            },
            {
              title: 'Private and free',
              description:
                'Cropping runs locally in your browser. No uploads, no watermarks, no registration, and no limits.',
            },
          ]}
          faqs={[
            {
              q: 'How do I crop a circle image?',
              a: 'Click the "Circle" button, then drag the crop area. The tool creates a square selection that is clipped into a true circle on download, with transparent corners saved as a PNG.',
            },
            {
              q: 'Can I crop to a custom size?',
              a: 'Yes. Select the "Free" shape to drag the crop area to any proportions you want, with no fixed aspect ratio.',
            },
            {
              q: 'What format is the cropped image?',
              a: 'Cropped images are saved as JPG for photos and PNG when transparency is needed (circle crops are always PNG to preserve the transparent corners).',
            },
            {
              q: 'Are my images uploaded to a server?',
              a: 'No. All cropping happens in your browser using the open-source react-image-crop library and the native Canvas API. Your images never leave your device.',
            },
            {
              q: 'Can I crop and resize at the same time?',
              a: 'This tool focuses on cropping. To change the pixel dimensions after cropping, use the Image Resizer tool — it keeps your aspect ratio locked.',
            },
            {
              q: 'Does cropping reduce file size?',
              a: 'Yes, usually. Removing pixels reduces the amount of data in the image, so the cropped file is typically smaller than the original.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="image-cropper" tools={relatedTools} />
    </>
  );
}
