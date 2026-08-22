'use client';

import * as React from 'react';
import { CircleCheck as CheckCircle2, Loader as Loader2, Send, CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function validate(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > 100)
    errors.name = 'Name must be 100 characters or fewer.';

  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  else if (values.email.trim().length > 320)
    errors.email = 'Email is too long.';

  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  else if (values.subject.trim().length > 200)
    errors.subject = 'Subject must be 200 characters or fewer.';

  if (!values.message.trim()) errors.message = 'Please enter a message.';
  else if (values.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  else if (values.message.trim().length > 5000)
    errors.message = 'Message must be 5000 characters or fewer.';

  return errors;
}

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = React.useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;

    const values = { name, email, subject, message };
    const fieldErrors = validate(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setServerError(
          data.error ?? 'Something went wrong. Please try again.'
        );
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus('error');
      setServerError('Network error. Please try again.');
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-2xl glass-card p-8 text-center',
          className
        )}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight">
          Message sent
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Thanks for contacting us. Your message has been received.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl glass-card p-6 sm:p-8', className)}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="text-sm font-medium leading-none"
            >
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError('name');
              }}
              disabled={status === 'loading'}
              placeholder="Your name"
              className={cn(
                'h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
                errors.name ? 'border-rose-400' : 'border-input'
              )}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-rose-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="text-sm font-medium leading-none"
            >
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
              disabled={status === 'loading'}
              placeholder="you@email.com"
              className={cn(
                'h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
                errors.email ? 'border-rose-400' : 'border-input'
              )}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-rose-500">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-subject"
            className="text-sm font-medium leading-none"
          >
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              clearFieldError('subject');
            }}
            disabled={status === 'loading'}
            placeholder="What is this about?"
            className={cn(
              'h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
              errors.subject ? 'border-rose-400' : 'border-input'
            )}
            aria-invalid={!!errors.subject}
          />
          {errors.subject && (
            <p className="text-xs text-rose-500">{errors.subject}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium leading-none"
          >
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearFieldError('message');
            }}
            disabled={status === 'loading'}
            placeholder="Tell us more..."
            rows={6}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
              errors.message ? 'border-rose-400' : 'border-input'
            )}
            aria-invalid={!!errors.message}
          />
          {errors.message ? (
            <p className="text-xs text-rose-500">{errors.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {message.length}/5000 characters
            </p>
          )}
        </div>

        {status === 'error' && serverError && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-400/40 bg-rose-500/5 p-3 text-sm text-rose-600">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-[1.02] disabled:opacity-50 sm:w-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
