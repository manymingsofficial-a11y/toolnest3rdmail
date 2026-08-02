'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export type FormField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'switch' | 'select' | 'number';
  value: string | number | boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  description?: string;
};

export type ResourceFormProps = {
  title: string;
  description?: string;
  fields: FormField[];
  onSubmit: (values: Record<string, string | number | boolean>) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  className?: string;
};

export function ResourceForm({ title, description, fields, onSubmit, onCancel, submitLabel = 'Save', className }: ResourceFormProps) {
  const [values, setValues] = React.useState<Record<string, string | number | boolean>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value]))
  );
  const [saving, setSaving] = React.useState(false);

  const update = (key: string, val: string | number | boolean) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className={cn('glass-card p-6', className)}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            {field.type !== 'switch' && <Label htmlFor={field.key}>{field.label}</Label>}
            {field.type === 'text' && (
              <Input
                id={field.key}
                value={String(values[field.key] ?? '')}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
            {field.type === 'number' && (
              <Input
                id={field.key}
                type="number"
                value={String(values[field.key] ?? 0)}
                onChange={(e) => update(field.key, Number(e.target.value))}
                placeholder={field.placeholder}
              />
            )}
            {field.type === 'textarea' && (
              <Textarea
                id={field.key}
                value={String(values[field.key] ?? '')}
                onChange={(e) => update(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
              />
            )}
            {field.type === 'select' && (
              <Select
                value={String(values[field.key] ?? '')}
                onValueChange={(v) => update(field.key, v)}
              >
                <SelectTrigger id={field.key}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {field.type === 'switch' && (
              <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
                <div>
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.description && (
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  )}
                </div>
                <Switch
                  id={field.key}
                  checked={Boolean(values[field.key])}
                  onCheckedChange={(v) => update(field.key, v)}
                />
              </div>
            )}
            {field.description && field.type !== 'switch' && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={saving} className="bg-gradient-brand text-white">
            {saving ? 'Saving...' : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}
