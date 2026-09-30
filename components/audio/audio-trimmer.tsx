'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2, Scissors, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function AudioTrimmer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
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
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
        setStartTime(0);
        setEndTime(audioRef.current!.duration);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function trimAudio() {
    if (!file) {
      toast.error('Please upload an audio file first.');
      return;
    }
    if (duration <= 0) {
      toast.error('Could not determine audio duration.');
      return;
    }
    if (startTime >= endTime) {
      toast.error('Start time must be before end time.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Trimming audio...');
      setProgress(30);

      const trimDuration = endTime - startTime;
      const ext = outputFormat;
      const codec = outputFormat === 'mp3' ? 'libmp3lame' : 
                    outputFormat === 'wav' ? 'pcm_s16le' :
                    outputFormat === 'aac' ? 'aac' :
                    outputFormat === 'flac' ? 'flac' : 'libopus';

      const output = await runFFmpeg(
        [
          '-ss', String(startTime),
          '-t', String(trimDuration),
          '-i', 'input.mp3',
          '-c:a', codec,
          outputFormat === 'mp3' ? '-b:a' : '-c:a',
          outputFormat === 'mp3' ? '192k' : 'copy',
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
      setStatus('Done! Audio trimmed.');
      toast.success('Audio trimmed!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to trim audio.');
      setStatus(null);
      toast.error('Failed to trim audio.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const ext = outputFormat;
    const name = file?.name.replace(/\.[^.]+$/, '') + `_trimmed.${ext}` || `trimmed.${ext}`;
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
    setStartTime(0);
    setEndTime(0);
    setDuration(0);
    if (inputRef.current) inputRef.current.value = '';
    if (audioRef.current) {
      revokeObjectUrl(audioRef.current.src);
      audioRef.current.src = '';
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={() => {}}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/flac"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25 transition-transform group-hover:scale-110">
            <Scissors className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop an audio file here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP3, WAV, OGG, M4A, FLAC
          </p>
        </div>

        {file && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Audio to trim
              </h3>
              <span className="text-xs text-muted-foreground">
                {file.name} · {formatBytes(file.size)}
              </span>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/30 p-4">
              <audio
                ref={audioRef}
                className="w-full"
                controls
                crossOrigin="anonymous"
              />
            </div>
          </div>
        )}

        {file && (
          <div className="rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Trim Range
            </h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Start: {formatTime(startTime)}</span>
                  <span className="text-xs text-muted-foreground">End: {formatTime(endTime)}</span>
                </label>
                <Slider
                  value={[startTime, endTime]}
                  onValueChange={(v) => { setStartTime(v[0]); setEndTime(v[1]); }}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  disabled={duration <= 0}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0s</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(Math.max(0, Math.min(Number(e.target.value), endTime)))}
                  min={0}
                  max={endTime}
                  step={0.1}
                  className="w-24"
                  placeholder="Start"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  value={endTime}
                  onChange={(e) => setEndTime(Math.min(duration, Math.max(Number(e.target.value), startTime)))}
                  min={startTime}
                  max={duration}
                  step={0.1}
                  className="w-24"
                  placeholder="End"
                />
                <span className="text-xs text-muted-foreground">Duration: {formatTime(endTime - startTime)}</span>
              </div>
            </div>
          </div>
        )}

        {file && (
          <div className="rounded-2xl glass-card p-4">
            <Label className="text-sm font-medium">Output Format</Label>
            <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v)}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="wav">WAV</SelectItem>
                <SelectItem value="aac">AAC (M4A)</SelectItem>
                <SelectItem value="flac">FLAC</SelectItem>
                <SelectItem value="opus">Opus</SelectItem>
                <SelectItem value="ogg">OGG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={trimAudio}
            disabled={processing || !file || startTime >= endTime}
            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25 hover:from-teal-600 hover:to-cyan-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Trimming...
              </>
            ) : (
              <>
                <Scissors className="mr-1.5 h-4 w-4" />
                Trim Audio
              </>
            )}
          </Button>
          {file && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Preview
          </h3>
          <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {resultUrl ? (
              <>
                <audio
                  src={resultUrl}
                  className="w-full"
                  controls
                />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <Scissors className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload audio and set trim range</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Trimmed audio ready! {formatBytes(resultBlob.size)}</span>
                </div>
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={handleCopy}
                disabled={!resultUrl}
                variant="outline"
                className="rounded-xl"
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-4 w-4" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}