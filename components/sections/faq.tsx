'use client';

import { CircleHelp as HelpCircle } from 'lucide-react';

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

        <div className="relative mt-8 overflow-hidden rounded-2xl glass-card p-8 sm:p-10">
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-brand-blue/15 blur-[80px]" />
          </div>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
                <HelpCircle className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our team usually replies within one business day.
                </p>
              </div>
            </div>
            <Button
              asChild
              className="rounded-xl bg-gradient-brand px-6 py-2.5 text-white shadow-lg shadow-brand-purple/20 transition-transform hover:scale-105 hover:opacity-90"
            >
              <a href="/contact">Contact us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
