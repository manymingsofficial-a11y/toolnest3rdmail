'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2, Scissors, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, fetchFile } from '@/lib/ffmpeg';
import { formatBytes, formatTime } from '@/lib/format-utils';

interface CutSegment {
  id: number;
  start: number;
  end: number;
}

export function AudioCutter() {
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
        setSegments([{ id: 1, start: 0, end: audioRef.current!.duration }]);
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
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
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
    const sorted = [...segments].sort((a, b) => a.start - b.start);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].end > sorted[i + 1].start) {
        toast.error('Segments cannot overlap.');
        return false;
      }
    }
    return true;
  }

  async function cutAudio() {
    if (!file) {
      toast.error('Please upload an audio file first.');
      return;
    }
    if (duration <= 0) {
      toast.error('Could not determine audio duration.');
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
      const ffmpeg = await (await import('@/lib/ffmpeg')).getFFmpeg();
      const sortedSegments = [...segments].sort((a, b) => a.start - b.start);

      // Write input file
      const inputData = file instanceof File ? await (await import('@/lib/ffmpeg')).fetchFile(file) : file;
      ffmpeg.writeFile('input.mp3', inputData);

      // Extract each segment
      const segmentBlobs: Blob[] = [];
      for (let i = 0; i < sortedSegments.length; i++) {
        const seg = sortedSegments[i];
        const segDuration = seg.end - seg.start;
        setStatus(`Extracting segment ${i + 1} of ${sortedSegments.length}...`);
        setProgress(20 + Math.floor((i / sortedSegments.length) * 60));

        await ffmpeg.exec([
          '-ss', String(seg.start),
          '-t', String(segDuration),
          '-i', 'input.mp3',
          '-c:a', 'copy',
          `segment_${i}.mp3`
        ]);

        const data = await ffmpeg.readFile(`segment_${i}.mp3`);
        segmentBlobs.push(new Blob([data], { type: 'audio/mpeg' }));

        // Clean up segment file
        try { ffmpeg.deleteFile(`segment_${i}.mp3`); } catch {}
      }

      setProgress(95);
      setStatus('Merging segments...');

      // Create concat file
      const concatContent = sortedSegments.map((_, i) => `file 'segment_${i}.mp3'`).join('\n');
      ffmpeg.writeFile('concat.txt', new TextEncoder().encode(concatContent));

      // Re-write segment files for concat
      for (let i = 0; i < segmentBlobs.length; i++) {
        const data = new Uint8Array(await segmentBlobs[i].arrayBuffer());
        ffmpeg.writeFile(`segment_${i}.mp3`, data);
      }

      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c', 'copy',
        'output.mp3'
      ]);

      const outputData = await ffmpeg.readFile('output.mp3');
      const blob = new Blob([outputData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! ${sortedSegments.length} segments merged.`);
      toast.success('Audio cut and merged!');

      // Clean up
      try { ffmpeg.deleteFile('input.mp3'); } catch {}
      try { ffmpeg.deleteFile('concat.txt'); } catch {}
      try { ffmpeg.deleteFile('output.mp3'); } catch {}
      for (let i = 0; i < sortedSegments.length; i++) {
        try { ffmpeg.deleteFile(`segment_${i}.mp3`); } catch {}
      }

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to cut audio.');
      setStatus(null);
      toast.error('Failed to cut audio.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_cut.mp3' || 'cut.mp3';
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    if (audioRef.current) {
      audioRef.current.src = '';
    }
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
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 transition-transform group-hover:scale-110">
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
                Audio to cut
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
            onClick={cutAudio}
            disabled={processing || !file || segments.length === 0}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Scissors className="mr-1.5 h-4 w-4" />
                Cut & Merge Audio
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
            Result
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
                <p className="mt-2">Upload audio and define segments</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Cut audio ready! {formatBytes(resultBlob.size)}</span>
                </div>
              </div>
            ) : null}
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download MP3
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}