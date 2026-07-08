import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Link2 } from 'lucide-react';

import { UrlEncoderTool } from '@/components/dev/json-encoder';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder — Percent-Encoding Online Free | ToolNest',
  description:
    'Encode URLs with percent-encoding or decode them back to plain text. Handles special characters and UTF-8 — free, no sign-up.',
};

const relatedTools = getRelatedTools('url-encoder', 3).filter((t) =>
  ['base64-encoder', 'json-formatter', 'json-validator'].includes(t.slug)
);

export default function UrlEncoderPage() {
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
            <span className="text-foreground">URL Encoder</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-600 text-white shadow-lg shadow-brand-purple/25">
              <Link2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">URL Encoder & Decoder</h1>
              <p className="mt-1 text-muted-foreground">Percent-encode URLs and decode them back — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <UrlEncoderTool />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="URL encoding (also called percent-encoding) converts characters that are not allowed in a URL — such as spaces, ampersands, and non-ASCII text — into a safe format using a percent sign followed by two hex digits. For example, a space becomes %20. ToolNest URL Encoder & Decoder lets you convert plain text to a properly encoded URL and decode an encoded URL back to readable text, with full UTF-8 support for international characters and emoji. Everything runs locally in your browser."
          howTo={[
            'Pick whether you want to encode or decode using the mode toggle.',
            'Paste your URL or text into the input field.',
            'The converted result appears automatically in the output area.',
            'Switch modes any time to reverse the operation.',
            'Check the result to make sure special characters were handled correctly.',
            'Click "Copy" to copy the encoded or decoded output.',
          ]}
          benefits={[
            { title: 'Safe for query strings', description: "Correctly encodes spaces, ampersands, equals signs, and other reserved characters so they do not break URL structure or query parameters." },
            { title: 'Full UTF-8 support', description: 'International characters and emoji are encoded as their correct percent-escaped UTF-8 byte sequences, not mangled by legacy charsets.' },
            { title: 'Instant bidirectional conversion', description: 'Toggle between encoding and decoding in one click, with live output that updates as you type — no submit button needed.' },
            { title: '100% private', description: 'All encoding and decoding happens in your browser using native functions. Your URLs are never sent to a server or stored.' },
          ]}
          faqs={[
            { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURIComponent encodes every reserved character including /, ?, and &, making it ideal for individual query parameter values. encodeURI leaves URL-structural characters intact so the overall URL stays navigable. This tool uses encodeURIComponent for safe parameter encoding.' },
            { q: 'Why do spaces become %20 instead of +?', a: '%20 is the percent-encoded form of a space and is valid anywhere in a URL. The + form is a legacy convention from application/x-www-form-urlencoded data and is only safe in query strings. Percent-encoding is the more universally correct choice.' },
            { q: 'Can I decode a full URL with query parameters?', a: 'Yes. Paste the entire URL and the decoder will convert all percent-encoded sequences back to their original characters, including those inside query parameter values.' },
            { q: 'Does it handle non-English characters?', a: 'Yes. Characters outside ASCII — including accented letters, CJK characters, and emoji — are encoded as their UTF-8 byte sequences, each byte prefixed with %.' },
            { q: 'Is URL encoding the same as Base64?', a: 'No. URL encoding replaces reserved and non-ASCII characters with percent sequences so text is safe inside a URL. Base64 encodes arbitrary binary data into 64 ASCII characters for transport or embedding. They solve different problems.' },
            { q: 'Is my data sent anywhere?', a: 'No. All encoding and decoding runs locally in your browser. Your URLs and text are never transmitted to a server or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="url-encoder" tools={relatedTools} />
    </>
  );
}
