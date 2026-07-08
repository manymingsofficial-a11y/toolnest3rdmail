'use client';

import * as React from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  CameraOff,
  Check,
  Copy,
  Eraser,
  ExternalLink,
  Image as ImageIcon,
  ScanLine,
  Upload,
  History,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useQrHistory } from '@/hooks/use-qr-history';

type ScanResult = { data: string; type: ResultKind };

type ResultKind =
  | 'url'
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'wifi'
  | 'maps'
  | 'text';

function classify(data: string): ResultKind {
  const v = data.trim();
  if (/^https?:\/\//i.test(v)) return 'url';
  if (/^mailto:/i.test(v)) return 'email';
  if (/^tel:/i.test(v)) return 'phone';
  if (/^https?:\/\/wa\.me\//i.test(v)) return 'whatsapp';
  if (/^WIFI:/i.test(v)) return 'wifi';
  if (/^https?:\/\/(maps\.google|www\.google\.com\/maps|goo\.gl\/maps)/i.test(v))
    return 'maps';
  return 'text';
}

const kindLabel: Record<ResultKind, string> = {
  url: 'Website URL',
  email: 'Email',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  wifi: 'WiFi',
  maps: 'Google Maps',
  text: 'Text',
};

export function QrScanner() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const [cameraActive, setCameraActive] = React.useState(false);
  const [cameraError, setCameraError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<ScanResult | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [scanning, setScanning] = React.useState(false);

  const history = useQrHistory();
  const savedRef = React.useRef<string>('');

  const stopCamera = React.useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setScanning(false);
  }, []);

  const handleResult = React.useCallback(
    (data: string) => {
      const type = classify(data);
      setResult({ data, type });
      setScanning(false);
      if (savedRef.current === data) return;
      savedRef.current = data;
      history.add({
        kind: 'scanned',
        type: kindLabel[type],
        data,
        preview: '',
        size: 0,
      });
    },
    [history]
  );

  const tick = React.useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const code = jsQR(imageData.data, w, h, {
      inversionAttempts: 'dontInvert',
    });
    if (code && code.data) {
      handleResult(code.data);
      stopCamera();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [stopCamera, handleResult]);

  async function startCamera() {
    setResult(null);
    setCameraError(null);
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      setScanning(false);
      setCameraActive(false);
      const msg = e instanceof Error ? e.message : 'Unable to access camera';
      setCameraError(
        /denied|permission/i.test(msg)
          ? 'Camera permission was denied. Please allow camera access in your browser settings and try again.'
          : 'Could not start the camera. This may happen on desktops without a webcam, or in browsers that block camera access.'
      );
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    setResult(null);
    setCameraError(null);

    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        URL.revokeObjectURL(url);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height, {
        inversionAttempts: 'attemptBoth',
      });
      URL.revokeObjectURL(url);
      if (code && code.data) {
        handleResult(code.data);
      } else {
        setCameraError(
          'No QR code was found in this image. Try a clearer or higher-contrast image.'
        );
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setCameraError('Could not read that image file.');
    };
    img.src = url;
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result.data).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function clearResult() {
    setResult(null);
    setCameraError(null);
    savedRef.current = '';
  }

  React.useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const isUrl = result?.type === 'url';

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Scan with camera
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Point your camera at a QR code. Detection happens live in your
            browser.
          </p>

          <div className="mt-4 grid place-items-center overflow-hidden rounded-xl border border-dashed border-border/60 bg-muted/30 p-4">
            {cameraActive || scanning ? (
              <div className="relative w-full max-w-sm">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="h-2/3 w-2/3 rounded-xl border-2 border-white/70 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {scanning ? 'Scanning…' : 'Camera active'}
                </p>
              </div>
            ) : (
              <div className="grid h-[200px] place-items-center text-center text-sm text-muted-foreground">
                <div>
                  <Camera className="mx-auto h-10 w-10 opacity-40" />
                  <p className="mt-2">Camera is off</p>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {!cameraActive ? (
              <Button
                onClick={startCamera}
                className="rounded-xl bg-gradient-brand text-white"
              >
                <Camera className="h-4 w-4" />
                Start camera
              </Button>
            ) : (
              <Button
                onClick={stopCamera}
                variant="outline"
                className="rounded-xl"
              >
                <CameraOff className="h-4 w-4" />
                Stop camera
              </Button>
            )}
          </div>

          {cameraError && (
            <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {cameraError}
            </p>
          )}
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Upload an image
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload a photo or screenshot that contains a QR code.
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 w-full rounded-xl border-dashed"
          >
            <Upload className="h-4 w-4" />
            Choose image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        <Link href="/tools/qr-history">
          <Button variant="outline" className="w-full rounded-xl">
            <History className="h-4 w-4" />
            View QR History
          </Button>
        </Link>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Scan result
          </h3>
          <div className="mt-4 min-h-[200px] rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">
                    <ScanLine className="h-3.5 w-3.5" />
                    {kindLabel[result.type]}
                  </span>
                </div>
                <div className="break-all rounded-xl border border-border/60 bg-background/60 p-4 text-sm font-mono">
                  {result.data}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={copyResult}
                    className="rounded-xl bg-gradient-brand text-white"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-300" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  {isUrl && (
                    <a
                      href={result.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button variant="outline" className="rounded-xl">
                        <ExternalLink className="h-4 w-4" />
                        Open URL
                      </Button>
                    </a>
                  )}
                  <Button
                    onClick={clearResult}
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Eraser className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                <div>
                  <ImageIcon className="mx-auto h-10 w-10 opacity-40" />
                  <p className="mt-2">
                    Scan a QR code or upload an image to see the result here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
