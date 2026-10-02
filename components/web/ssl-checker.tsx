'use client';

import * as React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Loader2, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type SslResult = {
  status: 'reachable' | 'failed' | 'invalid-url' | 'cors-blocked';
  url: string;
  httpsUrl: string;
  message: string;
  details: string;
};

export function SslChecker() {
  const [url, setUrl] = React.useState('');
  const [checking, setChecking] = React.useState(false);
  const [result, setResult] = React.useState<SslResult | null>(null);

  function normalizeUrl(input: string): string | null {
    let trimmed = input.trim();
    if (!trimmed) return null;
    if (!trimmed.match(/^https?:\/\//)) {
      trimmed = 'https://' + trimmed;
    }
    try {
      const parsed = new URL(trimmed);
      return parsed.href;
    } catch {
      return null;
    }
  }

  async function handleCheck() {
    const normalized = normalizeUrl(url);
    if (!normalized) {
      setResult({
        status: 'invalid-url',
        url: url,
        httpsUrl: '',
        message: 'Invalid URL',
        details: 'The entered URL is not valid. Please enter a full URL like https://example.com or a domain like example.com.',
      });
      return;
    }

    setChecking(true);
    setResult(null);

    const parsed = new URL(normalized);
    const httpsUrl = parsed.protocol === 'http:'
      ? normalized.replace('http://', 'https://')
      : normalized;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(httpsUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        redirect: 'follow',
      });

      clearTimeout(timeoutId);

      setResult({
        status: 'reachable',
        url: normalized,
        httpsUrl,
        message: 'HTTPS connection successful',
        details: `The server at ${parsed.hostname} responded to the HTTPS request. The connection is encrypted and the SSL/TLS handshake completed successfully. The response is opaque (browser CORS policy prevents reading response details), but the server is reachable via HTTPS.`,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof DOMException && err.name === 'AbortError';

      let message = 'HTTPS connection failed';
      let details = '';
      let status: SslResult['status'] = 'failed';

      if (isAbort) {
        message = 'Connection timed out';
        details = `The request to ${parsed.hostname} did not complete within 10 seconds. This could indicate a slow server, a firewall blocking the connection, or a network issue.`;
      } else if (err instanceof TypeError) {
        details = `Could not establish an HTTPS connection to ${parsed.hostname}. This typically means one of the following:\n\n• The domain does not exist or has no DNS record\n• The server is not listening on port 443\n• The SSL/TLS certificate is invalid or expired (browser refused the connection)\n• A firewall or network restriction is blocking the connection\n\nBrowser JavaScript cannot distinguish between these causes. For detailed certificate information, use the padlock icon in your browser's address bar or run: openssl s_client -connect ${parsed.hostname}:443`;
        status = 'failed';
      } else {
        details = `An unexpected error occurred while connecting to ${parsed.hostname}: ${err instanceof Error ? err.message : String(err)}`;
      }

      setResult({
        status,
        url: normalized,
        httpsUrl,
        message,
        details,
      });
    }

    setChecking(false);
  }

  const statusIcon = result?.status === 'reachable' ? (
    <ShieldCheck className="h-6 w-6 text-green-500" />
  ) : result?.status === 'failed' ? (
    <ShieldAlert className="h-6 w-6 text-amber-500" />
  ) : result?.status === 'invalid-url' ? (
    <ShieldX className="h-6 w-6 text-red-500" />
  ) : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Website URL</Label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="rounded-xl"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCheck();
            }}
          />
        </div>

        <div className="mt-4">
          <Button
            onClick={handleCheck}
            disabled={checking}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-teal-700"
          >
            {checking ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              'Check HTTPS'
            )}
          </Button>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">
          <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            This tool checks whether a website is reachable via HTTPS. Browser security prevents
            JavaScript from reading SSL certificate details (issuer, expiry, chain, cipher). For
            full certificate inspection, click the padlock icon in your browser's address bar or use{' '}
            <code className="rounded bg-muted px-1">openssl s_client</code> in a terminal.
          </p>
        </div>

        {result && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              {statusIcon}
              <div>
                <p className="font-medium">{result.message}</p>
                <p className="text-xs text-muted-foreground">
                  Checked: {result.httpsUrl || result.url}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap">
              {result.details}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
