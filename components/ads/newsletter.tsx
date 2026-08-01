'use client';

import * as React from 'react';
import { CheckCircle2, Mail, Loader2 } from 'lucide-react';
import { isNewsletterEnabled } from '@/lib/monetization';
import { cn } from '@/lib/utils';

type NewsletterProps = {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
  title?: string;
  description?: string;
};

export function Newsletter({
  variant = 'default',
  className,
  title = 'Stay in the loop',
  description = 'Get notified when we add new tools. No spam, unsubscribe anytime.',
}: NewsletterProps) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  if (!isNewsletterEnabled()) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setMessage("You're subscribed! Watch your inbox for updates.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (variant === 'inline') {
    return (
      <div className={cn('rounded-xl border border-border/60 bg-muted/20 p-4', className)}>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-brand-purple" />
          <h4 className="text-sm font-semibold">{title}</h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Email address"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-xs text-rose-500">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('rounded-2xl glass-card p-6', className)}>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand-purple" />
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-10 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Email address"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-105 disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="mt-3 text-sm text-rose-500">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('rounded-3xl glass-card p-8 text-center sm:p-12', className)}>
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
        <Mail className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{description}</p>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Email address"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-105 disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          {message}
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-rose-500">{message}</p>
      )}
    </div>
  );
}
