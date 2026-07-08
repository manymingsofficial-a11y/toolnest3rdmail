import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Regex } from 'lucide-react';

import { RegexTester } from '@/components/dev/hashes';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Regex Tester — Test Regular Expressions Online Free | ToolNest',
  description:
    'Test regular expressions against your text in real time. See matches, highlights, and capture groups instantly — free, no sign-up.',
};

const relatedTools = getRelatedTools('regex-tester', 3).filter((t) =>
  ['sha256-hash-generator', 'md5-hash-generator', 'json-formatter'].includes(t.slug)
);

export default function RegexTesterPage() {
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
            <span className="text-foreground">Regex Tester</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg shadow-brand-purple/25">
              <Regex className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Regex Tester</h1>
              <p className="mt-1 text-muted-foreground">Test regular expressions and see matches in real time — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <RegexTester />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Regex Tester lets you write a regular expression and immediately see which parts of a sample text it matches, with each match highlighted and any capture groups broken out. Regular expressions are a compact pattern language used for searching, validating, and extracting text — everything from email validation to log parsing. ToolNest's Regex Tester runs your pattern against your text as you type, supports standard flags like global, case-insensitive, and multiline, and shows you exactly what matched and where. Everything runs locally in your browser."
          howTo={[
            'Enter your regular expression in the pattern field.',
            'Toggle flags like global (g), case-insensitive (i), or multiline (m) as needed.',
            'Paste or type the text you want to test against in the test area.',
            'Matches are highlighted in real time as you edit the pattern or text.',
            'Inspect capture groups to see what each part of your pattern captured.',
            'Refine your pattern until it matches exactly what you want.',
          ]}
          benefits={[
            { title: 'Real-time feedback', description: 'Matches update instantly as you type your pattern or edit your test text, so you can iterate quickly without running a script.' },
            { title: 'Visual highlighting', description: 'Every match is highlighted in place, making it obvious which parts of your text the pattern is selecting.' },
            { title: 'Capture group inspection', description: 'See the value of each capture group separately, so you can verify that your grouping and backreferences work as intended.' },
            { title: '100% private', description: 'All pattern matching runs in your browser. Your text and regular expressions are never sent to a server.' },
          ]}
          faqs={[
            { q: 'Which regex flavor does this tester use?', a: "It uses JavaScript's built-in RegExp engine, which follows the ECMAScript specification. Most common syntax is supported, though some advanced features found in PCRE (like lookbehind) have limited support depending on your browser version." },
            { q: 'What do the flags g, i, and m do?', a: 'The g (global) flag finds all matches instead of stopping at the first. The i (case-insensitive) flag ignores letter case. The m (multiline) flag makes ^ and $ match the start and end of each line, not just the whole string.' },
            { q: 'How do I test for a whole word only?', a: 'Use word boundaries: \\bword\\b. The \\b anchor matches the position between a word character and a non-word character, so "cat" will not match inside "category".' },
            { q: 'Why is my pattern matching more than I expect?', a: 'Regular expressions are greedy by default — quantifiers like * and + match as much as possible. Add a ? after a quantifier to make it lazy, or use specific character classes instead of broad wildcards.' },
            { q: 'Can I use this to validate emails or phone numbers?', a: 'Yes. You can write or paste a pattern and test it against sample inputs. For email, a simple pattern like ^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$ catches most cases; a fully RFC-compliant email regex is far more complex.' },
            { q: 'Is my text sent to a server?', a: 'No. All regex matching happens locally in your browser using the native RegExp engine. Your text and patterns are never transmitted or stored.' },
          ]}
        />
      </section>

      <RelatedTools slug="regex-tester" tools={relatedTools} />
    </>
  );
}
