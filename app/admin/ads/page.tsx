'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminAdSettings } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2 } from 'lucide-react';

const slotLabels: Record<string, string> = {
  'homepage-top': 'Homepage Top',
  'homepage-middle': 'Homepage Middle',
  'homepage-bottom': 'Homepage Bottom',
  'tool-after': 'After Tool',
  'tool-sidebar': 'Tool Sidebar',
  'blog-top': 'Blog Top',
  'blog-middle': 'Blog Middle',
  'blog-bottom': 'Blog Bottom',
  'category-top': 'Category Top',
  'category-middle': 'Category Middle',
};

export default function AdminAdsPage() {
  const [settings, setSettings] = React.useState<AdminAdSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    getDataProvider().getAdSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof AdminAdSettings>(key: K, val: AdminAdSettings[K]) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val }) : prev);

  const updateSlot = (slotKey: string, field: 'enabled' | 'slotId', val: boolean | string) =>
    setSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        slots: { ...prev.slots, [slotKey]: { ...prev.slots[slotKey], [field]: val } },
      };
    });

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateAdSettings(settings);
    setSaving(false);
  };

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advertisement Manager"
        description="Control ad placements and settings"
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        }
      />

      <SectionCard title="Global Ad Settings" description="Master controls for all advertisements">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
            <div>
              <Label>Enable Ads</Label>
              <p className="text-xs text-muted-foreground">Toggle all ads on or off</p>
            </div>
            <Switch checked={settings.enabled} onCheckedChange={(v) => update('enabled', v)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Ad Network</Label>
              <Select value={settings.network} onValueChange={(v) => update('network', v as 'adsense' | 'placeholder')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="adsense">Google AdSense</SelectItem>
                  <SelectItem value="placeholder">Placeholder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="publisherId">Publisher ID</Label>
              <Input id="publisherId" value={settings.publisherId} onChange={(e) => update('publisherId', e.target.value)} placeholder="ca-pub-XXXXXXXXXXXX" />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Ad Slots" description="Enable or disable individual ad placements">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(settings.slots).map(([key, slot]) => (
            <div key={key} className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
              <div>
                <p className="text-sm font-medium">{slotLabels[key] ?? key}</p>
                <p className="text-xs text-muted-foreground">Slot: {slot.slotId}</p>
              </div>
              <Switch
                checked={slot.enabled}
                onCheckedChange={(v) => updateSlot(key, 'enabled', v)}
              />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
