'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminHomepageSettings, AdminTool } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2, Plus, X } from 'lucide-react';

export default function AdminHomepagePage() {
  const [settings, setSettings] = React.useState<AdminHomepageSettings | null>(null);
  const [tools, setTools] = React.useState<AdminTool[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    Promise.all([getDataProvider().getHomepageSettings(), getDataProvider().getTools()]).then(([s, t]) => {
      setSettings(s);
      setTools(t);
      setLoading(false);
    });
  }, []);

  const update = (key: keyof AdminHomepageSettings, val: unknown) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val } as AdminHomepageSettings) : prev);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateHomepageSettings(settings);
    setSaving(false);
  };

  const addToSection = (section: 'featuredToolSlugs' | 'trendingToolSlugs' | 'recentToolSlugs' | 'popularToolSlugs', slug: string) => {
    if (!settings) return;
    const current = settings[section];
    if (!current.includes(slug)) {
      update(section, [...current, slug]);
    }
  };

  const removeFromSection = (section: 'featuredToolSlugs' | 'trendingToolSlugs' | 'recentToolSlugs' | 'popularToolSlugs', slug: string) => {
    if (!settings) return;
    update(section, settings[section].filter((s) => s !== slug));
  };

  if (loading || !settings) return <LoadingSpinner />;

  const toolOptions = tools.filter((t) => !settings.featuredToolSlugs.includes(t.slug));

  const renderSection = (
    title: string,
    section: 'featuredToolSlugs' | 'trendingToolSlugs' | 'recentToolSlugs' | 'popularToolSlugs',
    available: AdminTool[]
  ) => (
    <SectionCard title={title} description={`${settings[section].length} tools selected`}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Select onValueChange={(v) => addToSection(section, v)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Add a tool..." />
            </SelectTrigger>
            <SelectContent>
              {available.map((t) => (
                <SelectItem key={t.slug} value={t.slug}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          {settings[section].map((slug) => {
            const tool = tools.find((t) => t.slug === slug);
            return (
              <span key={slug} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-sm">
                {tool?.name ?? slug}
                <button onClick={() => removeFromSection(section, slug)} className="text-muted-foreground hover:text-rose-500">
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
          {settings[section].length === 0 && (
            <p className="text-sm text-muted-foreground">No tools selected yet.</p>
          )}
        </div>
      </div>
    </SectionCard>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage Manager"
        description="Control what appears on the homepage"
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        }
      />

      <SectionCard title="Hero Section" description="The main banner at the top of the homepage">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="heroBadge">Badge Text</Label>
            <Input id="heroBadge" value={settings.heroBadge} onChange={(e) => update('heroBadge', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="heroTitle">Title</Label>
            <Input id="heroTitle" value={settings.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="heroSubtitle">Subtitle</Label>
            <Textarea id="heroSubtitle" value={settings.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} rows={2} />
          </div>
        </div>
      </SectionCard>

      {renderSection('Featured Tools', 'featuredToolSlugs', toolOptions)}
      {renderSection('Trending Tools', 'trendingToolSlugs', tools.filter((t) => !settings.trendingToolSlugs.includes(t.slug)))}
      {renderSection('Recent Tools', 'recentToolSlugs', tools.filter((t) => !settings.recentToolSlugs.includes(t.slug)))}
      {renderSection('Popular Tools', 'popularToolSlugs', tools.filter((t) => !settings.popularToolSlugs.includes(t.slug)))}

      <SectionCard title="Footer" description="Footer text shown at the bottom of the site">
        <div className="space-y-1.5">
          <Label htmlFor="footerText">Footer Text</Label>
          <Input id="footerText" value={settings.footerText} onChange={(e) => update('footerText', e.target.value)} />
        </div>
      </SectionCard>
    </div>
  );
}
