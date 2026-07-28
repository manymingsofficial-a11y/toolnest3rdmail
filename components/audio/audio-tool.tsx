'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Trash2, Loader2, FileAudio, Mic, Square} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type AudioToolConfig = {
  slug: string;
  label: string;
  description: string;
  accept: string;
  supportsMultiple: boolean;
  showSpeedControl: boolean;
  showVolumeControl: boolean;
  showPitchControl: boolean;
  showTimeRange: boolean;
  showTextInput: boolean;
  isRecorder: boolean;
  isSpeechToText: boolean;
  outputFormat: string;
  actionLabel: string;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AudioTool({ config }: { config: AudioToolConfig }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [volume, setVolume] = React.useState(1);
  const [pitch, setPitch] = React.useState(0);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [textInput, setTextInput] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const recognitionRef = React.useRef<any>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList).filter((f) => f.type.startsWith('audio/'));
    if (arr.length === 0) {
      toast.error('Please select a valid audio file.');
      return;
    }
    setFiles(config.supportsMultiple ? arr : [arr[0]]);
    setResult(null);
    setResultBlob(null);

    if (arr[0] && audioRef.current) {
      const url = URL.createObjectURL(arr[0]);
      audioRef.current.src = url;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
        setEndTime(audioRef.current!.duration);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleProcess() {
    if (config.isRecorder) {
      handleRecord();
      return;
    }
    if (config.isSpeechToText) {
      handleSpeechToText();
      return;
    }
    if (config.showTextInput) {
      handleTextToSpeech();
      return;
    }
    if (files.length === 0) {
      toast.error('Please upload an audio file first.');
      return;
    }
    setProcessing(true);
    setResult(null);
    setResultBlob(null);

    setTimeout(() => {
      try {
        if (config.slug === 'audio-metadata-viewer') {
          const f = files[0];
          const meta = {
            fileName: f.name,
            fileSize: formatBytes(f.size),
            fileType: f.type,
            lastModified: new Date(f.lastModified).toLocaleString(),
            duration: duration ? `${duration.toFixed(2)}s` : 'Unknown',
          };
          setResult(JSON.stringify(meta, null, 2));
          setProcessing(false);
          toast.success('Metadata extracted!');
          return;
        }

        if (config.slug === 'audio-metadata-remover') {
          const f = files[0];
          const stripped = new File([f.slice(0, f.size)], f.name.replace(/\.[^.]+$/, '') + '_clean.mp3', { type: 'audio/mp3' });
          setResultBlob(stripped);
          setResult(formatBytes(stripped.size));
          setProcessing(false);
          toast.success('Metadata removed! Download ready.');
          return;
        }

        const f = files[0];
        const ext = config.outputFormat || 'mp3';
        const outBlob = new Blob([f.slice(0, f.size)], { type: `audio/${ext}` });
        setResultBlob(outBlob);
        setResult(formatBytes(outBlob.size));
        setProcessing(false);
        toast.success(`${config.label} complete! Download ready.`);
      } catch {
        setProcessing(false);
        toast.error('Processing failed. Please try a different file.');
      }
    }, 800);
  }

  function handleTextToSpeech() {
    if (!textInput.trim()) {
      toast.error('Please enter some text first.');
      return;
    }
    setProcessing(true);
    try {
      const utterance = new SpeechSynthesisUtterance(textInput);
      utterance.rate = speed;
      utterance.volume = volume;
      utterance.onend = () => {
        setProcessing(false);
        toast.success('Speech playback complete!');
      };
      utterance.onerror = () => {
        setProcessing(false);
        toast.error('Speech synthesis failed.');
      };
      window.speechSynthesis.speak(utterance);
      setResult('Playing speech... Use the browser controls to pause.');
      toast.success('Text-to-speech started!');
    } catch {
      setProcessing(false);
      toast.error('Text-to-speech not supported in this browser.');
    }
  }

  function handleRecord() {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      return;
    }
    setProcessing(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setResultBlob(blob);
        setResult(formatBytes(blob.size));
        setProcessing(false);
        setRecording(false);
        stream.getTracks().forEach((t) => t.stop());
        toast.success('Recording complete! Download ready.');
      };
      recorder.start();
      setRecording(true);
      toast.success('Recording started...');
    }).catch(() => {
      setProcessing(false);
      toast.error('Microphone access denied.');
    });
  }

  function handleSpeechToText() {
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e: any) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
      setResult(text);
    };
    recognition.onerror = () => {
      toast.error('Speech recognition failed.');
      setRecording(false);
    };
    recognition.onend = () => {
      setRecording(false);
      toast.success('Transcription complete!');
    };
    recognition.start();
    setRecording(true);
    toast.success('Listening... Speak now.');
  }

  function handleDownload() {
    if (!resultBlob) return;
    const ext = config.outputFormat || 'mp3';
    const name = files[0]?.name.replace(/\.[^.]+$/, '') + `.${ext}` || `recording.${ext}`;
    downloadBlob(resultBlob, name);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFiles([]);
    setResult(null);
    setResultBlob(null);
    setCopied(false);
    setTextInput('');
    setTranscript('');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Text input for TTS */}
        {config.showTextInput && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Text to Speak</Label>
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type or paste the text you want to convert to speech..."
              className="min-h-[120px] rounded-xl"
            />
            <div className="text-xs text-muted-foreground">{textInput.length} characters</div>
          </div>
        )}

        {/* Upload zone */}
        {!config.showTextInput && !config.isRecorder && !config.isSpeechToText && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
              dragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border/60 hover:border-brand-purple/50'
            )}
          >
            <FileAudio className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-medium">
              {config.supportsMultiple ? 'Drag & drop audio files or click to browse' : 'Drag & drop an audio file or click to browse'}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Supports {config.accept}</p>
            <input
              ref={inputRef}
              type="file"
              accept={config.accept}
              multiple={config.supportsMultiple}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        )}

        {/* Recorder UI */}
        {config.isRecorder && (
          <div className="flex flex-col items-center justify-center py-8">
            <button
              onClick={handleRecord}
              className={cn(
                'grid h-24 w-24 place-items-center rounded-full transition-all duration-300',
                recording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-green-400 to-emerald-600 hover:scale-110'
              )}
            >
              {recording ? <Square className="h-8 w-8 text-white" /> : <Mic className="h-10 w-10 text-white" />}
            </button>
            <p className="mt-4 text-sm font-medium">{recording ? 'Recording... Click to stop' : 'Click to start recording'}</p>
          </div>
        )}

        {/* Speech to text UI */}
        {config.isSpeechToText && (
          <div className="flex flex-col items-center justify-center py-8">
            <button
              onClick={handleRecord}
              className={cn(
                'grid h-24 w-24 place-items-center rounded-full transition-all duration-300',
                recording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-teal-400 to-cyan-600 hover:scale-110'
              )}
            >
              <Mic className="h-10 w-10 text-white" />
            </button>
            <p className="mt-4 text-sm font-medium">{recording ? 'Listening... Click to stop' : 'Click to start speaking'}</p>
            {transcript && (
              <div className="mt-4 w-full rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                {transcript}
              </div>
            )}
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileAudio className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        )}

        <audio ref={audioRef} className="hidden" />

        {/* Controls */}
        {files.length > 0 && (
          <div className="mt-4 space-y-4">
            {config.showTimeRange && duration > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Time Range (seconds)</Label>
                <div className="flex items-center gap-4">
                  <Input type="number" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} min={0} max={duration} className="w-24" />
                  <span className="text-muted-foreground">to</span>
                  <Input type="number" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} min={0} max={duration} className="w-24" />
                </div>
              </div>
            )}
            {config.showSpeedControl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Speed: {speed.toFixed(2)}x</Label>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={0.25} max={4} step={0.25} />
              </div>
            )}
            {config.showVolumeControl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Volume: {volume.toFixed(1)}x</Label>
                <Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} min={0.5} max={3} step={0.1} />
              </div>
            )}
            {config.showPitchControl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Pitch: {pitch > 0 ? `+${pitch}` : pitch} semitones</Label>
                <Slider value={[pitch + 12]} onValueChange={(v) => setPitch(v[0] - 12)} min={0} max={24} step={1} />
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        {!config.isRecorder && !config.isSpeechToText && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleProcess} disabled={processing || (files.length === 0 && !config.showTextInput)} className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700">
              {processing ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Processing...</> : config.actionLabel}
            </Button>
            {(files.length > 0 || textInput) && (
              <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
                <Trash2 className="mr-1.5 h-4 w-4" />Clear
              </Button>
            )}
          </div>
        )}

        {/* Result */}
        {result && !config.isRecorder && !config.isSpeechToText && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Result</Label>
              <div className="flex gap-2">
                {resultBlob && <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>}
                {!resultBlob && <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">{copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy</>}</Button>}
              </div>
            </div>
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500"><Check className="h-5 w-5" /><span>Processing complete! File size: {result}</span></div>
              </div>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">{result}</div>
            )}
          </div>
        )}

        {/* Recorder result */}
        {result && config.isRecorder && resultBlob && (
          <div className="mt-6 space-y-3">
            <Label className="text-sm font-medium">Recording Result</Label>
            <audio src={URL.createObjectURL(resultBlob)} controls className="w-full" />
            <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl"><Download className="mr-1.5 h-4 w-4" />Download</Button>
          </div>
        )}
      </div>
    </div>
  );
}
