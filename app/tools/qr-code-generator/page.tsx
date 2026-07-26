import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, QrCode } from 'lucide-react';

import { QrCodeGenerator } from '@/components/qr-code-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'QR Code Generator — Free Online Tool | ToolNest',
  description:
    'Generate QR codes for URLs, text, email, phone, WhatsApp, WiFi and Google Maps. Customize colors, add a logo, and download as PNG, JPG or SVG. Free, no sign-up.',
  alternates: { canonical: '/tools/qr-code-generator' },
  openGraph: {
    title: 'QR Code Generator — Free Online Tool | ToolNest',
    description:
      'Create custom QR codes for any purpose. Free, fast, and no registration required.',
  },
};

const relatedTools = getRelatedTools('qr-code-generator', 3).filter((t) =>
  ['barcode-generator', 'url-encoder', 'password-generator'].includes(t.slug)
);

export default function QrCodeGeneratorPage() {
  const toolJsonLd = generateToolJsonLd('qr-code-generator');
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: 'QR Code Generator', url: '/tools/qr-code-generator' },
  ]);

  return (
    <>
      {toolJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[120px]" />
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
            <span className="text-foreground">QR Code Generator</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-brand-purple/25">
              <QrCode className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                QR Code Generator
              </h1>
              <p className="mt-1 text-muted-foreground">
                Create custom QR codes for URLs, text, WiFi, contact info and
                more — free, instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <QrCodeGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A QR Code Generator is a free online tool that turns any piece of information — a website link, plain text, email address, phone number, WhatsApp chat, WiFi credentials, or a Google Maps location — into a scannable QR code. Anyone with a phone camera can scan the code to instantly open the encoded content. ToolNest's QR Code Generator runs entirely in your browser, lets you customize colors and add a logo, and exports pixel-perfect PNG, JPG and SVG files — all completely free, with no registration and no watermarks."
          howTo={[
            'Pick a content type at the top — URL, text, email, phone, WhatsApp, WiFi or Maps.',
            'Enter the details for that type (for example, paste a website link for a URL code).',
            'Watch the live preview update instantly on the right as you type.',
            'Customize the QR color, background, transparency, size and quiet zone to match your brand.',
            'Optionally upload a square logo to place in the center of the code.',
            'Click PNG, JPG or SVG to download your finished QR code.',
          ]}
          benefits={[
            {
              title: 'Completely free, no sign-up',
              description:
                'No account, no watermarks, no daily limits. Generate and download as many QR codes as you want.',
            },
            {
              title: 'Works offline in your browser',
              description:
                'The tool runs locally, so your data never leaves your device — perfect for sensitive WiFi passwords or contact info.',
            },
            {
              title: 'Fully customizable',
              description:
                'Match any brand with custom colors, transparent backgrounds, an embedded logo, and sizes up to 1000px.',
            },
            {
              title: 'Print-ready exports',
              description:
                'Download as PNG for screen, JPG for photos, or SVG for crisp printing at any size with zero quality loss.',
            },
          ]}
          faqs={[
            {
              q: 'Are the QR codes free to use commercially?',
              a: 'Yes. Every QR code you generate is 100% free to use for personal and commercial purposes, with no watermarks or attribution required.',
            },
            {
              q: 'Do the QR codes expire?',
              a: 'No. Static QR codes like the ones generated here never expire — they will keep working as long as the content they point to (such as a URL) stays online.',
            },
            {
              q: 'Can I add my logo to the QR code?',
              a: 'Yes. Upload a square image in the customization panel and it will be placed in the center of the code. The error correction level automatically increases to "High" so the code still scans reliably.',
            },
            {
              q: 'What size should I use for printing?',
              a: 'For printing, download the SVG version — it scales to any size without losing quality. As a rule of thumb, a printed QR code should be at least 2×2 cm so phone cameras can scan it easily.',
            },
            {
              q: 'Is my data sent to a server?',
              a: 'No. The QR code is generated entirely in your browser. Nothing you type is uploaded, so it is safe to encode sensitive information like WiFi passwords.',
            },
            {
              q: 'Why is my QR code not scanning?',
              a: 'Make sure there is enough contrast between the QR color and background, the size is large enough, and the quiet zone (margin) is at least 2. If you added a logo, keep it under about 20% of the code area.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="qr-code-generator" tools={relatedTools} />
    </>
  );
}
