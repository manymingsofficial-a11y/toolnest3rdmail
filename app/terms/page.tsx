import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the ToolNest terms of service — the rules and conditions for using our free online tools.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — ToolNest',
    description: 'The rules and conditions for using ToolNest free online tools.',
    type: 'website',
    url: `${SITE_URL}/terms`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — ToolNest',
    description: 'The rules and conditions for using ToolNest free online tools.',
    creator: '@toolnest',
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: September 4, 2026 — the rules and conditions for using ToolNest."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="space-y-8">
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">1. Acceptance of Terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              By accessing or using ToolNest, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use the site.
            </p>
          </div>
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">2. Use of Tools</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              ToolNest provides free online tools for personal and commercial use. You agree
              not to misuse the tools, attempt to reverse-engineer them, or use them for any
              unlawful purpose. Most tools process data entirely in your browser; no files
              are uploaded to our servers unless explicitly stated.
            </p>
          </div>
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">3. No Warranty</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              ToolNest is provided &quot;as is&quot; without warranties of any kind, express or
              implied. We do not guarantee that the tools will be error-free, uninterrupted, or
              produce accurate results. You use the tools at your own risk.
            </p>
          </div>
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">4. Limitation of Liability</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              ToolNest shall not be liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the site or its tools.
            </p>
          </div>
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">5. Changes to These Terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We may update these Terms of Service from time to time. Continued use of the
              site after changes constitutes acceptance of the revised terms.
            </p>
          </div>
          <div className="rounded-2xl glass-card p-8">
            <h2 className="text-xl font-semibold tracking-tight">6. Contact Us</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If you have questions or concerns about these Terms of Service, please reach out
              through our{' '}
              <a
                href="/contact"
                className="text-brand-purple underline underline-offset-2 hover:opacity-80"
              >
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
