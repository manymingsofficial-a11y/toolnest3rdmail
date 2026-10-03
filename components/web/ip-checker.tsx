'use client';

import * as React from 'react';
import { Copy, Check, Download, Wifi, WifiOff, Globe, Clock, Cpu, Monitor } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type NetworkInfo = {
  online: boolean;
  userAgent: string;
  platform: string;
  language: string;
  languages: string;
  hardwareConcurrency: number | null;
  timezone: string;
  cookieEnabled: boolean;
  maxTouchPoints: number;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelRatio: number;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
  localIP: string | null;
  localIPStatus: 'found' | 'unavailable' | 'checking';
};

export function IpChecker() {
  const [info, setInfo] = React.useState<NetworkInfo | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [checking, setChecking] = React.useState(false);

  async function getLocalIP(): Promise<string | null> {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pc.createDataChannel('');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      return await new Promise<string | null>((resolve) => {
        const timeout = setTimeout(() => {
          pc.close();
          resolve(null);
        }, 3000);
        pc.onicecandidate = (event) => {
          if (!event.candidate) {
            clearTimeout(timeout);
            pc.close();
            resolve(null);
            return;
          }
          const candidate = event.candidate.candidate;
          const ipMatch = candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
          if (ipMatch) {
            const ip = ipMatch[1];
            if (!ip.startsWith('0.') && !ip.startsWith('127.')) {
              clearTimeout(timeout);
              pc.close();
              resolve(ip);
            }
          }
        };
      });
    } catch {
      return null;
    }
  }

  async function handleCheck() {
    setChecking(true);
    setInfo(null);

    const nav = navigator as Navigator & {
      connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      };
    };

    const baseInfo: NetworkInfo = {
      online: nav.onLine,
      userAgent: nav.userAgent,
      platform: nav.platform || 'Not available',
      language: nav.language,
      languages: nav.languages?.join(', ') || nav.language,
      hardwareConcurrency: nav.hardwareConcurrency || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookieEnabled: nav.cookieEnabled,
      maxTouchPoints: nav.maxTouchPoints,
      screenWidth: screen.width,
      screenHeight: screen.height,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      effectiveType: nav.connection?.effectiveType ?? null,
      downlink: nav.connection?.downlink ?? null,
      rtt: nav.connection?.rtt ?? null,
      saveData: nav.connection?.saveData ?? null,
      localIP: null,
      localIPStatus: 'checking',
    };

    setInfo(baseInfo);

    const localIP = await getLocalIP();
    setInfo((prev) =>
      prev
        ? {
            ...prev,
            localIP,
            localIPStatus: localIP ? 'found' : 'unavailable',
          }
        : prev
    );
    setChecking(false);
  }

  function handleCopy() {
    if (!info) return;
    const text = JSON.stringify(info, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (!info) return;
    const blob = new Blob([JSON.stringify(info, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'network-info.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Downloaded');
  }

  const rows: { label: string; value: string; icon: React.ReactNode; available: boolean }[] = info
    ? [
        { label: 'Connection status', value: info.online ? 'Online' : 'Offline', icon: info.online ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />, available: true },
        { label: 'Local/private IP (WebRTC)', value: info.localIP ?? 'Not available', icon: <Globe className="h-4 w-4" />, available: info.localIPStatus === 'found' },
        { label: 'Public IP', value: 'Not available in-browser', icon: <Globe className="h-4 w-4 text-muted-foreground" />, available: false },
        { label: 'User agent', value: info.userAgent, icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Platform', value: info.platform, icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Language', value: info.language, icon: <Globe className="h-4 w-4" />, available: true },
        { label: 'All languages', value: info.languages, icon: <Globe className="h-4 w-4" />, available: true },
        { label: 'CPU cores', value: info.hardwareConcurrency?.toString() ?? 'Not available', icon: <Cpu className="h-4 w-4" />, available: info.hardwareConcurrency !== null },
        { label: 'Timezone', value: info.timezone, icon: <Clock className="h-4 w-4" />, available: true },
        { label: 'Screen size', value: `${info.screenWidth} x ${info.screenHeight}`, icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Color depth', value: `${info.colorDepth}-bit`, icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Pixel ratio', value: info.pixelRatio.toString(), icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Touch points', value: info.maxTouchPoints.toString(), icon: <Monitor className="h-4 w-4" />, available: true },
        { label: 'Connection type', value: info.effectiveType ?? 'Not available', icon: <Wifi className="h-4 w-4" />, available: info.effectiveType !== null },
        { label: 'Downlink speed', value: info.downlink !== null ? `${info.downlink} Mbps` : 'Not available', icon: <Wifi className="h-4 w-4" />, available: info.downlink !== null },
        { label: 'Round-trip time', value: info.rtt !== null ? `${info.rtt} ms` : 'Not available', icon: <Wifi className="h-4 w-4" />, available: info.rtt !== null },
        { label: 'Data saver', value: info.saveData === null ? 'Not available' : info.saveData ? 'Enabled' : 'Disabled', icon: <Wifi className="h-4 w-4" />, available: info.saveData !== null },
        { label: 'Cookies enabled', value: info.cookieEnabled ? 'Yes' : 'No', icon: <Monitor className="h-4 w-4" />, available: true },
      ]
    : [];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <p className="mb-4 text-sm text-muted-foreground">
          Displays browser-accessible network and device information. Public IP addresses cannot be
          retrieved by browser JavaScript without a server-side API. Local/private IP is attempted
          via WebRTC when available.
        </p>

        <Button
          onClick={handleCheck}
          disabled={checking}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-teal-700"
        >
          {checking ? 'Checking...' : 'Check Network Info'}
        </Button>

        {info && (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
                {copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy JSON</>}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />Download
              </Button>
            </div>

            <div className="mt-6 space-y-2">
              <Label className="text-sm font-medium">Network & Device Information</Label>
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 max-h-[500px]">
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-muted/20' : ''}>
                        <td className="px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap align-top">
                          <span className="flex items-center gap-2">
                            {row.icon}
                            {row.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 break-all">
                          {row.available ? (
                            <span className="text-foreground">{row.value}</span>
                          ) : (
                            <span className="text-muted-foreground italic">{row.value}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {info.localIPStatus === 'checking' && (
              <p className="mt-3 text-sm text-muted-foreground">Detecting local IP via WebRTC...</p>
            )}
            {info.localIPStatus === 'unavailable' && (
              <p className="mt-3 text-sm text-muted-foreground">
                WebRTC local IP detection is not available in this browser. Some browsers block this
                feature for privacy reasons.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
