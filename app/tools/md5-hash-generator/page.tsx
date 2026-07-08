import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Key } from 'lucide-react';

import { Md5HashGenerator } from '@/components/dev/hashes';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'MD5 Hash Generator — Compute MD5 Online Free | ToolNest',
  description:
    'Generate MD5 hashes from text instantly. Useful for checksums and legacy systems — free, no sign-up, runs in your browser.',
};

const relatedTools = getRelatedTools('md5-hash-generator', 3).filter((t) =>
  ['sha256-hash-generator', 'regex-tester', 'base64-encoder'].includes(t.slug)
);

export default function Md5HashGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-rose-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">MD5 Hash Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 text-white shadow-lg shadow-brand-purple/25">
              <Key className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">MD5 Hash Generator</h1>
              <p className="mt-1 text-muted-foreground">Compute MD5 hashes for checksums and legacy systems — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Md5HashGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="MD5 (Message Digest 5) is a widely known hash function that produces a fixed 128-bit (32-character hexadecimal) digest from any input. Like other cryptographic hashes, it is one-way and deterministic: the same input always yields the same digest, and a small input change produces a very different output. MD5 is fast and still common for non-security checksums, file integrity checks, and legacy systems. However, MD5 is considered cryptographically broken — collisions can be found efficiently — so it must not be used for security-sensitive purposes like password storage or digital signatures. ToolNest's generator runs entirely in your browser."
          howTo={[
            'Type or paste the text you want to hash into the input field.',
            'The MD5 hash is computed automatically as you type.',
            'The 32-character hexadecimal digest appears in the output area.',
            'Click "Copy" to copy the hash to your clipboard.',
            'Use it for checksums, file verification, or legacy compatibility.',
            'Do not use MD5 for password storage or security — use SHA-256 or bcrypt instead.',
          ]}
          benefits={[
            { title: 'Instant checksums', description: 'Generate a 32-character fingerprint for any text in milliseconds, ideal for quick file-integrity and duplicate-detection tasks.' },
            { title: 'Legacy compatibility', description: 'Many older systems and APIs still expect MD5 hashes. This tool lets you produce them without installing command-line utilities.' },
            { title: 'Deterministic output', description: 'The same input always produces the identical digest, so you can compare hashes to confirm two inputs match exactly.' },
            { title: '100% private', description: 'Hashing runs entirely in your browser. Your text is never sent to a server or stored.' },
          ]}
          faqs={[
            { q: 'Is MD5 secure?', a: 'No. MD5 is considered cryptographically broken — researchers can find collisions (two different inputs with the same hash) efficiently. Do not use MD5 for password storage, digital signatures, or any security-sensitive purpose. Use SHA-256 or stronger instead.' },
            { q: 'What is MD5 still good for?', a: 'MD5 remains useful for non-security checksums: detecting accidental file corruption, deduplicating files, and interfacing with legacy systems that require it.' },
            { q: 'What is the output length?', a: 'MD5 always produces a 128-bit digest, represented as 32 hexadecimal characters (each hex digit encodes 4 bits).' },
            { q: 'Can I recover the original text from an MD5 hash?', a: 'No. MD5 is a one-way function. While rainbow tables and brute-force can sometimes crack weak inputs, there is no mathematical reversal. Use a strong, unique input if you need unpredictability.' },
            { q: 'MD5 vs SHA-256 — which should I use?', a: 'Use SHA-256 (or stronger) for any security-sensitive use. Use MD5 only for legacy compatibility or non-security checksums where collision resistance is not required.' },
            { q: 'Is my input sent to a server?', a: 'No. All hashing happens locally in your browser. Your text is never transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="md5-hash-generator" tools={relatedTools} />
    </>
  );
}
