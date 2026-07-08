import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HardDrive } from 'lucide-react';

import { DataStorageConverter } from '@/components/calc/converters';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Data Storage Converter — Convert Bytes, KB, MB, GB, TB Free | ToolNest',
  description:
    'Convert between digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and more. Free online data size converter, no sign-up.',
};

const relatedTools = getRelatedTools('data-storage-converter', 3).filter((t) =>
  ['length-converter', 'weight-converter', 'time-converter'].includes(t.slug)
);

export default function DataStorageConverterPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-teal-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Data Storage Converter</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white shadow-lg shadow-brand-purple/25">
              <HardDrive className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Data Storage Converter</h1>
              <p className="mt-1 text-muted-foreground">Convert between bytes, KB, MB, GB, TB, and more — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <DataStorageConverter />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Data Storage Converter translates digital storage sizes between units — bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. ToolNest's Data Storage Converter supports both decimal (base-1000) and binary (base-1024) conventions, helping you understand exactly how much space a file or drive holds."
          howTo={[
            'Enter the data size value you want to convert.',
            'Select the source unit (bytes, KB, MB, GB, etc.).',
            'Choose the target unit you want to convert to.',
            'The converted storage size appears instantly.',
            'Swap units to compare the same value across different scales.',
          ]}
          benefits={[
            { title: 'All storage units', description: 'Convert between bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes in one place.' },
            { title: 'Decimal and binary support', description: 'Understand the difference between KB (1,000 bytes) and KiB (1,024 bytes) with clear conversions.' },
            { title: 'Instant results', description: 'Values update in real time as you type — no need to press a calculate button.' },
            { title: 'One-click swap', description: 'Reverse the conversion direction instantly to see the same storage size from a different perspective.' },
          ]}
          faqs={[
            { q: 'What is the difference between MB and MiB?', a: 'MB (megabyte) uses the decimal system where 1 MB = 1,000,000 bytes. MiB (mebibyte) uses the binary system where 1 MiB = 1,048,576 bytes (1024²). Storage manufacturers use MB while operating systems often use MiB.' },
            { q: 'How many bytes are in a gigabyte?', a: 'In decimal notation, 1 GB = 1,000,000,000 bytes. In binary notation, 1 GiB = 1,073,741,824 bytes. The converter supports both conventions so you can choose the one that matches your context.' },
            { q: 'Why does my 500 GB drive show less in Windows?', a: 'Drive manufacturers use decimal GB (1 billion bytes), while Windows reports in binary GiB (about 1.07 billion bytes). A 500 GB drive therefore shows as approximately 465 GiB in the operating system — the same actual space, measured differently.' },
            { q: 'How many megabytes are in a terabyte?', a: 'In decimal units, 1 TB = 1,000,000 MB. In binary units, 1 TiB = 1,048,576 MiB. The converter lets you select the convention that applies to your use case.' },
            { q: 'Can I convert bits as well as bytes?', a: 'The converter focuses on byte-based units. To convert between bits and bytes, remember that 1 byte = 8 bits, and apply that factor as needed.' },
            { q: 'What is the largest unit supported?', a: 'The converter supports up to petabytes (PB) and pebibytes (PiB), which equal roughly 1,000 terabytes. This covers current consumer and enterprise storage scales.' },
          ]}
        />
      </section>

      <RelatedTools slug="data-storage-converter" tools={relatedTools} />
    </>
  );
}
