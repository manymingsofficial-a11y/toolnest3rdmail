'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';
import { formatBytes } from '@/lib/format-utils';

interface OutputFormat {
  value: string;
  label: string;
  mimeType: string;
  codecs: string;
}

const OUTPUT_FORMATS: OutputFormat[] = [
  { value: 'mp4', label: 'MP4 (H.264)', mimeType: 'video/mp4', codecs: 'libx264' },
  { value: 'webm', label: 'WebM (VP9)', mimeType: 'video/webm', codecs: 'libvpx-vp9' },
  { value: 'mov', label: 'MOV (H.264)', mimeType: 'video/quicktime', codecs: 'libx264' },
  { value: 'avi', label: 'AVI (MPEG-4)', mimeType: 'video/x-msvideo', codecs: 'mpeg4' },
];

export function VideoConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [outputFormat, setOutputFormat] = React.useState('mp4');
  const [videoCodec, setVideoCodec] = React.useState('libx264');
  const [audioCodec, setAudioCodec] = React.useState('aac');
  const [copied, setCopied] = React.useState(false);
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

  function getSelectedFormat(): OutputFormat {
    return OUTPUT_FORMATS.find(f => f.value === outputFormat) || OUTPUT_FORMATS[0];
  }

  function handleFormatChange(format: string) {
    setOutputFormat(format);
    const fmt = OUTPUT_FORMATS.find(f => f.value === format);
    if (fmt) {
      setVideoCodec(fmt.codecs);
      setAudioCodec(format === 'webm' ? 'libopus' : 'aac');
    }
  }

  async function convertVideo() {
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
      const fmt = getSelectedFormat();
      setStatus(`Converting to ${fmt.label}...`);
      setProgress(20);

      const outputExt = outputFormat;
      const outputMime = fmt.mimeType;

      const output = await runFFmpeg(
        [
          '-i', 'input.mp4',
          '-c:v', videoCodec,
          '-c:a', audioCodec,
          '-movflags', '+faststart',
          `output.${outputExt}`
        ],
        [{ name: 'input.mp4', data: file }],
        `output.${outputExt}`
      );

      setProgress(80);
      setStatus('Finalizing...');

      const mimeType = fmt.mimeType;
      const blob = new Blob([output], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! Converted to ${fmt.label}.`);
      toast.success('Video converted!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to convert video.');
      setStatus(null);
      toast.error('Failed to convert video.');
    } finally {
      setProcessing(false);
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const fmt = OUTPUT_FORMATS.find(f => f.value === outputFormat);
    const ext = fmt?.value || 'mp4';
    const name = file?.name.replace(/\.[^.]+$/, '') + `.${ext}` || `converted.${ext}`;
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

        {/* Conversion Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Conversion Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Output Format</Label>
              <Select value={outputFormat} onValueChange={handleFormatChange}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {OUTPUT_FORMATS.map(f => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Video Codec</Label>
              <Select value={videoCodec} onValueChange={(v) => setVideoCodec(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="libx264">H.264 (libx264)</SelectItem>
                  <SelectItem value="libvpx-vp9">VP9 (libvpx-vp9)</SelectItem>
                  <SelectItem value="mpeg4">MPEG-4</SelectItem>
                  <SelectItem value="libx265">H.265/HEVC (libx265)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Audio Codec</Label>
              <Select value={audioCodec} onValueChange={(v) => setAudioCodec(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aac">AAC</SelectItem>
                  <SelectItem value="libopus">Opus</SelectItem>
                  <SelectItem value="libmp3lame">MP3</SelectItem>
                  <SelectItem value="copy">Copy (no re-encode)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Not all codec/container combinations are valid. MP4 works best with H.264 + AAC. WebM works best with VP9 + Opus.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={convertVideo}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ArrowRightLeft className="mr-1.5 h-4 w-4" />
                Convert Video
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
                    <span>Conversion complete! {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white">
                  Download Converted Video
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