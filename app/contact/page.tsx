import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';

export const metadata = {
  title: 'Contact ToolNest',
  description:
    'Get in touch with the ToolNest team to request a new tool, report a bug, or share feedback. We read every message and build what our users ask for.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk"
        description="Have a tool to request, a bug to report, or feedback to share? We would love to hear from you."
      />
      <section className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
        <ContactForm />
      </section>
    </>
  );
}
