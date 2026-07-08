import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Binary } from 'lucide-react';

import { Base64Tool } from '@/components/dev/json-encoder';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder — Convert Text Online Free | ToolNest',
  description:
    'Encode text to Base64 or decode Base64 back to text. Supports UTF-8, instant conversion, and copy — free, no sign-up.',
};

const relatedTools = getRelatedTools('base64-encoder', 3).filter((t) =>
  ['url-encoder', 'json-formatter', 'json-validator'].includes(t.slug)
);

export default function Base64EncoderPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Base64 Encoder</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg shadow-brand-purple/25">
              <Binary className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Base64 Encoder & Decoder</h1>
              <p className="mt-1 text-muted-foreground">Encode text to Base64 and decode it back — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Base64Tool />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="Base64 is an encoding scheme that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, +, and /). It is commonly used to embed images in HTML/CSS, transmit binary data over text-only channels like email or JSON, and store data in data URLs. ToolNest's Base64 Encoder & Decoder converts text to Base64 and back again with proper UTF-8 handling, so emoji and international characters round-trip correctly. Everything runs locally in your browser."
          howTo={[
            'Choose whether you want to encode or decode using the mode toggle.',
            'Paste your text (to encode) or Base64 string (to decode) into the input.',
            'The converted result appears automatically in the output area.',
            'Switch modes any time to reverse the operation.',
            'Review the result for correctness.',
            'Click "Copy" to copy the output to your clipboard.',
          ]}
          benefits={[
            { title: 'Bidirectional conversion', description: 'Encode plain text to Base64 and decode Base64 back to text with a single mode toggle — no need for two separate tools.' },
            { title: 'Full UTF-8 support', description: 'Emoji, accented letters, and CJK characters encode and decode correctly because the tool handles UTF-8 byte sequences properly.' },
            { title: 'Instant results', description: 'Conversion happens as you type, so there is no button to click and no waiting — the output updates live.' },
            { title: '100% private', description: 'All encoding and decoding happens in your browser. Your text and Base64 strings are never sent to a server.' },
          ]}
          faqs={[
            { q: 'Is Base64 encryption?', a: 'No. Base64 is an encoding, not encryption. It is trivially reversible by anyone with the encoded string. Never use Base64 to protect sensitive data — use proper encryption instead.' },
            { q: 'Why does my decoded text look garbled?', a: 'This usually means the original text was not UTF-8 or the Base64 string was truncated. ToolNest uses UTF-8 decoding, which handles most modern text including emoji correctly.' },
            { q: 'Can I encode images or files?', a: 'This tool handles text only. To Base64-encode a binary file, you would read its bytes and encode them — but that is a separate workflow not covered here.' },
            { q: 'Why are there = signs at the end?', a: 'Base64 output is padded with one or two = characters so the total length is a multiple of 4. This padding is required by the spec and must be present for correct decoding.' },
            { q: 'Does Base64 change the data size?', a: 'Yes. Encoded output is roughly 33% larger than the original binary input because every 3 bytes become 4 Base64 characters. This overhead is expected.' },
            { q: 'Is my data sent to a server?', a: 'No. All encoding and decoding runs locally in your browser using native JavaScript functions. Nothing is transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="base64-encoder" tools={relatedTools} />
    </>
  );
}
