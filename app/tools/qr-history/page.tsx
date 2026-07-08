import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, History as HistoryIcon } from 'lucide-react';

import { QrHistoryView } from '@/components/qr-history';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'QR History — Saved QR Codes | ToolNest',
  description:
    'View, reopen, download and delete every QR code you generated or scanned with ToolNest. Stored locally in your browser — free and private.',
};

const relatedTools = getRelatedTools('qr-history', 3).filter((t) =>
  ['qr-code-generator', 'qr-scanner', 'barcode-generator'].includes(t.slug)
);

export default function QrHistoryPage() {
  return (
    <>
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
            <span className="text-foreground">QR History</span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 text-white shadow-lg shadow-brand-purple/25">
              <HistoryIcon className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                QR History
              </h1>
              <p className="mt-1 text-muted-foreground">
                Every QR code you generate or scan — saved locally in your
                browser, ready to reopen or download.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <QrHistoryView />
      </section>

      <RelatedTools slug="qr-history" tools={relatedTools} />
    </>
  );
}
