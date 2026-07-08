import { CheckCircle2, Bolt, Lock, Smartphone, Infinity as InfinityIcon } from 'lucide-react';

const features = [
  {
    icon: Bolt,
    title: 'Lightning fast',
    description:
      'Most tools run entirely in your browser, so results are instant — no uploads, no waiting, no servers to slow you down.',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    icon: Lock,
    title: 'Private & secure',
    description:
      'Your data stays on your device for the majority of tools. When files are processed, they are deleted automatically right after.',
    gradient: 'from-fuchsia-400 to-purple-600',
  },
  {
    icon: InfinityIcon,
    title: 'Free, forever',
    description:
      'No paywalls, no premium tiers, no trial limits. Every tool is completely free with unlimited usage, always.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Works everywhere',
    description:
      'Fully responsive on mobile, tablet and desktop. No app to install — just open a tool and go, on any device.',
    gradient: 'from-violet-400 to-indigo-600',
  },
];

const stats = [
  { value: '500+', label: 'Free tools' },
  { value: '10', label: 'Categories' },
  { value: '1M+', label: 'Monthly users' },
  { value: '0', label: 'Sign-ups needed' },
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
              Hundreds of free tools, one clean platform. No clutter, no
              paywalls, no registration — just the tools you need, ready when
              you are.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card/70 p-6 backdrop-blur-xl"
                >
                  <dt className="text-3xl font-bold tracking-tight text-gradient">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
              >
                <div
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
