'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2, Music, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';
import { formatBytes } from '@/lib/format-utils';

interface AudioFormat {
  value: string;
  label: string;
  mimeType: string;
  codec: string;
  extension: string;
}

const AUDIO_FORMATS: AudioFormat[] = [
  { value: 'mp3', label: 'MP3', mimeType: 'audio/mpeg', codec: 'libmp3lame', extension: 'mp3' },
  { value: 'aac', label: 'AAC (M4A)', mimeType: 'audio/mp4', codec: 'aac', extension: 'm4a' },
  { value: 'wav', label: 'WAV (Uncompressed)', mimeType: 'audio/wav', codec: 'pcm_s16le', extension: 'wav' },
  { value: 'flac', label: 'FLAC (Lossless)', mimeType: 'audio/flac', codec: 'flac', extension: 'flac' },
  { value: 'opus', label: 'Opus', mimeType: 'audio/opus', codec: 'libopus', extension: 'opus' },
  { value: 'ogg', label: 'OGG Vorbis', mimeType: 'audio/ogg', codec: 'libvorbis', extension: 'ogg' },
];

export function AudioConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);
  const [outputFormat, setOutputFormat] = React.useState('mp3');
  const [bitrate, setBitrate] = React.useState('192k');
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (!f.type.startsWith('audio/')) {
      toast.error('Please select a valid audio file.');
      return;
    }
    setFile(f);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);

    const url = URL.createObjectURL(f);
    if (audioRef.current) {
      audioRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function getSelectedFormat(): AudioFormat {
    return AUDIO_FORMATS.find(f => f.value === outputFormat) || AUDIO_FORMATS[0];
  }

  async function convertAudio() {
    if (!file) {
      toast.error('Please upload an audio file first.');
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

      const codec = fmt.codec;
      const ext = fmt.extension;
      const mimeType = fmt.mimeType;

      const output = await runFFmpeg(
        [
          '-i', 'input.mp3',
          '-c:a', codec,
          '-b:a', bitrate,
          `output.${ext}`
        ],
        [{ name: 'input.mp3', data: file }],
        `output.${ext}`
      );

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: getSelectedFormat().mimeType });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! Audio converted to ${getSelectedFormat().label}.`);
      toast.success('Audio converted!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to convert audio.');
      setStatus(null);
      toast.error('Failed to convert audio.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const fmt = AUDIO_FORMATS.find(f => f.value === outputFormat);
    const ext = fmt?.extension || 'mp3';
    const name = file?.name.replace(/\.[^.]+$/, '') + `.${ext}` || `audio.${ext}`;
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
    if (audioRef.current) {
      revokeObjectUrl(audioRef.current.src);
      audioRef.current.src = '';
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
            accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/flac"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <FileAudio className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop an audio file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP3, WAV, OGG, M4A, FLAC</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileAudio className="h-5 w-5 text-muted-foreground" />
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

        {/* Audio Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Audio Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Output Format</Label>
              <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIO_FORMATS.map(f => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm font-medium">
                <span>Bitrate</span>
                <span className="text-xs text-muted-foreground">{bitrate}</span>
              </Label>
              <Select value={bitrate} onValueChange={(v) => setBitrate(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select bitrate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="64k">64 kbps</SelectItem>
                  <SelectItem value="128k">128 kbps</SelectItem>
                  <SelectItem value="192k">192 kbps</SelectItem>
                  <SelectItem value="256k">256 kbps</SelectItem>
                  <SelectItem value="320k">320 kbps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              The audio will be re-encoded to the selected format and bitrate.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={convertAudio}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Music className="mr-1.5 h-4 w-4" />
                Convert Audio
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
                    <Volume2 className="h-5 w-5" />
                    <span>Audio converted! {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  Download Audio
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