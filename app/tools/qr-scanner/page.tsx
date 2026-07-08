import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ScanLine } from 'lucide-react';

import { QrScanner } from '@/components/qr-scanner';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'QR Scanner — Free Online Tool | ToolNest',
  description:
    'Scan QR codes with your device camera or upload an image to decode. Detect, copy and open URLs instantly. Free, no sign-up, runs in your browser.',
  openGraph: {
    title: 'QR Scanner — Free Online Tool | ToolNest',
    description:
      'Scan QR codes with your camera or from an image. Free, fast, and no registration required.',
  },
};

const relatedTools = getRelatedTools('qr-scanner', 3).filter((t) =>
  ['qr-code-generator', 'barcode-generator', 'qr-history'].includes(t.slug)
);

export default function QrScannerPage() {
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
            <span className="text-foreground">QR Scanner</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-lg shadow-brand-purple/25">
              <ScanLine className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                QR Scanner
              </h1>
              <p className="mt-1 text-muted-foreground">
                Scan QR codes with your camera or upload an image to decode —
                free, instant, no sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <QrScanner />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A QR Scanner is a free online tool that reads QR codes using your device camera or from an uploaded image and decodes them into readable text, links, or contact information. ToolNest's QR Scanner runs entirely in your browser — the camera feed and image processing never leave your device. When a code is detected, the decoded content appears instantly with a button to copy it or open website links directly. Every scan is automatically saved to your local QR History so you can revisit it later."
          howTo={[
            'Click "Start camera" and allow browser access when prompted.',
            'Point your camera at a QR code — detection happens automatically and live.',
            'Alternatively, click "Choose image" to upload a photo or screenshot of a QR code.',
            'The decoded result appears on the right, showing the content type (URL, text, WiFi, etc.).',
            'Use "Copy" to copy the result, or "Open URL" if the QR code links to a website.',
            'Click "Clear" to reset and scan another code. Scans are saved to QR History automatically.',
          ]}
          benefits={[
            {
              title: 'Two ways to scan',
              description:
                'Use your live camera for real-time scanning, or upload an existing image or screenshot to decode a QR code after the fact.',
            },
            {
              title: '100% private',
              description:
                'All decoding happens locally in your browser. Your camera feed and uploaded images are never sent to a server.',
            },
            {
              title: 'Smart result detection',
              description:
                'The scanner recognizes URLs, email, phone, WhatsApp, WiFi and Maps codes, and shows a one-click "Open URL" button for links.',
            },
            {
              title: 'Automatic history',
              description:
                'Every scan is saved to your local QR History so you can reopen, copy, or delete past results at any time.',
            },
          ]}
          faqs={[
            {
              q: 'Does the QR Scanner work on mobile?',
              a: 'Yes. On phones the scanner uses the rear camera by default for easy scanning. On desktop it uses your webcam if one is available.',
            },
            {
              q: 'Why is my camera not working?',
              a: 'Browsers require camera permission. If you denied it, click the camera icon in your browser address bar, allow access, and reload the page. The scanner also needs an HTTPS connection, which ToolNest provides.',
            },
            {
              q: 'Can I scan a QR code from a screenshot?',
              a: 'Yes. Click "Choose image" and upload a screenshot or photo containing a QR code. The tool decodes it locally and shows the result.',
            },
            {
              q: 'What types of QR codes can it read?',
              a: 'All standard QR codes are supported, including URLs, plain text, email (mailto), phone (tel), WhatsApp (wa.me), WiFi credentials and Google Maps links.',
            },
            {
              q: 'Where are my scans stored?',
              a: 'Scans are saved to your browser local storage under the QR History page. They stay on your device and are never uploaded to any server.',
            },
            {
              q: 'Is there a limit to how many QR codes I can scan?',
              a: 'No. You can scan as many QR codes as you like. History stores the most recent 100 entries to keep local storage manageable.',
            },
          ]}
        />
      </section>

      <RelatedTools slug="qr-scanner" tools={relatedTools} />
    </>
  );
}
