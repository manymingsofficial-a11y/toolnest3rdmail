import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Fingerprint } from 'lucide-react';

import { UuidGenerator } from '@/components/security/uuid-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'UUID Generator — Generate UUID v4 Online Free | ToolNest',
  description:
    'Generate random UUID v4 identifiers in bulk. Copy individual UUIDs or download as TXT — free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('uuid-generator', 3).filter((t) =>
  ['password-generator', 'username-generator', 'password-strength-checker'].includes(t.slug)
);

export default function UuidGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">UUID Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-lg shadow-brand-purple/25">
              <Fingerprint className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">UUID Generator</h1>
              <p className="mt-1 text-muted-foreground">Generate random UUID v4 identifiers in bulk — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <UuidGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. UUID v4 is the most common version — it uses random numbers for all 122 of its variable bits, making collisions virtually impossible. ToolNest's UUID Generator uses your browser's native crypto.randomUUID() API (with a secure fallback) to generate genuine UUID v4 strings. You can generate up to 50 at once, copy them individually, toggle uppercase formatting, and download the full list as a TXT file."
          howTo={[
            'Choose how many UUIDs to generate (1, 5, 10, 25, or 50).',
            'Toggle uppercase formatting if you need uppercase UUIDs.',
            'UUIDs generate automatically — click "Generate" for a fresh batch.',
            'Click the copy icon next to any UUID to copy it.',
            'Click "Download TXT" to save all UUIDs to a text file.',
          ]}
          benefits={[
            { title: 'Genuine UUID v4', description: 'Uses the native crypto.randomUUID() API for standards-compliant, cryptographically secure random UUIDs.' },
            { title: 'Generate in bulk', description: 'Produce up to 50 UUIDs at once with a single click — perfect for database seeding, testing, or batch operations.' },
            { title: 'Copy or download', description: 'Copy individual UUIDs to your clipboard or download the entire batch as a TXT file for offline use.' },
            { title: 'Uppercase option', description: 'Toggle between standard lowercase and uppercase UUID formatting to match your system requirements.' },
          ]}
          faqs={[
            { q: 'What is a UUID v4?', a: 'UUID v4 is a version of the Universally Unique Identifier standard where all variable bits (122 of 128) are randomly generated. This makes collisions astronomically unlikely — even generating billions of UUIDs.' },
            { q: 'Are these UUIDs truly random?', a: 'Yes. The tool uses the browser\'s native crypto.randomUUID() API, which provides cryptographically secure randomness. A secure fallback using crypto.getRandomValues is used if the native API is unavailable.' },
            { q: 'Can I get duplicate UUIDs?', a: 'The probability of a duplicate UUID v4 is negligible — approximately 1 in 2.71 quintillion for 100 trillion generated UUIDs. In practice, you will never see a collision.' },
            { q: 'What format are the UUIDs in?', a: 'Standard UUID format: 8-4-4-4-12 hexadecimal digits, like "550e8400-e29b-41d4-a716-446655440000". Toggle uppercase for uppercase hex letters.' },
            { q: 'Can I download the UUIDs?', a: 'Yes. Click "Download TXT" to save all generated UUIDs to a plain text file, one per line.' },
            { q: 'What are UUIDs used for?', a: 'UUIDs are used as database primary keys, API identifiers, session tokens, test data, file names, and anywhere a unique identifier is needed without central coordination.' },
          ]}
        />
      </section>

      <RelatedTools slug="uuid-generator" tools={relatedTools} />
    </>
  );
}
