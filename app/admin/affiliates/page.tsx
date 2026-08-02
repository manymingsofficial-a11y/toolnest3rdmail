'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminAffiliateSettings } from '@/lib/admin/types';
import { PageHeader, SectionCard, LoadingSpinner, ConfirmDialog } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

const networkLabels: Record<string, string> = {
  amazon: 'Amazon Associates',
  impact: 'Impact',
  cj: 'CJ Affiliate',
  digistore24: 'Digistore24',
  whop: 'Whop',
  custom: 'Custom',
};

const networkColors: Record<string, string> = {
  amazon: 'bg-amber-500/15 text-amber-600',
  impact: 'bg-blue-500/15 text-blue-600',
  cj: 'bg-emerald-500/15 text-emerald-600',
  digistore24: 'bg-rose-500/15 text-rose-600',
  whop: 'bg-violet-500/15 text-violet-600',
  custom: 'bg-cyan-500/15 text-cyan-600',
};

export default function AdminAffiliatesPage() {
  const [settings, setSettings] = React.useState<AdminAffiliateSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [showProductForm, setShowProductForm] = React.useState(false);
  const [deleteProductId, setDeleteProductId] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDataProvider().getAffiliateSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof AdminAffiliateSettings>(key: K, val: AdminAffiliateSettings[K]) =>
    setSettings((prev) => prev ? ({ ...prev, [key]: val }) : prev);

  const updateNetwork = (network: string, field: string, val: string | boolean) =>
    setSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        networks: {
          ...prev.networks,
          [network]: { ...prev.networks[network as keyof typeof prev.networks], [field]: val },
        },
      };
    });

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await getDataProvider().updateAffiliateSettings(settings);
    setSaving(false);
  };

  const addProduct = () => {
    if (!settings) return;
    const newProduct = {
      id: `prod-${Date.now()}`,
      network: 'amazon',
      name: '',
      description: '',
      url: '',
    };
    update('products', [...settings.products, newProduct]);
    setShowProductForm(false);
  };

  const updateProduct = (id: string, field: string, val: string) => {
    if (!settings) return;
    update('products', settings.products.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const deleteProduct = async () => {
    if (!deleteProductId || !settings) return;
    update('products', settings.products.filter((p) => p.id !== deleteProductId));
    setDeleteProductId(null);
  };

  if (loading || !settings) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Affiliate Manager"
        description="Manage affiliate networks and products"
        action={
          <Button onClick={handleSave} disabled={saving} className="bg-gradient-brand text-white gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        }
      />

      <SectionCard title="Global Affiliate Settings" description="Master toggle for all affiliate links">
        <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
          <div>
            <Label>Enable Affiliates</Label>
            <p className="text-xs text-muted-foreground">Toggle all affiliate links on or off</p>
          </div>
          <Switch checked={settings.enabled} onCheckedChange={(v) => update('enabled', v)} />
        </div>
      </SectionCard>

      <SectionCard title="Affiliate Networks" description="Configure each network's credentials">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(settings.networks).map(([key, network]) => (
            <div key={key} className="rounded-lg border border-border/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={networkColors[key]}>{networkLabels[key]}</Badge>
                <Switch checked={network.enabled} onCheckedChange={(v) => updateNetwork(key, 'enabled', v)} />
              </div>
              {key === 'amazon' && (
                <div className="space-y-1">
                  <Label className="text-xs">Affiliate Tag</Label>
                  <Input value={settings.networks.amazon.affiliateTag} onChange={(e) => updateNetwork(key, 'affiliateTag', e.target.value)} placeholder="toolnest-20" />
                </div>
              )}
              {key !== 'amazon' && (
                <div className="space-y-1">
                  <Label className="text-xs">Affiliate ID</Label>
                  <Input
                    value={key === 'cj' ? settings.networks.cj.publisherId : (key === 'impact' ? settings.networks.impact.affiliateId : key === 'digistore24' ? settings.networks.digistore24.affiliateId : key === 'whop' ? settings.networks.whop.affiliateId : key === 'custom' ? settings.networks.custom.affiliateId : '')}
                    onChange={(e) => updateNetwork(key, 'affiliateId', e.target.value)}
                    placeholder="Your ID"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Affiliate Products"
        description={`${settings.products.length} products`}
        action={
          <Button size="sm" variant="outline" onClick={addProduct} className="gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Product
          </Button>
        }
      >
        <div className="space-y-3">
          {settings.products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No affiliate products yet. Click &ldquo;Add Product&rdquo; to create one.</p>
          ) : (
            settings.products.map((product) => (
              <div key={product.id} className="rounded-lg border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={networkColors[product.network]}>{networkLabels[product.network]}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-rose-500" onClick={() => setDeleteProductId(product.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Product Name</Label>
                    <Input value={product.name} onChange={(e) => updateProduct(product.id, 'name', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Price (optional)</Label>
                    <Input value={product.price ?? ''} onChange={(e) => updateProduct(product.id, 'price', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Textarea value={product.description} onChange={(e) => updateProduct(product.id, 'description', e.target.value)} rows={2} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Affiliate URL</Label>
                  <Input value={product.url} onChange={(e) => updateProduct(product.id, 'url', e.target.value)} placeholder="https://..." />
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>

      <ConfirmDialog
        open={!!deleteProductId}
        onOpenChange={(o) => !o && setDeleteProductId(null)}
        title="Delete this product?"
        onConfirm={deleteProduct}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
