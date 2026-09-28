'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Film, Plus, ArrowUp, ArrowDown, X } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { runFFmpeg, revokeObjectUrl, fetchFile, getFFmpeg } from '@/lib/ffmpeg';

interface VideoFile {
  file: File;
  id: number;
  name: string;
  size: number;
}

export function VideoMerger() {
  const [files, setFiles] = React.useState<VideoFile[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const nextIdRef = React.useRef(1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList).filter((f) => f.type.startsWith('video/'));
    if (arr.length === 0) {
      toast.error('Please select valid video files.');
      return;
    }
    const newFiles: VideoFile[] = arr.map(f => ({
      file: f,
      id: nextIdRef.current++,
      name: f.name,
      size: f.size
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function removeFile(id: number) {
    setFiles(prev => prev.filter(f => f.id !== id));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
      return newFiles;
    });
  }

  function moveDown(index: number) {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const newFiles = [...prev];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      return newFiles;
    });
  }

  async function mergeVideos() {
    if (files.length < 2) {
      toast.error('Please add at least 2 video files to merge.');
      return;
    }

    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const ffmpeg = await getFFmpeg();

      // Write all input files
      for (let i = 0; i < files.length; i++) {
        const inputData = files[i].file instanceof File
          ? await fetchFile(files[i].file)
          : files[i].file;
        ffmpeg.writeFile(`input_${i}.mp4`, inputData as Uint8Array);
      }

      setStatus(`Merging ${files.length} video(s)...`);
      setProgress(20);

      // Create concat file
      const concatContent = files.map((_, i) => `file 'input_${i}.mp4'`).join('\n');
      ffmpeg.writeFile('concat.txt', new TextEncoder().encode(concatContent));

      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c', 'copy',
        'output.mp4'
      ]);

      setProgress(80);
      setStatus('Finalizing...');

      const outputData = await ffmpeg.readFile('output.mp4');
      const outputBytes = outputData instanceof ArrayBuffer ? new Uint8Array(outputData) : outputData;
      const blob = new Blob([outputBytes], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! ${files.length} video(s) merged.`);
      toast.success('Videos merged!');

      // Clean up
      for (let i = 0; i < files.length; i++) {
        try { ffmpeg.deleteFile(`input_${i}.mp4`); } catch {}
      }
      try { ffmpeg.deleteFile('concat.txt'); } catch {}
      try { ffmpeg.deleteFile('output.mp4'); } catch {}

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to merge videos.');
      setStatus(null);
      toast.error('Failed to merge videos.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = 'merged_video.mp4';
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
    setFiles([]);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
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
            files.length > 0 ? 'border-border/60' : 'border-border/60 hover:border-brand-purple/50'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <Film className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop video files or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP4, WebM — Add 2+ files to merge</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Files to Merge ({files.length})
            </h3>
            <div className="rounded-lg border border-border/60 bg-muted/30 divide-y divide-border/30">
              {files.map((f, idx) => (
                <div key={f.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 text-muted-foreground">🎬</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{Math.round(f.size / 1024)} KB</p>
                    </div>
                    <span className="text-muted-foreground px-2">{idx + 1}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="h-8 w-8"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveDown(idx)}
                      disabled={idx === files.length - 1}
                      className="h-8 w-8"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(f.id)}
                      className="text-destructive hover:text-destructive h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add more files */}
        <div className="mt-4">
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
            className="rounded-xl w-full"
          >
            <Plus className="mr-1.5 h-4 w-4" />Add More Files
          </Button>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={mergeVideos}
            disabled={processing || files.length < 2}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <Film className="mr-1.5 h-4 w-4" />
                Merge Videos
              </>
            )}
          </Button>
          {files.length > 0 && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              <Trash2 className="mr-1.5 h-4 w-4" />Clear All
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {resultBlob && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                  <Download className="mr-1.5 h-4 w-4" />
                  Download
                </Button>
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
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </span>
                <span>Processing complete! File size: {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
              Download Merged Video
            </Button>
          </div>
        )}

        {resultUrl && !resultBlob && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <div className="flex gap-2">
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
              </div>
            </div>
            <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
              {resultUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}