import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Fingerprint } from 'lucide-react';

import { Sha256HashGenerator } from '@/components/dev/hashes';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'SHA-256 Hash Generator — Compute SHA256 Online Free | ToolNest',
  description:
    'Generate SHA-256 hashes from text using the Web Crypto API. Cryptographically secure, instant, and private — free, no sign-up.',
};

const relatedTools = getRelatedTools('sha256-hash-generator', 3).filter((t) =>
  ['md5-hash-generator', 'regex-tester', 'base64-encoder'].includes(t.slug)
);

export default function Sha256HashGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">SHA-256 Hash Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 text-white shadow-lg shadow-brand-purple/25">
              <Fingerprint className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">SHA-256 Hash Generator</h1>
              <p className="mt-1 text-muted-foreground">Compute cryptographically secure SHA-256 hashes — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Sha256HashGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="SHA-256 is a cryptographic hash function from the SHA-2 family that produces a fixed 256-bit (64-character hexadecimal) digest from any input. It is a one-way function: the same input always yields the same hash, but you cannot reverse the hash to recover the input, and even a tiny change to the input produces a completely different digest. SHA-256 is used for data integrity checks, digital signatures, blockchain, and password storage (when combined with a salt). ToolNest's generator uses the browser's Web Crypto API for a native, audited implementation."
          howTo={[
            'Type or paste the text you want to hash into the input field.',
            'The SHA-256 hash is computed automatically as you type.',
            'The 64-character hexadecimal digest appears in the output area.',
            'Verify the hash changes whenever you edit even a single character.',
            'Click "Copy" to copy the hash to your clipboard.',
            'Use the hash for integrity checks, comparison, or storage as needed.',
          ]}
          benefits={[
            { title: 'Cryptographically secure', description: "Uses the browser's native Web Crypto API (crypto.subtle), which provides a vetted, hardware-accelerated SHA-256 implementation — not a hand-rolled algorithm." },
            { title: 'Deterministic output', description: 'The same input always produces the identical 64-character hash, so you can compare hashes to verify that two inputs are exactly the same.' },
            { title: 'Avalanche effect', description: 'A one-character change produces a completely different digest, making it obvious when data has been altered even slightly.' },
            { title: '100% private', description: 'Hashing happens entirely in your browser. Your input text is never sent to a server or stored.' },
          ]}
          faqs={[
            { q: 'Can SHA-256 be reversed to get the original text?', a: 'No. SHA-256 is a one-way function. You can compute a hash from input, but you cannot mathematically derive the input from the hash. This is why it is safe for integrity checks.' },
            { q: 'Is SHA-256 safe for storing passwords?', a: 'On its own, no — it is too fast and vulnerable to brute-force and rainbow-table attacks. For passwords, use a slow key-derivation function like bcrypt, scrypt, or Argon2 with a unique salt per user.' },
            { q: 'What is the output length?', a: 'SHA-256 always produces a 256-bit digest, represented as 64 hexadecimal characters (each hex digit encodes 4 bits).' },
            { q: 'Why does changing one letter change the whole hash?', a: 'This is the avalanche effect, a deliberate property of cryptographic hashes. It ensures that similar inputs produce wildly different outputs, hiding any relationship between them.' },
            { q: 'Is SHA-256 the same as SHA-512?', a: 'No. Both are in the SHA-2 family, but SHA-256 produces a 256-bit digest while SHA-512 produces a 512-bit digest. They use different internal block sizes and word lengths. SHA-256 is the more common choice for general use.' },
            { q: 'Is my input sent to a server?', a: 'No. Hashing is performed locally in your browser using the Web Crypto API. Your text is never transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="sha256-hash-generator" tools={relatedTools} />
    </>
  );
}
