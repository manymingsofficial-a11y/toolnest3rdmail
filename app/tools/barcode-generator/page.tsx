import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Barcode } from 'lucide-react';

import { BarcodeGenerator } from '@/components/barcode-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Barcode Generator — Free Online Tool | ToolNest',
  description:
    'Generate barcodes in Code128, Code39, EAN-13, EAN-8, UPC-A and UPC-E formats. Customize width, height, colors and download as PNG or SVG. Free, no sign-up.',
  openGraph: {
    title: 'Barcode Generator — Free Online Tool | ToolNest',
    description:
      'Create barcodes for products and labels in six formats. Free, fast, and no registration required.',
  },
};

const relatedTools = getRelatedTools('barcode-generator', 3).filter((t) =>
  ['qr-code-generator', 'url-encoder', 'password-generator'].includes(t.slug)
);

export default function BarcodeGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px]" />
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
            <span className="text-foreground">Barcode Generator</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-brand-purple/25">
              <Barcode className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Barcode Generator
              </h1>
              <p className="mt-1 text-muted-foreground">
                Create barcodes in Code128, Code39, EAN, and UPC formats — free,
                instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <BarcodeGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A barcode is a machine-readable pattern of parallel lines and spaces that encodes a short piece of data — usually a product number, inventory code, or identifier. A Barcode Generator turns that text into a scannable barcode image you can print on packaging, labels, or documents. ToolNest's Barcode Generator supports six industry-standard formats — Code128, Code39, EAN-13, EAN-8, UPC-A and UPC-E — and lets you fine-tune the bar width, height, text size, margin and colors before downloading a print-ready PNG or SVG. Everything runs in your browser, completely free with no registration."
          howTo={[
            'Choose a barcode format. Code128 accepts any text, while EAN and UPC formats require specific digit lengths.',
            'Type or paste the value you want to encode into the text field.',
            'Adjust the bar width, height, font size and margin sliders to fit your label or packaging.',
            'Pick a line color and background color to match your design.',
            'Use the live preview on the right to confirm the barcode looks correct.',
            'Click PNG or SVG to download your finished barcode.',
          ]}
          benefits={[
            {
              title: 'Six formats in one tool',
              description:
                'Switch between Code128, Code39, EAN-13, EAN-8, UPC-A and UPC-E without installing anything or changing tools.',
            },
            {
              title: 'Print-ready output',
              description:
                'Download SVG for crisp printing at any size, or PNG for digital use. No watermarks, no resolution limits.',
            },
            {
              title: 'Runs entirely in your browser',
              description:
                'No servers, no uploads. Your data stays on your device, so it is safe to encode internal product codes.',
            },
            {
              title: 'Completely free',
              description:
                'Generate and download unlimited barcodes with no sign-up, no credits, and no hidden fees.',
            },
          ]}
          faqs={[
            {
              q: 'Which barcode format should I use?',
              a: 'Use Code128 for general text and numbers — it is the most flexible. Use EAN-13 or UPC-A for retail products, EAN-8 for smaller retail items, Code39 for asset tracking, and UPC-E when space is very limited on the package.',
            },
            {
              q: 'Why am I getting an "invalid input" error?',
              a: 'EAN and UPC formats require a specific number of digits and a valid check digit. EAN-13 needs 12 or 13 digits, EAN-8 needs 7 or 8, UPC-A needs 11 or 12, and UPC-E needs 6 or 7. Make sure your input only contains digits for these formats.',
            },
            {
              q: 'Can I use barcodes for commercial products?',
              a: 'Yes. The barcodes you generate are free to use commercially. For retail products sold in stores, register an official GS1 prefix to get globally unique EAN or UPC numbers.',
            },
            {
              q: 'What is the check digit and do I need to add it?',
              a: 'The check digit is the last digit that lets scanners verify a barcode read correctly. JsBarcode calculates it automatically when you provide the digits without it, so you do not need to add it manually.',
            },
            {
              q: 'Is SVG or PNG better for printing?',
              a: 'SVG is better for printing because it scales to any size without losing quality. Use PNG only when the barcode will appear on a screen or you need a fixed pixel size.',
            },
            {
              q: 'Is my data sent to a server?',
              a: 'No. Barcodes are generated entirely in your browser. Nothing you type is uploaded anywhere, so it is safe to encode sensitive or internal product codes.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="barcode-generator" tools={relatedTools} />
    </>
  );
}
