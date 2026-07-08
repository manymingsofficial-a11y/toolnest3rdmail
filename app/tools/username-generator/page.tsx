import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, UserPlus } from 'lucide-react';

import { UsernameGenerator } from '@/components/security/username-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Username Generator — Create Random Usernames Free | ToolNest',
  description:
    'Generate unique random usernames with custom prefixes, suffixes, and numbers. Copy and use anywhere — free, in your browser, no sign-up.',
};

const relatedTools = getRelatedTools('username-generator', 3).filter((t) =>
  ['password-generator', 'password-strength-checker', 'uuid-generator'].includes(t.slug)
);

export default function UsernameGeneratorPage() {
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
            <span className="text-foreground">Username Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-lg shadow-brand-purple/25">
              <UserPlus className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Username Generator</h1>
              <p className="mt-1 text-muted-foreground">Generate unique random usernames with prefixes and suffixes — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <UsernameGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Username Generator creates unique, random usernames by combining adjectives and nouns with optional prefixes, suffixes, and numbers. ToolNest's Username Generator uses cryptographically secure randomness to produce memorable yet unpredictable usernames — perfect for gaming accounts, social media, forums, or any platform where you need a distinctive identity. You can generate up to 20 usernames at once and copy any with a single click."
          howTo={[
            'Enter an optional prefix (e.g. "mr_") or suffix (e.g. "_99").',
            'Toggle "Add random numbers" on or off.',
            'Choose how many usernames to generate (1, 5, 10, or 20).',
            'Click "Generate" to create a fresh batch of usernames.',
            'Click the copy icon next to any username to copy it.',
          ]}
          benefits={[
            { title: 'Memorable combinations', description: 'Usernames combine adjectives and nouns (like SwiftTiger or BraveFalcon) for names that are both unique and easy to remember.' },
            { title: 'Custom prefixes and suffixes', description: 'Add a brand, theme, or number pattern with prefix and suffix fields to match any naming convention.' },
            { title: 'Generate in bulk', description: 'Produce up to 20 usernames at once and copy your favourite — no need to click generate repeatedly.' },
            { title: 'Cryptographically secure', description: 'Uses the Web Crypto API for randomness, so usernames are unpredictable and not repeated between sessions.' },
          ]}
          faqs={[
            { q: 'Are the usernames unique?', a: 'Each username is generated randomly from a pool of adjectives and nouns, with optional numbers. The generator ensures no duplicates within a single batch. The chance of collision across sessions is negligible.' },
            { q: 'Can I use these usernames on any platform?', a: 'Yes. The generated usernames use only letters and numbers (plus your custom prefix/suffix), making them compatible with virtually any platform.' },
            { q: 'What is a prefix and suffix?', a: 'A prefix is added before the generated name (e.g. "mr_SwiftTiger") and a suffix after (e.g. "SwiftTiger_99"). Use them to match a theme, brand, or naming convention.' },
            { q: 'Why add random numbers?', a: 'Numbers make usernames harder to guess and more likely to be available on platforms where common names are already taken.' },
            { q: 'Can I generate more than 20 at once?', a: 'The tool supports batches of 1, 5, 10, and 20. For more, simply click "Generate" again to produce a fresh set.' },
            { q: 'Are generated usernames stored?', a: 'No. Usernames are generated in your browser and exist only for your current session. Nothing is stored or sent to a server.' },
          ]}
        />
      </section>

      <RelatedTools slug="username-generator" tools={relatedTools} />
    </>
  );
}
