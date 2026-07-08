import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

import { PasswordStrengthChecker } from '@/components/security/password-strength-checker';
import { SeoContent } from '@/components/seo-content';
import { RelatedTools } from '@/components/related-tools';
import { getRelatedTools } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Password Strength Checker — Test Your Password | ToolNest',
  description:
    'Check password strength, estimate crack time, and get suggestions to improve your password. Runs in your browser — free, no sign-up.',
};

const relatedTools = getRelatedTools('password-strength-checker', 3).filter((t) =>
  ['password-generator', 'username-generator', 'uuid-generator'].includes(t.slug)
);

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[280px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Password Strength Checker</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-brand-purple/25">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Password Strength Checker</h1>
              <p className="mt-1 text-muted-foreground">Analyze your password strength and get improvement tips — free, private, no sign-up.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <PasswordStrengthChecker />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SeoContent
          whatIs="A Password Strength Checker evaluates how secure a password is by analyzing its length, character variety, and entropy — a measure of unpredictability. ToolNest's Password Strength Checker shows a live strength meter, estimates how long it would take an attacker to crack the password, lists which security requirements are met, and provides specific suggestions to improve weak passwords. The analysis runs entirely in your browser — your password is never transmitted, stored, or logged."
          howTo={[
            'Type or paste your password into the input field.',
            'Toggle the eye icon to show or hide the password text.',
            'The strength meter, crack time, and requirements update live as you type.',
            'Review the suggestions panel for specific ways to improve your password.',
            'Use the Password Generator to create a stronger password if needed.',
          ]}
          benefits={[
            { title: 'Live analysis', description: 'The strength meter, entropy, crack time, and requirements update instantly with every character you type.' },
            { title: 'Crack time estimation', description: 'See how long it would take an attacker to brute-force your password, from instant to centuries.' },
            { title: 'Actionable suggestions', description: 'Get specific, prioritized tips like "add symbols" or "use at least 12 characters" to strengthen weak passwords.' },
            { title: '100% private', description: 'Your password never leaves your browser. All analysis happens locally — nothing is sent to a server.' },
          ]}
          faqs={[
            { q: 'Is it safe to type my real password?', a: 'Yes. The analysis runs entirely in your browser. Your password is never transmitted, stored, or logged. You can also use the eye icon to hide it while typing.' },
            { q: 'How is crack time calculated?', a: 'The tool calculates entropy based on password length and character pool size, then estimates how long it would take to brute-force at 10 billion guesses per second — a realistic rate for modern hardware.' },
            { q: 'What makes a password strong?', a: 'Length is the most important factor. A 16-character password with uppercase, lowercase, numbers, and symbols has over 100 bits of entropy, which would take centuries to crack.' },
            { q: 'What does entropy mean?', a: 'Entropy measures the unpredictability of a password in bits. Higher entropy means more possible combinations and longer crack times. 60+ bits is considered strong.' },
            { q: 'Can I check multiple passwords?', a: 'Yes — just type a new password and the analysis updates instantly. Previous passwords are not stored anywhere.' },
            { q: 'Why does my password show as weak?', a: 'Common reasons include short length, missing character types (like no symbols), repeated characters, or common dictionary words. The suggestions panel tells you exactly what to fix.' },
          ]}
        />
      </section>

      <RelatedTools slug="password-strength-checker" tools={relatedTools} />
    </>
  );
}
