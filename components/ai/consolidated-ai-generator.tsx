'use client';

import * as React from 'react';
import { Sparkles, Copy, Check, Trash2, FileText, Loader2, ChevronDown, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { consolidatedAiTools, getConsolidatedGenerator, getDefaultMode, type ConsolidatedToolMode } from '@/lib/consolidated-ai-tools';
import { aiConfigs } from '@/lib/ai-generators';

interface ConsolidatedAiGeneratorProps {
  slug: string;
}

export function ConsolidatedAiGenerator({ slug }: ConsolidatedAiGeneratorProps) {
  const tool = consolidatedAiTools[slug];
  const searchParams = useSearchParams();
  const urlMode = searchParams?.get('mode');
  const initialMode = (urlMode && tool?.modes.some(m => m.id === urlMode)) ? urlMode : tool?.modes[0]?.id || '';
  
  const [selectedMode, setSelectedMode] = React.useState<string>(initialMode);
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!tool) {
    return <div className="text-center text-muted-foreground">Consolidated tool not found.</div>;
  }

  const currentMode = tool.modes.find(m => m.id === selectedMode);
  const generateFn = currentMode ? getConsolidatedGenerator(slug, selectedMode) : undefined;

  function handleGenerate() {
    if (!input.trim()) {
      toast.error('Please enter some text first.');
      return;
    }
    if (!generateFn) {
      toast.error('Generator not available for this mode.');
      return;
    }
    setLoading(true);
    setOutput('');
    setCopied(false);
    setTimeout(() => {
      const result = generateFn(input);
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
    if (currentMode) {
      const modeConfig = currentMode.configSlug;
      const originalConfig = aiConfigs[modeConfig];
      if (originalConfig?.example) {
        setInput(originalConfig.example);
      } else {
        setInput(tool.example);
      }
    } else {
      setInput(tool.example);
    }
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

  function handleModeChange(modeId: string) {
    setSelectedMode(modeId);
    setInput('');
    setOutput('');
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Mode Selector */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Mode</Label>
            <div className="w-[250px]">
              <Select value={selectedMode} onValueChange={handleModeChange}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select a mode" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {tool.modes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{mode.label}</span>
                        <span className="text-xs text-muted-foreground">{mode.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {currentMode && (
            <p className="text-sm text-muted-foreground">{currentMode.description}</p>
          )}
        </div>

        {/* Input section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{currentMode?.label || tool.label} Input</Label>
            {tool.showCharCounter && (
              <span className="text-xs text-muted-foreground">
                {input.length} characters
              </span>
            )}
          </div>
          {tool.inputType === 'textarea' ? (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder}
              className="min-h-[120px] rounded-xl"
            />
          ) : (
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder}
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
                {tool.showCharCounter && (
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