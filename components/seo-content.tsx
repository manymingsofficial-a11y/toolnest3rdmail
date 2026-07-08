'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type SeoFaq = { q: string; a: string };

export type SeoContentProps = {
  whatIs: string;
  howTo: string[];
  benefits: { title: string; description: string }[];
  faqs: SeoFaq[];
};

export function SeoContent({ whatIs, howTo, benefits, faqs }: SeoContentProps) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold tracking-tight">What is this tool?</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{whatIs}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">How to use it</h2>
        <ol className="mt-4 space-y-3">
          {howTo.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Benefits</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl glass-card p-5">
              <h3 className="text-base font-semibold tracking-tight">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-4 rounded-2xl glass-card p-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-b border-border/60 last:border-0 px-4"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
