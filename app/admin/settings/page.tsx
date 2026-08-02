'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminSettings } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<AdminSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    getDataProvider().getSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof AdminSettings>(key: K, val: AdminSettings[K]) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val }) : prev);

  const updateSocial = (key: string, val: string) =>
    setSettings((prev) => prev ? ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: val } }) : prev);

  const updateAnalytics = (key: string, val: string) =>
    setSettings((prev) => prev ? ({ ...prev, analyticsIds: { ...prev.analyticsIds, [key]: val } }) : prev);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateSettings(settings);
    setSaving(false);
  };

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your website configuration"
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        }
      />

      <SectionCard title="Website Identity" description="Your site name, logo, and favicon">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="websiteName">Website Name</Label>
            <Input id="websiteName" value={settings.websiteName} onChange={(e) => update('websiteName', e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" value={settings.logo} onChange={(e) => update('logo', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="favicon">Favicon URL</Label>
              <Input id="favicon" value={settings.favicon} onChange={(e) => update('favicon', e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Default Theme</Label>
            <Select value={settings.defaultTheme} onValueChange={(v) => update('defaultTheme', v as 'light' | 'dark' | 'system')}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Contact" description="Contact email address">
        <div className="space-y-1.5">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input id="contactEmail" type="email" value={settings.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} />
        </div>
      </SectionCard>

      <SectionCard title="Social Links" description="Your social media profiles">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Twitter</Label>
            <Input value={settings.socialLinks.twitter} onChange={(e) => updateSocial('twitter', e.target.value)} placeholder="https://twitter.com/..." />
          </div>
          <div className="space-y-1.5">
            <Label>GitHub</Label>
            <Input value={settings.socialLinks.github} onChange={(e) => updateSocial('github', e.target.value)} placeholder="https://github.com/..." />
          </div>
          <div className="space-y-1.5">
            <Label>LinkedIn</Label>
            <Input value={settings.socialLinks.linkedin} onChange={(e) => updateSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/..." />
          </div>
          <div className="space-y-1.5">
            <Label>Instagram</Label>
            <Input value={settings.socialLinks.instagram} onChange={(e) => updateSocial('instagram', e.target.value)} placeholder="https://instagram.com/..." />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Analytics" description="Tracking IDs for analytics platforms">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Google Analytics</Label>
            <Input value={settings.analyticsIds.googleAnalytics} onChange={(e) => updateAnalytics('googleAnalytics', e.target.value)} placeholder="G-XXXXXXX" />
          </div>
          <div className="space-y-1.5">
            <Label>Google Search Console</Label>
            <Input value={settings.analyticsIds.googleSearchConsole} onChange={(e) => updateAnalytics('googleSearchConsole', e.target.value)} placeholder="Verification code" />
          </div>
          <div className="space-y-1.5">
            <Label>Facebook Pixel</Label>
            <Input value={settings.analyticsIds.facebookPixel} onChange={(e) => updateAnalytics('facebookPixel', e.target.value)} placeholder="Pixel ID" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
