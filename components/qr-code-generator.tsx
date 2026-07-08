'use client';

import * as React from 'react';
import QRCode from 'qrcode';
import {
  Check,
  Copy,
  Download,
  Eraser,
  History,
  Image as ImageIcon,
  Link2,
  Mail,
  MapPin,
  Phone,
  Trash2,
  Wifi,
  MessageCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQrHistory } from '@/hooks/use-qr-history';

type InputType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'wifi'
  | 'maps';

const inputTypes: { id: InputType; label: string; icon: React.ElementType }[] = [
  { id: 'url', label: 'URL', icon: Link2 },
  { id: 'text', label: 'Text', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'maps', label: 'Maps', icon: MapPin },
];

type WifiFields = { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass' };

const PRESET_COLORS = [
  '#0f172a',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#ea580c',
  '#16a34a',
  '#0d9488',
];

export function QrCodeGenerator() {
  const [type, setType] = React.useState<InputType>('url');
  const [url, setUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [maps, setMaps] = React.useState('');
  const [wifi, setWifi] = React.useState<WifiFields>({
    ssid: '',
    password: '',
    encryption: 'WPA',
  });

  const [fgColor, setFgColor] = React.useState('#0f172a');
  const [bgColor, setBgColor] = React.useState('#ffffff');
  const [transparent, setTransparent] = React.useState(false);
  const [size, setSize] = React.useState(320);
  const [margin, setMargin] = React.useState(2);
  const [logo, setLogo] = React.useState<string | null>(null);

  const [copied, setCopied] = React.useState(false);
  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const history = useQrHistory();
  const savedRef = React.useRef<string>('');

  const content = React.useMemo(() => buildContent(type, {
    url, text, email, phone, whatsapp, maps, wifi,
  }), [type, url, text, email, phone, whatsapp, maps, wifi]);

  React.useEffect(() => {
    if (!content) {
      setQrDataUrl('');
      setError(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(content, {
      width: size,
      margin,
      color: {
        dark: fgColor,
        light: transparent ? '#00000000' : bgColor,
      },
      errorCorrectionLevel: logo ? 'H' : 'M',
    })
      .then((dataUrl) => {
        if (cancelled) return;
        setQrDataUrl(dataUrl);
        setError(null);
        if (logo) drawLogo(dataUrl);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to generate QR code');
        setQrDataUrl('');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, size, margin, fgColor, bgColor, transparent, logo]);

  React.useEffect(() => {
    if (!qrDataUrl || !content) return;
    const handle = window.setTimeout(() => {
      if (savedRef.current === qrDataUrl) return;
      savedRef.current = qrDataUrl;
      history.add({
        kind: 'generated',
        type,
        data: content,
        preview: qrDataUrl,
        size,
      });
    }, 1200);
    return () => window.clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrDataUrl, content, type, size]);

  async function drawLogo(baseQr: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);
      const qrImg = new window.Image();
      qrImg.onload = () => {
        ctx.drawImage(qrImg, 0, 0, size, size);
        const logoSize = Math.round(size * 0.22);
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        const pad = Math.round(logoSize * 0.12);
        ctx.fillStyle = transparent ? 'rgba(255,255,255,0)' : bgColor;
        ctx.fillRect(x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2);
        ctx.drawImage(img, x, y, logoSize, logoSize);
        setQrDataUrl(canvas.toDataURL('image/png'));
      };
      qrImg.src = baseQr;
    };
    img.src = logo as string;
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  }

  function copyInput() {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function clearAll() {
    setUrl(''); setText(''); setEmail(''); setPhone(''); setWhatsapp(''); setMaps('');
    setWifi({ ssid: '', password: '', encryption: 'WPA' });
    setLogo(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
  }

  function download(format: 'png' | 'jpg' | 'svg') {
    if (!content) return;
    if (format === 'svg') {
      QRCode.toString(content, {
        type: 'svg',
        width: size,
        margin,
        color: { dark: fgColor, light: transparent ? '#00000000' : bgColor },
        errorCorrectionLevel: logo ? 'H' : 'M',
      }).then((svg) => {
        triggerDownload(
          new Blob([svg], { type: 'image/svg+xml' }),
          'qr-code.svg'
        );
      });
      return;
    }
    if (!qrDataUrl) return;
    if (format === 'png') {
      fetch(qrDataUrl)
        .then((r) => r.blob())
        .then((b) => triggerDownload(b, 'qr-code.png'));
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((b) => {
          if (b) triggerDownload(b, 'qr-code.jpg');
        }, 'image/jpeg', 0.92);
      };
      img.src = qrDataUrl;
    }
  }

  const hasContent = Boolean(content);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <Tabs value={type} onValueChange={(v) => setType(v as InputType)}>
          <div className="flex flex-wrap gap-2">
            {inputTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all',
                  type === t.id
                    ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                    : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <TabsContent value="url" className="mt-4">
            <Field label="Website URL">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="rounded-xl"
              />
            </Field>
          </TabsContent>
          <TabsContent value="text" className="mt-4">
            <Field label="Text">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Any text you want to encode..."
                className="min-h-[88px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
          </TabsContent>
          <TabsContent value="email" className="mt-4">
            <Field label="Email address">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="rounded-xl"
              />
            </Field>
          </TabsContent>
          <TabsContent value="phone" className="mt-4">
            <Field label="Phone number">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="rounded-xl"
              />
            </Field>
          </TabsContent>
          <TabsContent value="whatsapp" className="mt-4">
            <Field label="WhatsApp number" hint="Include country code, no + or spaces">
              <Input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value.replace(/[^\d]/g, ''))}
                placeholder="15551234567"
                className="rounded-xl"
              />
            </Field>
          </TabsContent>
          <TabsContent value="wifi" className="mt-4 space-y-3">
            <Field label="Network name (SSID)">
              <Input
                value={wifi.ssid}
                onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                placeholder="MyWiFi"
                className="rounded-xl"
              />
            </Field>
            <Field label="Password">
              <Input
                value={wifi.password}
                onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                placeholder="Network password"
                className="rounded-xl"
              />
            </Field>
            <Field label="Encryption">
              <div className="flex gap-2">
                {(['WPA', 'WEP', 'nopass'] as const).map((enc) => (
                  <button
                    key={enc}
                    onClick={() => setWifi({ ...wifi, encryption: enc })}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                      wifi.encryption === enc
                        ? 'border-transparent bg-gradient-brand text-white'
                        : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {enc === 'nopass' ? 'None' : enc}
                  </button>
                ))}
              </div>
            </Field>
          </TabsContent>
          <TabsContent value="maps" className="mt-4">
            <Field label="Google Maps URL" hint="Paste a full Google Maps link">
              <Input
                value={maps}
                onChange={(e) => setMaps(e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                className="rounded-xl"
              />
            </Field>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={copyInput}
            disabled={!hasContent}
            className="rounded-xl"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy input'}
          </Button>
          <Button
            variant="outline"
            onClick={clearAll}
            className="rounded-xl"
          >
            <Eraser className="h-4 w-4" />
            Clear
          </Button>
          <Link href="/tools/qr-history">
            <Button variant="outline" className="rounded-xl">
              <History className="h-4 w-4" />
              History
            </Button>
          </Link>
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Customization
          </h3>
          <div className="mt-5 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="QR color">
                <ColorRow value={fgColor} onChange={setFgColor} presets={PRESET_COLORS} />
              </Field>
              <Field label="Background color">
                <ColorRow
                  value={bgColor}
                  onChange={setBgColor}
                  presets={PRESET_COLORS}
                  disabled={transparent}
                />
              </Field>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Transparent background</p>
                <p className="text-xs text-muted-foreground">Remove the white background</p>
              </div>
              <Switch checked={transparent} onCheckedChange={setTransparent} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Logo in center</p>
                <p className="text-xs text-muted-foreground">Upload a square image (PNG/SVG best)</p>
              </div>
              <div className="flex items-center gap-2">
                {logo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLogo(null);
                      if (logoInputRef.current) logoInputRef.current.value = '';
                    }}
                    className="rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logoInputRef.current?.click()}
                  className="rounded-lg"
                >
                  <ImageIcon className="h-4 w-4" />
                  {logo ? 'Replace' : 'Upload'}
                </Button>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>

            <Field label={`QR size — ${size}px`}>
              <Slider
                value={[size]}
                onValueChange={(v) => setSize(v[0])}
                min={200}
                max={1000}
                step={20}
              />
              <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
                <span>200px</span>
                <span>1000px</span>
              </div>
            </Field>

            <Field label={`Quiet zone — ${margin}`}>
              <Slider
                value={[margin]}
                onValueChange={(v) => setMargin(v[0])}
                min={0}
                max={8}
                step={1}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Live preview
          </h3>
          <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {qrDataUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="QR code preview"
                  className="max-h-[280px] w-auto rounded-lg"
                  style={{ imageRendering: 'pixelated' }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <div>
                  <ImageIcon className="mx-auto h-8 w-8 opacity-40" />
                  <p className="mt-2">Enter content to generate</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              {hasContent ? `Encoded: ${content.length} chars` : 'Nothing to encode yet'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => download('png')}
                disabled={!hasContent}
                className="rounded-xl bg-gradient-brand text-white"
              >
                <Download className="h-4 w-4" />
                PNG
              </Button>
              <Button
                onClick={() => download('jpg')}
                disabled={!hasContent}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="h-4 w-4" />
                JPG
              </Button>
              <Button
                onClick={() => download('svg')}
                disabled={!hasContent}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="h-4 w-4" />
                SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ColorRow({
  value,
  onChange,
  presets,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  presets: string[];
  disabled?: boolean;
}) {
  return (
    <div className={cn('space-y-2', disabled && 'opacity-50')}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-10 w-12 cursor-pointer rounded-lg border border-input bg-background p-1"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="rounded-xl font-mono text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            disabled={disabled}
            className={cn(
              'h-6 w-6 rounded-md border transition-transform hover:scale-110',
              value.toLowerCase() === c.toLowerCase()
                ? 'border-foreground ring-2 ring-ring'
                : 'border-border/60'
            )}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
    </div>
  );
}

function buildContent(
  type: InputType,
  data: {
    url: string;
    text: string;
    email: string;
    phone: string;
    whatsapp: string;
    maps: string;
    wifi: WifiFields;
  }
): string {
  switch (type) {
    case 'url':
      return data.url.trim();
    case 'text':
      return data.text;
    case 'email':
      return data.email.trim() ? `mailto:${data.email.trim()}` : '';
    case 'phone':
      return data.phone.trim() ? `tel:${data.phone.trim()}` : '';
    case 'whatsapp':
      return data.whatsapp.trim()
        ? `https://wa.me/${data.whatsapp.trim()}`
        : '';
    case 'maps':
      return data.maps.trim();
    case 'wifi': {
      if (!data.wifi.ssid.trim()) return '';
      const esc = (s: string) =>
        s.replace(/([\\;,":])/g, '\\$1');
      const t = data.wifi.encryption === 'nopass' ? 'nopass' : data.wifi.encryption;
      const p =
        data.wifi.encryption === 'nopass' ? '' : `P:${esc(data.wifi.password)};`;
      return `WIFI:T:${t};S:${esc(data.wifi.ssid)};${p};`;
    }
    default:
      return '';
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.exitFullscreen?.();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
