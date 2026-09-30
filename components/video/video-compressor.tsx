'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';
import { formatBytes } from '@/lib/format-utils';

interface CompressionPreset {
  label: string;
  crf: string;
  preset: string;
  description: string;
}

const COMPRESSION_PRESETS: CompressionPreset[] = [
  { label: 'High Quality', crf: '20', preset: 'slow', description: 'Best quality, larger file' },
  { label: 'Balanced', crf: '23', preset: 'medium', description: 'Good balance (default)' },
  { label: 'Small File', crf: '28', preset: 'fast', description: 'Smaller file, lower quality' },
  { label: 'Tiny', crf: '32', preset: 'veryfast', description: 'Smallest file, visible artifacts' },
];

export function VideoCompressor() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [preset, setPreset] = React.useState('Balanced');
  const [customCRF, setCustomCRF] = React.useState('');
  const [customPreset, setCustomPreset] = React.useState('medium');
  const [useCustom, setUseCustom] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (!f.type.startsWith('video/')) {
      toast.error('Please select a valid video file.');
      return;
    }
    setFile(f);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);

    const url = URL.createObjectURL(f);
    if (videoRef.current) {
      videoRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function getSelectedPreset(): CompressionPreset {
    return COMPRESSION_PRESETS.find(p => p.label === preset) || COMPRESSION_PRESETS[1];
  }

  async function compressVideo() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const selectedPreset = useCustom 
        ? { crf: customCRF || '23', preset: customPreset, label: 'Custom' }
        : getSelectedPreset();
      
      setStatus(`Compressing with ${selectedPreset.label} preset...`);
      setProgress(20);

      const output = await runFFmpeg(
        [
          '-i', 'input.mp4',
          '-c:v', 'libx264',
          '-preset', selectedPreset.preset,
          '-crf', selectedPreset.crf,
          '-c:a', 'aac',
          '-b:a', '128k',
          'output.mp4'
        ],
        [{ name: 'input.mp4', data: file }],
        'output.mp4'
      );

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      const savings = file.size > blob.size ? Math.round((1 - blob.size / file.size) * 100) : 0;
      setStatus(`Done! ${savings}% smaller (${formatBytes(file.size)} → ${formatBytes(blob.size)})`);
      toast.success('Video compressed!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to compress video.');
      setStatus(null);
      toast.error('Failed to compress video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_compressed.mp4' || 'compressed.mp4';
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    revokeObjectUrl(resultUrl);
    toast.success('Downloaded!');
  }

  function handleCopy() {
    if (!resultUrl) return;
    navigator.clipboard.writeText(resultUrl).then(() => {
      setCopied(true);
      toast.success('URL copied!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFile(null);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) {
      revokeObjectUrl(videoRef.current.src);
      videoRef.current.src = '';
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={() => {}}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
            file ? 'border-border/60' : 'border-border/60 hover:border-brand-purple/50'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <FileVideo className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop a video file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP4, WebM, MOV, AVI</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileVideo className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Compression Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Compression Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Compression Preset</Label>
              <Select value={preset} onValueChange={(v) => { setPreset(v); setUseCustom(false); }}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select preset" />
                </SelectTrigger>
                <SelectContent>
                  {COMPRESSION_PRESETS.map(p => (
                    <SelectItem key={p.label} value={p.label}>
                      {p.label} — {p.description}
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom">Custom...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {preset === 'Custom' && (
              <div className="space-y-4 border-t border-border/60 pt-4">
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span>CRF (Constant Rate Factor)</span>
                    <span className="text-xs text-muted-foreground">Lower = better quality, larger file (18-35)</span>
                  </Label>
                  <Input
                    type="number"
                    value={customCRF}
                    onChange={(e) => setCustomCRF(e.target.value)}
                    min={18}
                    max={35}
                    placeholder="23"
                    className="w-24"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Encoding Preset</Label>
                  <Select value={customPreset} onValueChange={(v) => setCustomPreset(v)}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veryfast">Very Fast</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="slower">Slower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Lower CRF = higher quality. Preset affects encoding speed/efficiency tradeoff.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={compressVideo}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Minimize2 className="mr-1.5 h-4 w-4" />
                Compress Video
              </>
            )}
          </Button>
          {file && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              Clear
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Result</Label>
              <div className="flex gap-2">
                {resultBlob && (
                  <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download
                  </Button>
                )}
                {!resultBlob && (
                  <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
                    {copied ? (
                      <>
                        <Check className="mr-1.5 h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            {resultBlob ? (
              <>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="h-5 w-5" />
                    <span>Compression complete! {file ? formatBytes(file.size) + ' → ' + formatBytes(resultBlob.size) : formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
                  Download Compressed Video
                </Button>
              </>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}