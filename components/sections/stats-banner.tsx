import {
  CheckCircle2,
  Globe,
  Infinity as InfinityIcon,
  Lock,
  Smartphone,
  Zap,
} from 'lucide-react';

import { tools, categories } from '@/lib/data';

const features = [
  {
    icon: Zap,
    title: 'Fast Processing',
    description:
      'Most tools run entirely in your browser, so results are instant — no uploads, no waiting.',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Your data stays on your device. Files are processed locally and never leave your browser.',
    gradient: 'from-fuchsia-400 to-purple-600',
  },
  {
    icon: InfinityIcon,
    title: 'Free Forever',
    description:
      'No paywalls, no premium tiers, no trial limits. Every tool is completely free with unlimited usage.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description:
      'Fully responsive on mobile, tablet and desktop. No app to install — just open and go.',
    gradient: 'from-violet-400 to-indigo-600',
  },
  {
    icon: Globe,
    title: 'Browser Based',
    description:
      'No installation or downloads required. Works in any modern browser on any operating system.',
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    icon: CheckCircle2,
    title: 'No Registration',
    description:
      'No sign-up, no account, no email needed. Open a tool and start using it immediately.',
    gradient: 'from-amber-400 to-orange-600',
  },
];

export function StatsBanner() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
            <CheckCircle2 className="h-4 w-4" />
            Why ToolNest
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for speed, privacy and simplicity
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {tools.length} free tools across {categories.length} categories —
            all running in your browser, with no registration required.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
            >
              <div
                aria-hidden
                className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
