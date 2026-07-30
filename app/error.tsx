'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-[120px]" />
      </div>

      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 animate-float place-items-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-2xl shadow-red-500/30">
          <AlertTriangle className="h-10 w-10" />
        </div>

        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          An unexpected error occurred. Try reloading the page — if the problem
          persists, head back home and try again.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25"
          >
            <RefreshCw className="h-4 w-4" />
            Reload page
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
