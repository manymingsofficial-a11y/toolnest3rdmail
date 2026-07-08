import { Newspaper } from 'lucide-react';

import { PageHeader } from '@/components/page-header';

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights & guides"
        title="The ToolNest blog"
        description="How-to guides, tool reviews, and productivity tips for getting the most out of free online tools."
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="rounded-2xl glass-card p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
            <Newspaper className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            Articles coming soon
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Our editorial team is working on the first batch of guides and
            reviews. Subscribe to the newsletter to be notified when we publish.
          </p>
        </div>
      </section>
    </>
  );
}
