'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';
import { formatBytes } from '@/lib/format-utils';

export function AudioReverser() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [outputFormat, setOutputFormat] = React.useState('mp3');
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

  async function reverseAudio() {
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
      setStatus('Reversing audio...');
      setProgress(20);

      const ext = outputFormat;
      const codec = outputFormat === 'mp3' ? 'libmp3lame' :
                    outputFormat === 'wav' ? 'pcm_s16le' :
                    outputFormat === 'aac' ? 'aac' :
                    outputFormat === 'flac' ? 'flac' : 'libopus';

      const output = await runFFmpeg(
        [
          '-i', 'input.mp3',
          '-af', 'areverse',
          '-c:a', codec,
          `output.${ext}`
        ],
        [{ name: 'input.mp3', data: file }],
        `output.${ext}`
      );

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: `audio/${ext}` });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus('Done! Audio reversed.');
      toast.success('Audio reversed!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to reverse audio.');
      setStatus(null);
      toast.error('Failed to reverse audio. Note: Reversal requires full re-encoding.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + `_reversed.${outputFormat}` || `reversed.${outputFormat}`;
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

        {/* Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Output Format</Label>
              <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="wav">WAV (Lossless)</SelectItem>
                  <SelectItem value="aac">AAC (M4A)</SelectItem>
                  <SelectItem value="flac">FLAC (Lossless)</SelectItem>
                  <SelectItem value="opus">Opus</SelectItem>
                  <SelectItem value="ogg">OGG Vorbis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              The audio will be reversed using FFmpeg&apos;s areverse filter. This requires full re-encoding.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={reverseAudio}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-pink-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Reversing...
              </>
            ) : (
              <>
                <RotateCcw className="mr-1.5 h-4 w-4" />
                Reverse Audio
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

        {(resultBlob || resultUrl) && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
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
                    <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Processing complete! File size: {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                  Download Reversed Audio
                </Button>
              </>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
                {resultUrl || 'Processing...'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}