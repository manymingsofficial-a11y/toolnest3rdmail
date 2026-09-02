import { Wrench, Shield, Zap, FolderOpen, Globe } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import { AdSlot } from '@/components/ads/ad-slot';
import { tools, categories } from '@/lib/data';

export const metadata = {
  title: 'About ToolNest',
  description: `ToolNest provides ${tools.length} free online tools across ${categories.length} categories — PDF, image, QR, SEO, AI, text, developer, calculators and more. All tools run in your browser with no registration required.`,
};

const features = [
  {
    icon: Globe,
    title: 'Tools that run in your browser',
    description:
      'Most ToolNest tools process your files and data entirely on your device. Nothing is uploaded to a server, which means faster results and better privacy.',
  },
  {
    icon: Shield,
    title: 'Privacy by default',
    description:
      'Because processing happens locally in your browser, your files and inputs never leave your computer. There is no need to trust a third party with sensitive documents.',
  },
  {
    icon: Zap,
    title: 'No registration required',
    description:
      'Every tool is available instantly — no account, no sign-up, no paywall. Open a tool and start using it right away.',
  },
  {
    icon: FolderOpen,
    title: 'Organized into categories',
    description: `Tools are grouped into ${categories.length} clear categories so you can find what you need without scrolling through an endless list.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Free online tools for everyone"
        description={`ToolNest brings ${tools.length} practical online tools together in one clean, fast, secure place — across ${categories.length} categories including PDF, image, QR & barcode, SEO, AI, text, developer, calculators, and converters.`}
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <AdSlot slot="homepage-bottom" className="mb-8" />
        <div className="space-y-8">
          <div className="rounded-2xl glass-card p-8">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
              <Wrench className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-center text-xl font-semibold tracking-tight">
              Our mission
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
              ToolNest exists to make everyday digital tasks simple and
              accessible. Whether you need to compress a PDF, generate a QR
              code, convert an image, format JSON, or calculate a loan payment,
              you should not have to download software, create an account, or
              pay a fee. Every tool on this site is free to use, works in your
              browser, and respects your privacy.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl glass-card p-6"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand/10 text-brand-purple">
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

          <div className="rounded-2xl glass-card p-8 text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              {tools.length} tools and growing
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              ToolNest launched with {tools.length} tools across {categories.length}{' '}
              categories, and new tools are added regularly. If there is a tool
              you need that we do not have yet, let us know through the contact
              page — we build what our users ask for.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
