'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2, Film, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg } from '@/lib/ffmpeg';

interface AudioFile {
  file: File;
  id: number;
  name: string;
  size: number;
}

export function AudioMerger() {
  const [files, setFiles] = React.useState<AudioFile[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [outputFormat, setOutputFormat] = React.useState('mp3');
  const [nextId, setNextId] = React.useState(1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList).filter((f) => f.type.startsWith('audio/'));
    if (arr.length === 0) {
      toast.error('Please select valid audio files.');
      return;
    }
    const newFiles: AudioFile[] = arr.map(f => ({
      file: f,
      id: nextId,
      name: f.name,
      size: f.size
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setNextId(prev => prev + arr.length);
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

  async function mergeAudio() {
    if (files.length < 2) {
      toast.error('Please add at least 2 audio files to merge.');
      return;
    }

    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const ffmpeg = await (await import('@/lib/ffmpeg')).getFFmpeg();

      // Write all input files
      for (let i = 0; i < files.length; i++) {
        const inputData = await (await import('@/lib/ffmpeg')).fetchFile(files[i].file);
        ffmpeg.writeFile(`input_${i}.${outputFormat}`, inputData);
      }

      setStatus(`Merging ${files.length} audio file(s)...`);
      setProgress(20);

      // Create concat file
      const concatContent = files.map((_, i) => `file 'input_${i}.${outputFormat}'`).join('\n');
      ffmpeg.writeFile('concat.txt', new TextEncoder().encode(concatContent));

      const codec = outputFormat === 'mp3' ? 'libmp3lame' :
                    outputFormat === 'wav' ? 'pcm_s16le' :
                    outputFormat === 'aac' ? 'aac' :
                    outputFormat === 'flac' ? 'flac' : 'libopus';

      await ffmpeg.exec([
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat.txt',
        '-c:a', codec,
        `output.${outputFormat}`
      ]);

      setProgress(80);
      setStatus('Finalizing...');

      const outputData = await ffmpeg.readFile(`output.${outputFormat}`);
      const blob = new Blob([outputData], { type: `audio/${outputFormat}` });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! ${files.length} audio file(s) merged.`);
      toast.success('Audio files merged!');

      // Clean up
      for (let i = 0; i < files.length; i++) {
        try { ffmpeg.deleteFile(`input_${i}.${outputFormat}`); } catch {}
      }
      try { ffmpeg.deleteFile('concat.txt'); } catch {}
      try { ffmpeg.deleteFile(`output.${outputFormat}`); } catch {}

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to merge audio.');
      setStatus(null);
      toast.error('Failed to merge audio.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = `merged_audio.${outputFormat}`;
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
            accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/flac"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <span className="h-12 w-12 text-muted-foreground/50">🎵</span>
          <p className="mt-3 text-sm font-medium">
            Drag & drop audio files or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP3, WAV, OGG, M4A, FLAC — Add 2+ files to merge</p>
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
                    <span className="h-5 w-5 text-muted-foreground">🎵</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
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
                      <span className="h-4 w-4">↑</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveDown(idx)}
                      disabled={idx === files.length - 1}
                      className="h-8 w-8"
                    >
                      <span className="h-4 w-4">↓</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(f.id)}
                      className="text-destructive hover:text-destructive h-8 w-8"
                    >
                      <span className="h-4 w-4">×</span>
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
            accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/flac"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
            className="rounded-xl w-full"
          >
            <span className="mr-1.5 h-4 w-4">+</span>Add More Files
          </Button>
        </div>

        {/* Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Output Settings
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
                  <SelectItem value="wav">WAV</SelectItem>
                  <SelectItem value="aac">AAC (M4A)</SelectItem>
                  <SelectItem value="flac">FLAC</SelectItem>
                  <SelectItem value="opus">Opus</SelectItem>
                  <SelectItem value="ogg">OGG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={mergeAudio}
            disabled={processing || files.length < 2}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <span className="mr-1.5 h-4 w-4">🎵</span>
                Merge Audio
              </>
            )}
          </Button>
          {files.length > 0 && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              <span className="mr-1.5 h-4 w-4">🗑</span>Clear All
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {resultBlob ? (
              <React.Fragment>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Processing complete! File size: {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  Download Merged Audio
                </Button>
              </React.Fragment>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
                {resultUrl || 'Processing...'}
              </div>
            )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}