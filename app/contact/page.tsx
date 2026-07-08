import { Mail } from 'lucide-react';

import { PageHeader } from '@/components/page-header';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let’s talk"
        description="Have a tool to request, a bug to report, or a partnership in mind? We would love to hear from you."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl glass-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            Contact form coming soon
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            A full contact form and tool-request flow are on the way. Until
            then, reach us through the newsletter signup in the footer.
          </p>
        </div>
      </section>
    </>
  );
}
