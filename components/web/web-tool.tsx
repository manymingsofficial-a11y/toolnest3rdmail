'use client';

import * as React from 'react';
import { Copy, Check, Download, Loader2} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type WebToolConfig = {
  slug: string;
  label: string;
  description: string;
  showUrlInput: boolean;
  showBrowserInfo: boolean;
  showCookieViewer: boolean;
  showManifestGenerator: boolean;
  showQrLabel: boolean;
  actionLabel: string;
};

export function WebTool({ config }: { config: WebToolConfig }) {
  const [url, setUrl] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [manifestData, setManifestData] = React.useState({
    name: 'My App',
    shortName: 'MyApp',
    themeColor: '#3b82f6',
    bgColor: '#ffffff',
    display: 'standalone',
  });
  const [labelText, setLabelText] = React.useState('Product Label');
  const [labelUrl, setLabelUrl] = React.useState('https://example.com');

  React.useEffect(() => {
    if (config.showBrowserInfo) {
      const nav = navigator;
      const info = {
        browser: nav.userAgent,
        platform: nav.platform,
        language: nav.language,
        languages: nav.languages?.join(', '),
        cookieEnabled: nav.cookieEnabled,
        online: nav.onLine,
        hardwareConcurrency: nav.hardwareConcurrency,
        maxTouchPoints: nav.maxTouchPoints,
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      setResult(JSON.stringify(info, null, 2));
    }
    if (config.showCookieViewer) {
      setResult(document.cookie || 'No cookies found for this domain.');
    }
  }, [config.showBrowserInfo, config.showCookieViewer]);

  async function handleProcess() {
    if (config.showUrlInput && !url) {
      toast.error('Please enter a URL first.');
      return;
    }
    setProcessing(true);
    setResult(null);

    setTimeout(() => {
      try {
        if (config.slug === 'user-agent-parser') {
          const ua = navigator.userAgent;
          const browser = ua.match(/(Chrome|Firefox|Safari|Edge|Opera|OPR|MSIE|Trident)\/[\d.]+/)?.[0] || 'Unknown';
          const os = ua.match(/(Windows|Macintosh|Linux|Android|iPhone|iPad)/)?.[0] || 'Unknown';
          const engine = ua.match(/(WebKit|Gecko|Blink|Trident)\/[\d.]+/)?.[0] || 'Unknown';
          const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
          setResult(JSON.stringify({ browser, os, engine, isMobile, fullUA: ua }, null, 2));
          setProcessing(false);
          toast.success('User agent parsed!');
          return;
        }

        if (config.slug === 'http-header-viewer') {
          try {
            const parsedUrl = new URL(url);
            const response = await fetch(parsedUrl.origin, {
              method: 'GET',
              mode: 'no-cors',
              signal: AbortSignal.timeout(8000),
            });
            const headers: Record<string, string> = {};
            response.headers.forEach((value, key) => {
              headers[key] = value;
            });
            if (Object.keys(headers).length === 0) {
              setResult(JSON.stringify({
                url: url,
                note: 'The browser blocked access to response headers due to CORS policy. For complete HTTP header inspection, use a server-side tool like curl or a dedicated API.',
                reachable: true,
              }, null, 2));
              toast.info('Site is reachable, but CORS blocked header access.');
            } else {
              setResult(JSON.stringify({ url, headers }, null, 2));
              toast.success('Headers retrieved!');
            }
          } catch {
            setResult(JSON.stringify({
              url: url,
              error: 'Could not reach the URL. The site may be down, or the browser blocked the request.',
            }, null, 2));
            toast.error('Could not fetch headers.');
          }
          setProcessing(false);
          return;
        }

        if (config.slug === 'website-screenshot') {
          try {
            const parsedUrl = new URL(url);
            setResult(JSON.stringify({
              url: url,
              note: 'Browser security prevents capturing screenshots of external websites directly. To capture a screenshot, you can use your browser\'s built-in screenshot tool, or a browser extension. Alternatively, open the URL in a new tab and use your operating system\'s screenshot feature.',
              domain: parsedUrl.hostname,
              suggestedTools: [
                'Browser DevTools (F12) → Run command → Capture screenshot',
                'Chrome extension: GoFullPage',
                'Firefox: right-click → Take Screenshot',
              ],
            }, null, 2));
            toast.info('Screenshot guidance provided.');
          } catch {
            toast.error('Invalid URL. Please enter a full URL like https://example.com');
          }
          setProcessing(false);
          return;
        }

        if (config.slug === 'url-preview') {
          setResult(JSON.stringify({
            url: url,
            protocol: new URL(url).protocol,
            hostname: new URL(url).hostname,
            pathname: new URL(url).pathname,
            search: new URL(url).search,
            hash: new URL(url).hash,
          }, null, 2));
          setProcessing(false);
          toast.success('URL preview ready!');
          return;
        }

        if (config.slug === 'website-manifest-generator') {
          const manifest = {
            name: manifestData.name,
            short_name: manifestData.shortName,
            theme_color: manifestData.themeColor,
            background_color: manifestData.bgColor,
            display: manifestData.display,
            start_url: '/',
            icons: [
              { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
            ],
          };
          setResult(JSON.stringify(manifest, null, 2));
          setProcessing(false);
          toast.success('Manifest generated!');
          return;
        }

        if (config.slug === 'qr-label-generator') {
          try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(labelUrl)}`;
            const response = await fetch(qrUrl);
            if (!response.ok) throw new Error('QR API error');
            const blob = await response.blob();
            const qrImageUrl = URL.createObjectURL(blob);
            setResult(qrImageUrl);
            toast.success('QR label generated!');
          } catch {
            setResult(JSON.stringify({
              label: labelText,
              url: labelUrl,
              error: 'Could not generate QR code. Please check your connection and try again.',
            }, null, 2));
            toast.error('QR generation failed. Please try again.');
          }
          setProcessing(false);
          return;
        }

        setProcessing(false);
      } catch {
        setProcessing(false);
        toast.error('Processing failed. Please check the URL.');
      }
    }, 800);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (!result) return;
    if (result.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = result;
      a.download = `${config.slug}-result.png`;
      a.click();
      toast.success('Downloaded!');
      return;
    }
    const ext = config.slug === 'website-manifest-generator' ? 'json' : 'txt';
    const blob = new Blob([result], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = config.slug === 'website-manifest-generator' ? 'manifest.json' : `${config.slug}-result.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded!');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* URL input */}
        {config.showUrlInput && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="rounded-xl" />
          </div>
        )}

        {/* Manifest generator controls */}
        {config.showManifestGenerator && (
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">App Name</Label><Input value={manifestData.name} onChange={(e) => setManifestData({ ...manifestData, name: e.target.value })} className="mt-2" /></div>
            <div><Label className="text-sm font-medium">Short Name</Label><Input value={manifestData.shortName} onChange={(e) => setManifestData({ ...manifestData, shortName: e.target.value })} className="mt-2" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm font-medium">Theme Color</Label><div className="mt-2 flex items-center gap-3"><input type="color" value={manifestData.themeColor} onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" /><Input value={manifestData.themeColor} onChange={(e) => setManifestData({ ...manifestData, themeColor: e.target.value })} className="w-32" /></div></div>
              <div><Label className="text-sm font-medium">Background Color</Label><div className="mt-2 flex items-center gap-3"><input type="color" value={manifestData.bgColor} onChange={(e) => setManifestData({ ...manifestData, bgColor: e.target.value })} className="h-10 w-16 cursor-pointer rounded-lg border border-border/60" /><Input value={manifestData.bgColor} onChange={(e) => setManifestData({ ...manifestData, bgColor: e.target.value })} className="w-32" /></div></div>
            </div>
          </div>
        )}

        {/* QR Label controls */}
        {config.showQrLabel && (
          <div className="space-y-4">
            <div><Label className="text-sm font-medium">Label Text</Label><Input value={labelText} onChange={(e) => setLabelText(e.target.value)} className="mt-2" /></div>
            <div><Label className="text-sm font-medium">URL to Encode</Label><Input value={labelUrl} onChange={(e) => setLabelUrl(e.target.value)} className="mt-2" /></div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {!config.showBrowserInfo && !config.showCookieViewer && (
            <Button onClick={handleProcess} disabled={processing} className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-teal-700">
              {processing ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Processing...</> : config.actionLabel}
            </Button>
          )}
          {result && !result.startsWith('blob:') && <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy</>}</Button>}
          {result && <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-medium">Result</Label>
            {result.startsWith('blob:') ? (
              <div className="flex flex-col items-center gap-4">
                <img src={result} alt="Generated QR code" className="rounded-xl border border-border/60 max-w-[300px]" />
                {config.showQrLabel && labelText && (
                  <p className="text-sm font-medium text-center">{labelText}</p>
                )}
              </div>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[500px]">{result}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
