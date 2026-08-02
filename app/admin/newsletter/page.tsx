'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminNewsletterSettings } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/admin/data-table';
import { Save, Loader2, Download, Upload, Send, Trash2 } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [settings, setSettings] = React.useState<AdminNewsletterSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [campaignSubject, setCampaignSubject] = React.useState('');
  const [campaignBody, setCampaignBody] = React.useState('');
  const [campaignSent, setCampaignSent] = React.useState(false);

  React.useEffect(() => {
    getDataProvider().getNewsletterSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof AdminNewsletterSettings>(key: K, val: AdminNewsletterSettings[K]) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val }) : prev);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateNewsletterSettings(settings);
    setSaving(false);
  };

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectAll = () => {
    if (!settings) return;
    if (settings.subscribers.every((s) => selected.has(s.id))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(settings.subscribers.map((s) => s.id)));
    }
  };

  const handleExportCSV = () => {
    if (!settings) return;
    const headers = 'Email,Subscribed At,Status\n';
    const rows = settings.subscribers
      .map((s) => `${s.email},${s.subscribedAt},${s.status}`)
      .join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = String(ev.target?.result ?? '');
      const lines = text.split('\n').filter((l) => l.trim());
      const newSubs = lines.slice(1).map((line, i) => {
        const [email, subscribedAt, status] = line.split(',');
        return {
          id: `imported-${Date.now()}-${i}`,
          email: email?.trim() ?? '',
          subscribedAt: subscribedAt?.trim() ?? new Date().toISOString(),
          status: (status?.trim() as 'active' | 'unsubscribed') ?? 'active',
        };
      }).filter((s) => s.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email));
      update('subscribers', [...settings.subscribers, ...newSubs]);
    };
    reader.readAsText(file);
  };

  const handleDeleteSelected = () => {
    if (!settings) return;
    update('subscribers', settings.subscribers.filter((s) => !selected.has(s.id)));
    setSelected(new Set());
  };

  const handleSendCampaign = () => {
    setCampaignSent(true);
    setTimeout(() => setCampaignSent(false), 3000);
    setCampaignSubject('');
    setCampaignBody('');
  };

  const columns: Column<AdminNewsletterSettings['subscribers'][number]>[] = [
    { key: 'email', header: 'Email', render: (s) => <span className="font-medium">{s.email}</span> },
    { key: 'subscribedAt', header: 'Subscribed', render: (s) => <span className="text-xs text-muted-foreground">{s.subscribedAt}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (s) => (
        <Badge variant={s.status === 'active' ? 'default' : 'outline'} className={s.status === 'active' ? 'bg-emerald-500/15 text-emerald-600' : ''}>
          {s.status}
        </Badge>
      ),
    },
  ];

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter Manager"
        description={`${settings.subscribers.length} subscribers`}
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </Button>
        }
      />

      <SectionCard title="Newsletter Settings" description="Configure your newsletter integration">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
            <div>
              <Label>Enable Newsletter</Label>
              <p className="text-xs text-muted-foreground">Show newsletter signup forms</p>
            </div>
            <Switch checked={settings.enabled} onCheckedChange={(v) => update('enabled', v)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Provider</Label>
              <Select value={settings.provider} onValueChange={(v) => update('provider', v as 'internal' | 'mailchimp' | 'convertkit')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="mailchimp">Mailchimp</SelectItem>
                  <SelectItem value="convertkit">ConvertKit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Endpoint</Label>
              <Input value={settings.endpoint} onChange={(e) => update('endpoint', e.target.value)} />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Subscribers" description="Manage your email list"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleExportCSV} className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <label>
              <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
              <Button size="sm" variant="outline" className="gap-1.5 cursor-pointer" onClick={(e) => e.preventDefault()}>
                <Upload className="h-3.5 w-3.5" /> Import CSV
              </Button>
            </label>
            {selected.size > 0 && (
              <Button size="sm" variant="destructive" onClick={handleDeleteSelected} className="gap-1.5">
                <Trash2 className="h-3.5 w-3.5" /> Delete ({selected.size})
              </Button>
            )}
          </div>
        }
      >
        <DataTable
          columns={columns}
          data={settings.subscribers}
          rowKey={(s) => s.id}
          selectedIds={selected}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          searchable
          searchValue=""
          onSearchChange={() => {}}
          searchPlaceholder="Search subscribers..."
          emptyMessage="No subscribers yet."
        />
      </SectionCard>

      <SectionCard title="Send Campaign" description="Send an email to all active subscribers">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={campaignSubject} onChange={(e) => setCampaignSubject(e.target.value)} placeholder="Email subject..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Message</Label>
            <textarea
              id="body"
              value={campaignBody}
              onChange={(e) => setCampaignBody(e.target.value)}
              placeholder="Write your email content..."
              rows={5}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button onClick={handleSendCampaign} disabled={!campaignSubject || !campaignBody || campaignSent} className="bg-gradient-brand text-white gap-2">
            <Send className="h-4 w-4" />
            {campaignSent ? 'Campaign Sent!' : 'Send Campaign'}
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
