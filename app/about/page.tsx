import { Wrench } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { tools } from '@/lib/data';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Free tools for everyone, forever"
        description={`ToolNest exists to put ${tools.length} useful online tools in one clean, fast, secure place — with no paywalls and no registration.`}
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl glass-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
            <Wrench className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            Full story coming soon
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We are putting the finishing touches on our mission, team, and
            principles. Check back shortly.
          </p>
        </div>
      </section>
    </>
  );
}
