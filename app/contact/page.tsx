import { Mail, MessageSquare, Lightbulb, Bug } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { fetchSiteSettings } from '@/lib/public-data';

export const metadata = {
  title: 'Contact ToolNest',
  description:
    'Get in touch with the ToolNest team to request a new tool, report a bug, or share feedback. We read every message and build what our users ask for.',
};

export default async function ContactPage() {
  const siteSettings = await fetchSiteSettings();
  const contactEmail = siteSettings?.contactEmail || '';

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk"
        description="Have a tool to request, a bug to report, or feedback to share? We would love to hear from you."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="space-y-8">
          {contactEmail && (
            <div className="rounded-2xl glass-card p-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
                <Mail className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Email us
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Send us a message and we will get back to you as soon as
                possible.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl glass-card p-6 text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand/10 text-brand-purple">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                Request a tool
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Need a tool we do not have yet? Tell us what you need and we will
                consider building it.
              </p>
            </div>
            <div className="rounded-2xl glass-card p-6 text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand/10 text-brand-purple">
                <Bug className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                Report a bug
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Found something broken or not working as expected? Let us know
                so we can fix it.
              </p>
            </div>
            <div className="rounded-2xl glass-card p-6 text-center">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand/10 text-brand-purple">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                Share feedback
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ideas for improvement, feature requests, or general thoughts —
                all welcome.
              </p>
            </div>
          </div>

          {!contactEmail && (
            <div className="rounded-2xl glass-card p-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
                <Mail className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                How to reach us
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                A direct contact email is not configured yet. Until it is, you
                can reach us through the newsletter signup in the footer —
                subscribe and reply to any message, and it will get to the
                team. We read every response.
              </p>
            </div>
          )}

          <div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
