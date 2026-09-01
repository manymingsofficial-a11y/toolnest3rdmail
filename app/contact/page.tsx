import { Mail } from 'lucide-react';

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
      <section className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
        <div className="space-y-6">
          {contactEmail && (
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>Prefer email?</span>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 font-medium text-brand-purple transition-opacity hover:opacity-80"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </div>
          )}

          {!contactEmail && (
            <p className="text-center text-sm text-muted-foreground">
              A direct contact email is not configured yet. Until it is, you
              can reach us through the newsletter signup in the footer.
            </p>
          )}

          <ContactForm />
        </div>
      </section>
    </>
  );
}
