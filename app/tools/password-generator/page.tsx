import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, KeyRound } from 'lucide-react';

import { PasswordGenerator } from '@/components/security/password-generator';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Password Generator — Create Strong Passwords Online Free | ToolNest',
  description:
    'Generate strong, secure random passwords with custom length, uppercase, lowercase, numbers, and symbols. Live strength indicator — free, no sign-up.',
};

const relatedTools = getRelatedTools('password-generator', 3).filter((t) =>
  ['password-strength-checker', 'username-generator', 'uuid-generator'].includes(t.slug)
);

export default function PasswordGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Password Generator</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-brand-purple/25">
              <KeyRound className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Password Generator</h1>
              <p className="mt-1 text-muted-foreground">Create strong, secure random passwords — free, instant, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PasswordGenerator />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Password Generator creates strong, random passwords that are difficult for attackers to guess or brute-force. ToolNest's Password Generator lets you control the length (4–64 characters) and choose exactly which character types to include: uppercase, lowercase, numbers, and symbols. You can exclude similar-looking characters (like il1Lo0O) to avoid confusion when reading, and exclude ambiguous characters (like {}[]()) for compatibility with systems that reject them. A live strength indicator shows the password's entropy and estimated crack time as you adjust settings. Everything runs in your browser using the Web Crypto API for cryptographically secure randomness."
          howTo={[
            'Use the slider to set your desired password length (4–64 characters).',
            'Toggle uppercase, lowercase, numbers, and symbols on or off.',
            'Optionally enable "Exclude similar" or "Exclude ambiguous" for readability.',
            'The password regenerates automatically as you change options.',
            'Click the copy icon or "Copy" button to copy the password.',
            'Click "Regenerate" to create a new password with the same settings.',
          ]}
          benefits={[
            { title: 'Cryptographically secure', description: 'Uses the Web Crypto API (crypto.getRandomValues) for true randomness — not Math.random, which is predictable.' },
            { title: 'Full character control', description: 'Pick exactly which character types to include and exclude similar or ambiguous characters for readability and compatibility.' },
            { title: 'Live strength indicator', description: 'See the password entropy in bits and estimated crack time instantly as you adjust settings.' },
            { title: '100% private', description: 'Passwords are generated entirely in your browser and never sent to any server.' },
          ]}
          faqs={[
            { q: 'Is it safe to use generated passwords?', a: 'Yes. Passwords are generated locally in your browser using the Web Crypto API, which provides cryptographically secure randomness. The passwords are never transmitted or stored.' },
            { q: 'What length should I choose?', a: 'For most accounts, 16 characters is a good balance of security and usability. For high-value accounts, consider 20+ characters. Longer passwords are exponentially harder to crack.' },
            { q: 'What are similar characters?', a: 'Similar characters look alike and cause confusion: lowercase l, uppercase I, the number 1, uppercase O, and the number 0. Excluding them makes passwords easier to type and read.' },
            { q: 'What are ambiguous characters?', a: 'Ambiguous characters like { } [ ] ( ) / \\ " ` are sometimes rejected by systems that restrict special characters. Excluding them improves compatibility.' },
            { q: 'Can I generate multiple passwords?', a: 'Click "Regenerate" as many times as you need. Each click produces a fresh, random password with your current settings.' },
            { q: 'Do you store my passwords?', a: 'No. Passwords are generated and exist only in your browser. Nothing is sent to a server, stored, or logged.' },
          ]}
        />
      </section>

      <RelatedTools slug="password-generator" tools={relatedTools} />
    </>
  );
}
