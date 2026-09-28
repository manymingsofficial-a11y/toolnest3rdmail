'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Scissors, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { runFFmpeg, revokeObjectUrl, fetchFile, getFFmpeg } from '@/lib/ffmpeg';

interface CutSegment {
  id: number;
  start: number;
  end: number;
}

export function VideoCutter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [segments, setSegments] = React.useState<CutSegment[]>([{ id: 1, start: 0, end: 0 }]);
  const [duration, setDuration] = React.useState(0);
  const [nextId, setNextId] = React.useState(2);
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
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current!.duration);
        setSegments([{ id: 1, start: 0, end: videoRef.current!.duration }]);
        setNextId(2);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function addSegment() {
    if (duration <= 0) return;
    setSegments([...segments, { id: nextId, start: 0, end: duration }]);
    setNextId(nextId + 1);
  }

  function removeSegment(id: number) {
    if (segments.length <= 1) {
      toast.error('At least one segment is required.');
      return;
    }
    setSegments(segments.filter(s => s.id !== id));
  }

  function updateSegment(id: number, start: number, end: number) {
    setSegments(segments.map(s => s.id === id ? { ...s, start, end } : s));
  }

  function validateSegments(): boolean {
    for (const seg of segments) {
      if (seg.start >= seg.end) {
        toast.error(`Segment ${segments.indexOf(seg) + 1}: Start must be before end.`);
        return false;
      }
      if (seg.start < 0 || seg.end > duration) {
        toast.error(`Segment ${segments.indexOf(seg) + 1}: Times out of bounds.`);
        return false;
      }
    }
    // Check for overlaps
    const sorted = [...segments].sort((a, b) => a.start - b.start);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].end > sorted[i + 1].start) {
        toast.error('Segments cannot overlap.');
        return false;
      }
    }
    return true;
  }

  async function cutVideo() {
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
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const ffmpeg = await getFFmpeg();
      const sortedSegments = [...segments].sort((a, b) => a.start - b.start);

      // Write input file
      const inputData = file instanceof File ? await fetchFile(file) : file;
      ffmpeg.writeFile('input.mp4', inputData as Uint8Array);

      // Extract each segment
      const segmentBlobs: Blob[] = [];
      for (let i = 0; i < sortedSegments.length; i++) {
        const seg = sortedSegments[i];
        const segDuration = seg.end - seg.start;
        setStatus(`Extracting segment ${i + 1} of ${sortedSegments.length}...`);
        setProgress(30 + Math.floor((i / sortedSegments.length) * 60));

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
        segmentBlobs.push(new Blob([segmentBytes], { type: 'video/mp4' }));

        // Clean up segment file
        try { ffmpeg.deleteFile(`segment_${i}.mp4`); } catch {}
      }

      setProgress(95);
      setStatus('Merging segments...');

      // Create concat file
      const concatContent = sortedSegments.map((_, i) => `file 'segment_${i}.mp4'`).join('\n');
      ffmpeg.writeFile('concat.txt', new TextEncoder().encode(concatContent));

      // Re-write segment files for concat
      for (let i = 0; i < segmentBlobs.length; i++) {
        const arrayBuffer = await segmentBlobs[i].arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        ffmpeg.writeFile(`segment_${i}.mp4`, data);
      }

      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c', 'copy',
        'output.mp4'
      ]);

      const outputData = await ffmpeg.readFile('output.mp4');
      const outputBytes = outputData instanceof ArrayBuffer ? new Uint8Array(outputData) : outputData;
      const blob = new Blob([outputBytes], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! ${sortedSegments.length} segments merged.`);
      toast.success('Video cut and merged!');

      // Clean up
      try { ffmpeg.deleteFile('input.mp4'); } catch {}
      try { ffmpeg.deleteFile('concat.txt'); } catch {}
      try { ffmpeg.deleteFile('output.mp4'); } catch {}
      for (let i = 0; i < sortedSegments.length; i++) {
        try { ffmpeg.deleteFile(`segment_${i}.mp4`); } catch {}
      }

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to cut video.');
      setStatus(null);
      toast.error('Failed to cut video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_cut.mp4' || 'cut.mp4';
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
    setSegments([{ id: 1, start: 0, end: 0 }]);
    setNextId(2);
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
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 transition-transform group-hover:scale-110">
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
                Video to cut
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Segments to Keep
              </h3>
              <Button
                onClick={addSegment}
                variant="outline"
                size="sm"
                disabled={duration <= 0}
                className="rounded-xl"
              >
                <Plus className="mr-1.5 h-4 w-4" />Add Segment
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {segments.map((seg, idx) => (
                <div key={seg.id} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Segment {idx + 1}</span>
                    {segments.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSegment(seg.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        value={seg.start}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= 0 && val < seg.end) updateSegment(seg.id, val, seg.end);
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
                          if (val > seg.start && val <= duration) updateSegment(seg.id, seg.start, val);
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
                    <Slider
                      value={[seg.start, seg.end]}
                      onValueChange={(v) => updateSegment(seg.id, v[0], v[1])}
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
                </div>
              ))}
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
            onClick={cutVideo}
            disabled={processing || !file || segments.length === 0}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Cut & Merge Video'
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
                <video
                  src={resultUrl}
                  className="max-h-[280px] w-auto rounded-lg"
                  controls
                />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <Scissors className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload a video and define segments</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Cut video ready! {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
                </div>
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download MP4
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
