import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { tools, categories } from '@/lib/data';

const points = [
  {
    title: 'Everything in one place',
    description:
      'Stop hunting across a dozen sites. PDF, image, QR, SEO, text, developer and calculator tools all live under one roof.',
  },
  {
    title: 'No learning curve',
    description:
      'Each tool opens ready to use. No setup, no configuration, no manuals — paste, click, copy, done.',
  },
  {
    title: 'Respects your privacy',
    description:
      'Most tools process data locally in your browser. Nothing is uploaded, tracked, or stored on a server.',
  },
  {
    title: 'Always improving',
    description:
      'New tools are added regularly based on what you actually need — not what looks good on a feature list.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
              <CheckCircle2 className="h-4 w-4" />
              Why ToolNest
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              The fastest way to get work done
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              {tools.length} tools across {categories.length} categories. No
              clutter, no paywalls, no registration — just the tools you need,
              ready when you are.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
              <div className="bg-card/70 p-6 backdrop-blur-xl">
                <dt className="text-3xl font-bold tracking-tight text-gradient">
                  {tools.length}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Free tools
                </dd>
              </div>
              <div className="bg-card/70 p-6 backdrop-blur-xl">
                <dt className="text-3xl font-bold tracking-tight text-gradient">
                  {categories.length}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Categories
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point.title}
                className="group rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-brand text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
