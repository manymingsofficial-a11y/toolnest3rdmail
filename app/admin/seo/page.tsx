'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminSeoSettings } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Loader2 } from 'lucide-react';

export default function AdminSeoPage() {
  const [settings, setSettings] = React.useState<AdminSeoSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    getDataProvider().getSeoSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = (key: keyof AdminSeoSettings, val: unknown) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val } as AdminSeoSettings) : prev);

  const updateOG = (key: string, val: string) =>
    setSettings((prev) => prev ? ({ ...prev, openGraphDefaults: { ...prev.openGraphDefaults, [key]: val } }) : prev);

  const updateTwitter = (key: string, val: string) =>
    setSettings((prev) => prev ? ({ ...prev, twitterDefaults: { ...prev.twitterDefaults, [key]: val } }) : prev);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateSeoSettings(settings);
    setSaving(false);
  };

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Manager"
        description="Manage default SEO settings across the site"
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        }
      />

      <SectionCard title="Default Meta Tags" description="Used when no page-specific SEO is set">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="defaultTitle">Default Title</Label>
            <Input id="defaultTitle" value={settings.defaultTitle} onChange={(e) => update('defaultTitle', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="defaultDescription">Default Description</Label>
            <Textarea id="defaultDescription" value={settings.defaultDescription} onChange={(e) => update('defaultDescription', e.target.value)} rows={2} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="keywords">Default Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              value={settings.defaultKeywords.join(', ')}
              onChange={(e) => update('defaultKeywords', e.target.value.split(',').map((k) => k.trim()))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="canonical">Canonical Base URL</Label>
            <Input id="canonical" value={settings.canonicalBaseUrl} onChange={(e) => update('canonicalBaseUrl', e.target.value)} />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Open Graph Defaults" description="Social sharing defaults">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Site Name</Label>
              <Input value={settings.openGraphDefaults.siteName} onChange={(e) => updateOG('siteName', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Locale</Label>
              <Input value={settings.openGraphDefaults.locale} onChange={(e) => updateOG('locale', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Default Image URL</Label>
              <Input value={settings.openGraphDefaults.defaultImage} onChange={(e) => updateOG('defaultImage', e.target.value)} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Twitter Card Defaults" description="Twitter sharing defaults">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Twitter Handle</Label>
              <Input value={settings.twitterDefaults.handle} onChange={(e) => updateTwitter('handle', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Card Type</Label>
              <Input value={settings.twitterDefaults.cardType} onChange={(e) => updateTwitter('cardType', e.target.value)} />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Robots.txt" description="Crawl control rules">
        <Textarea
          value={settings.robotsTxt}
          onChange={(e) => update('robotsTxt', e.target.value)}
          rows={6}
          className="font-mono text-sm"
        />
      </SectionCard>

      <SectionCard title="Structured Data (JSON-LD)" description="Control rich result features">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
            <div>
              <Label>Enable JSON-LD</Label>
              <p className="text-xs text-muted-foreground">Generate structured data for rich results</p>
            </div>
            <Switch checked={settings.jsonLdEnabled} onCheckedChange={(v) => update('jsonLdEnabled', v)} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
            <div>
              <Label>Enable Sitemap</Label>
              <p className="text-xs text-muted-foreground">Auto-generate XML sitemap</p>
            </div>
            <Switch checked={settings.sitemapEnabled} onCheckedChange={(v) => update('sitemapEnabled', v)} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
