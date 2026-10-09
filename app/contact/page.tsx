import Link from 'next/link';
import { Mail, Bug, Lightbulb, Wrench } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { tools, categories } from '@/lib/data';

export const metadata = {
  title: 'Contact ToolNest',
  description:
    'Get in touch with the ToolNest team to request a new tool, report a bug, or share feedback. We read every message and build what our users ask for.',
  alternates: { canonical: '/contact' },
};

const contactReasons = [
  {
    icon: Wrench,
    title: 'Request a tool',
    description:
      'Need a tool we do not have yet? Tell us what you need and we will build it. Many of our ' + tools.length + ' tools started as user requests.',
  },
  {
    icon: Bug,
    title: 'Report a bug',
    description:
      'If a tool is not working as expected, let us know. Include the tool name, your browser, and what happened so we can reproduce and fix it.',
  },
  {
    icon: Lightbulb,
    title: 'Share feedback',
    description:
      'Suggestions for improving existing tools or the site overall are always welcome. Small ideas often lead to meaningful improvements.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk"
        description="Have a tool to request, a bug to report, or feedback to share? We would love to hear from you."
      />
      <section className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          {contactReasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl glass-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand/10 text-brand-purple">
                <reason.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-tight">{reason.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold tracking-tight">Send us a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form below and we will get back to you. The more detail you provide, the faster we can help.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Good to know</h2>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>All {tools.length} tools across {categories.length} categories are free and require no registration.</li>
            <li>Most tools run entirely in your browser, so your files never leave your device. If a tool seems stuck, try refreshing the page first.</li>
            <li>
              For privacy-related questions, see our{' '}
              <Link href="/privacy-policy" className="text-brand-purple underline underline-offset-2 hover:opacity-80">
                Privacy Policy
              </Link>
              .
            </li>
            <li>
              For usage terms, see our{' '}
              <Link href="/terms" className="text-brand-purple underline underline-offset-2 hover:opacity-80">
                Terms of Service
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
