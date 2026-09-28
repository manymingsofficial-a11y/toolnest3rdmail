'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Scissors, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { runFFmpeg, revokeObjectUrl, fetchFile, getFFmpeg } from '@/lib/ffmpeg';
import { Slider } from '@/components/ui/slider';

interface SplitMode {
  type: 'equal' | 'custom';
  count?: number;
  segments?: { start: number; end: number }[];
}

export function VideoSplitter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrls, setResultUrls] = React.useState<string[]>([]);
  const [resultBlobs, setResultBlobs] = React.useState<Blob[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [splitMode, setSplitMode] = React.useState<SplitMode>({ type: 'equal', count: 2 });
  const [duration, setDuration] = React.useState(0);
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
    setResultUrls([]);
    setResultBlobs([]);
    setError(null);
    setStatus(null);
    setProgress(0);

    const url = URL.createObjectURL(f);
    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current!.duration);
        if (splitMode.type === 'equal') {
          setSplitMode({ ...splitMode, count: Math.max(2, splitMode.count || 2) });
        } else {
          const segmentDuration = videoRef.current!.duration / 2;
          setSplitMode({
            type: 'custom',
            segments: [
              { start: 0, end: segmentDuration },
              { start: segmentDuration, end: videoRef.current!.duration }
            ]
          });
        }
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function addCustomSegment() {
    if (duration <= 0) return;
    const newSegments = splitMode.type === 'custom' && splitMode.segments
      ? [...splitMode.segments, { start: 0, end: 0 }]
      : [{ start: 0, end: 0 }];
    setSplitMode({ type: 'custom', segments: newSegments });
  }

  function removeCustomSegment(index: number) {
    if (splitMode.type === 'custom' && splitMode.segments && splitMode.segments.length > 1) {
      setSplitMode({ ...splitMode, segments: splitMode.segments.filter((_, i) => i !== index) });
    }
  }

  function updateCustomSegment(index: number, start: number, end: number) {
    if (splitMode.type === 'custom' && splitMode.segments) {
      const newSegments = [...splitMode.segments];
      newSegments[index] = { start, end };
      setSplitMode({ ...splitMode, segments: newSegments });
    }
  }

  function validateSegments(): boolean {
    if (splitMode.type === 'equal') {
      if (!splitMode.count || splitMode.count < 2) {
        toast.error('Please specify at least 2 segments.');
        return false;
      }
      if (splitMode.count > 100) {
        toast.error('Maximum 100 segments allowed.');
        return false;
      }
    } else if (splitMode.type === 'custom' && splitMode.segments) {
      for (let i = 0; i < splitMode.segments.length; i++) {
        const seg = splitMode.segments[i];
        if (seg.start >= seg.end) {
          toast.error(`Segment ${i + 1}: Start must be before end.`);
          return false;
        }
        if (seg.start < 0 || seg.end > duration) {
          toast.error(`Segment ${i + 1}: Times out of bounds.`);
          return false;
        }
      }
      // Check for overlaps
      const sorted = [...splitMode.segments].map((s, i) => ({ ...s, origIndex: i })).sort((a, b) => a.start - b.start);
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].end > sorted[i + 1].start) {
          toast.error('Segments cannot overlap.');
          return false;
        }
      }
    }
    return true;
  }

  async function splitVideo() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    if (duration <= 0) {
      toast.error('Could not determine video duration.');
      return;
    }
    if (!validateSegments()) return;

    setProcessing(true);
    setError(null);
    setResultUrls([]);
    setResultBlobs([]);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const ffmpeg = await getFFmpeg();

      // Write input file
      const inputData = file instanceof File ? await fetchFile(file) : file;
      ffmpeg.writeFile('input.mp4', inputData as Uint8Array);

      const segments = splitMode.type === 'equal'
        ? Array.from({ length: splitMode.count! }, (_, i) => {
            const segDuration = duration / splitMode.count!;
            return { start: i * segDuration, end: (i + 1) * segDuration };
          })
        : splitMode.segments || [];

      setStatus(`Splitting into ${segments.length} segment(s)...`);
      setProgress(20);

      const segmentBlobs: Blob[] = [];
      const segmentUrls: string[] = [];

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const segDuration = seg.end - seg.start;
        setStatus(`Extracting segment ${i + 1} of ${segments.length}...`);
        setProgress(20 + Math.floor((i / segments.length) * 70));

        await ffmpeg.exec([
          '-ss', String(seg.start),
          '-t', String(segDuration),
          '-i', 'input.mp4',
          '-c:v', 'copy',
          '-c:a', 'copy',
          '-avoid_negative_ts', 'make_zero',
          `segment_${i}.mp4`
        ]);

        const data = await ffmpeg.readFile(`segment_${i}.mp4`);
        const segmentBytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
        const blob = new Blob([segmentBytes], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        segmentBlobs.push(blob);
        segmentUrls.push(url);

        // Clean up segment file
        try { ffmpeg.deleteFile(`segment_${i}.mp4`); } catch {}
      }

      setProgress(95);
      setStatus('Finalizing...');

      setResultBlobs(segmentBlobs);
      setResultUrls(segmentUrls);
      setProgress(100);
      setStatus(`Done! ${segments.length} segment(s) created.`);
      toast.success(`Video split into ${segments.length} part(s)!`);

      // Clean up
      try { ffmpeg.deleteFile('input.mp4'); } catch {}

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to split video.');
      setStatus(null);
      toast.error('Failed to split video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload(index: number) {
    if (!resultBlobs[index] || !resultUrls[index]) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + `_part${index + 1}.mp4` || `part${index + 1}.mp4`;
    const a = document.createElement('a');
    a.href = resultUrls[index];
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    revokeObjectUrl(resultUrls[index]);
    toast.success(`Part ${index + 1} downloaded!`);
  }

  function handleCopy(index: number) {
    if (!resultUrls[index]) return;
    navigator.clipboard.writeText(resultUrls[index]).then(() => {
      setCopied(true);
      toast.success('URL copied!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFile(null);
    setResultUrls([]);
    setResultBlobs([]);
    setError(null);
    setStatus(null);
    setProgress(0);
    setSplitMode({ type: 'equal', count: 2 });
    setDuration(0);
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) {
      revokeObjectUrl(videoRef.current.src);
      videoRef.current.src = '';
    }
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
            accept="video/mp4,video/webm"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 transition-transform group-hover:scale-110">
            <Scissors className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop a video file here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP4, WebM
          </p>
        </div>

        {file && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Video to split
              </h3>
              <span className="text-xs text-muted-foreground">
                {file.name} · {Math.round(file.size / 1024)} KB
              </span>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/30 p-4">
              <video
                ref={videoRef}
                className="w-full max-h-[300px] rounded-lg"
                controls
                crossOrigin="anonymous"
              />
            </div>
          </div>
        )}

        {file && (
          <div className="rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Split Mode
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex gap-4">
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="split-mode"
                    checked={splitMode.type === 'equal'}
                    onChange={() => setSplitMode({ type: 'equal', count: splitMode.count || 2 })}
                    className="sr-only"
                  />
                  <span className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                    splitMode.type === 'equal'
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                      : 'border-border/60 hover:border-brand-purple/50'
                  )}>
                    Equal Parts
                  </span>
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="split-mode"
                    checked={splitMode.type === 'custom'}
                    onChange={() => setSplitMode({ type: 'custom', segments: splitMode.segments || [{ start: 0, end: duration }] })}
                    className="sr-only"
                  />
                  <span className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                    splitMode.type === 'custom'
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                      : 'border-border/60 hover:border-brand-purple/50'
                  )}>
                    Custom Segments
                  </span>
                </Label>
              </div>

              {splitMode.type === 'equal' && (
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span>Number of Segments</span>
                    <span className="text-xs text-muted-foreground">Each: ~{splitMode.count ? formatTime(duration / splitMode.count) : '0'}s</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={splitMode.count || 2}
                      onChange={(e) => setSplitMode({ type: 'equal', count: Math.max(2, Math.min(100, Number(e.target.value))) })}
                      min={2}
                      max={100}
                      className="w-24"
                    />
                    <Slider
                      value={[splitMode.count || 2]}
                      onValueChange={(v: number[]) => setSplitMode({ type: 'equal', count: v[0] })}
                      min={2}
                      max={20}
                      step={1}
                    />
                  </div>
                </div>
              )}

              {splitMode.type === 'custom' && splitMode.segments && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Custom Segments</Label>
                    <Button
                      onClick={addCustomSegment}
                      variant="outline"
                      size="sm"
                      disabled={duration <= 0}
                      className="rounded-xl"
                    >
                      <Plus className="mr-1.5 h-4 w-4" />Add Segment
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {splitMode.segments && splitMode.segments.map((seg, idx) => {
                      const segs = splitMode.segments!;
                      return (
                      <div key={idx} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">Segment {idx + 1}</span>
                          {segs.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomSegment(idx)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            value={seg.start}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val >= 0 && val < seg.end) updateCustomSegment(idx, val, seg.end);
                            }}
                            min={0}
                            max={seg.end}
                            step={0.1}
                            className="w-24"
                            placeholder="Start"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="number"
                            value={seg.end}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val > seg.start && val <= duration) updateCustomSegment(idx, seg.start, val);
                            }}
                            min={seg.start}
                            max={duration}
                            step={0.1}
                            className="w-24"
                            placeholder="End"
                          />
                          <span className="text-xs text-muted-foreground">
                            Dur: {formatTime(seg.end - seg.start)}
                          </span>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={splitVideo}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Splitting...
              </>
            ) : (
              'Split Video'
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
            Result
          </h3>
          <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {resultUrls.length > 0 ? (
              <>
                <div className="grid gap-2 max-h-[280px] overflow-y-auto w-full">
                  {resultUrls.map((url, idx) => (
                    <div key={idx} className="rounded-lg border border-border/60 bg-muted/30 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Part {idx + 1}</span>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((resultBlobs[idx]?.size || 0) / 1024)} KB
                        </span>
                      </div>
                      <video
                        src={url}
                        className="w-full max-h-48 rounded"
                        controls
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <Scissors className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload a video and configure split</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlobs.length > 0 ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>{resultBlobs.length} segment(s) ready!</span>
                </div>
              </div>
            ) : null}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  resultBlobs.forEach((blob, i) => {
                    if (blob && resultUrls[i]) {
                      const name = file?.name.replace(/\.[^.]+$/, '') + `_part${i + 1}.mp4` || `part${i + 1}.mp4`;
                      const a = document.createElement('a');
                      a.href = resultUrls[i];
                      a.download = name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }
                  });
                  toast.success('All parts downloaded!');
                }}
                disabled={resultBlobs.length === 0}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}