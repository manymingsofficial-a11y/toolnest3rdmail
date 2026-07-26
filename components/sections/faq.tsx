'use client';

import { HelpCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faqs } from '@/lib/faqs';

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
            <HelpCircle className="h-4 w-4" />
            Frequently asked
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Everything you need to know about ToolNest. Still curious? Reach
            out anytime.
          </p>
        </div>

        <div className="mt-10 rounded-2xl glass-card p-2">
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

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-gradient-brand p-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg font-semibold">Still have questions?</h3>
            <p className="text-sm text-white/80">
              Our team usually replies within one business day.
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="rounded-xl bg-white text-foreground hover:bg-white/90"
          >
            <a href="/contact">Contact us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
