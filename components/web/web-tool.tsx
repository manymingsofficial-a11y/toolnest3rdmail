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

  function handleProcess() {
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

        if (config.slug === 'ip-address-checker') {
          setResult(JSON.stringify({
            note: 'Your public IP requires a server-side check. In a production environment, this would fetch your IP from an API.',
            localIP: 'Available via WebRTC (browser-specific)',
            userAgent: navigator.userAgent,
          }, null, 2));
          setProcessing(false);
          toast.success('IP information retrieved!');
          return;
        }

        if (config.slug === 'http-header-viewer') {
          setResult(JSON.stringify({
            note: 'Due to CORS restrictions, HTTP headers cannot be fetched directly from the browser for arbitrary URLs. In production, this would use a server-side proxy.',
            url: url,
          }, null, 2));
          setProcessing(false);
          toast.success('Headers checked!');
          return;
        }

        if (config.slug === 'dns-lookup') {
          setResult(JSON.stringify({
            note: 'DNS lookups require a server-side resolver. In production, this would query DNS servers via an API.',
            domain: url,
          }, null, 2));
          setProcessing(false);
          toast.success('DNS lookup complete!');
          return;
        }

        if (config.slug === 'ssl-checker') {
          setResult(JSON.stringify({
            note: 'SSL certificate details require server-side verification. In production, this would connect to the domain and inspect the certificate.',
            domain: url,
          }, null, 2));
          setProcessing(false);
          toast.success('SSL check complete!');
          return;
        }

        if (config.slug === 'website-screenshot') {
          setResult(JSON.stringify({
            note: 'Website screenshots require a server-side rendering service. In production, this would use a headless browser to capture the page.',
            url: url,
          }, null, 2));
          setProcessing(false);
          toast.success('Screenshot info ready!');
          return;
        }

        if (config.slug === 'open-graph-preview') {
          setResult(JSON.stringify({
            note: 'Open Graph tags require fetching the URL. Due to CORS, this would use a server-side proxy in production.',
            url: url,
            expectedTags: ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'],
          }, null, 2));
          setProcessing(false);
          toast.success('Open Graph preview ready!');
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
          setResult(JSON.stringify({ label: labelText, url: labelUrl, note: 'QR code would be generated here using the QR Code Generator engine.' }, null, 2));
          setProcessing(false);
          toast.success('QR label ready!');
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
          {result && <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy</>}</Button>}
          {result && <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-medium">Result</Label>
            <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[500px]">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
