'use client';

import * as React from 'react';
import { Sparkles, Copy, Check, Trash2, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { aiConfigs, type GenConfig } from '@/lib/ai-generators';

export function AiGenerator({ slug }: { slug: string }) {
  const config: GenConfig | undefined = aiConfigs[slug];
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!config) {
    return <div className="text-center text-muted-foreground">Tool not found.</div>;
  }

  const cfg = config;

  function handleGenerate() {
    if (!input.trim()) {
      toast.error('Please enter some text first.');
      return;
    }
    setLoading(true);
    setOutput('');
    setCopied(false);
    setTimeout(() => {
      const result = cfg.generate(input);
      setOutput(result);
      setLoading(false);
      toast.success('Generated successfully!');
    }, 600);
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setCopied(false);
  }

  function handleExample() {
    setInput(cfg.example);
    setOutput('');
    setCopied(false);
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Input section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{cfg.label}</Label>
            {cfg.showCharCounter && (
              <span className="text-xs text-muted-foreground">
                {input.length} characters
              </span>
            )}
          </div>
          {cfg.inputType === 'textarea' ? (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={cfg.placeholder}
              className="min-h-[120px] rounded-xl"
            />
          ) : (
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={cfg.placeholder}
              className="rounded-xl"
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:from-violet-600 hover:to-purple-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-1.5 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
          <Button
            onClick={handleExample}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <FileText className="mr-1.5 h-4 w-4" />
            Example
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <Trash2 className="mr-1.5 h-4 w-4" />
            Clear
          </Button>
        </div>

        {/* Output section */}
        {loading && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your content...
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted/50" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted/50" />
            </div>
          </div>
        )}

        {!loading && output && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Result</Label>
              <div className="flex items-center gap-2">
                {cfg.showCharCounter && (
                  <span className="text-xs text-muted-foreground">
                    {output.length} characters
                  </span>
                )}
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  {copied ? (
                    <>
                      <Check className="mr-1.5 h-4 w-4 text-green-500" />
                      Copied
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
            <div
              className={cn(
                'overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4',
                'whitespace-pre-wrap text-sm leading-relaxed',
                output.includes('\n') ? 'max-h-[500px]' : ''
              )}
            >
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
