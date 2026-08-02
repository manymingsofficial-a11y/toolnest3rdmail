'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminCategory } from '@/lib/admin/types';
import { DataTable, type Column } from '@/components/admin/data-table';
import { PageHeader, LoadingSpinner, ConfirmDialog } from '@/components/admin/shared';
import { ResourceForm, type FormField } from '@/components/admin/resource-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<AdminCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [editing, setEditing] = React.useState<AdminCategory | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const data = await getDataProvider().getCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectAll = () => {
    if (categories.every((c) => selected.has(c.slug))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(categories.map((c) => c.slug)));
    }
  };

  const handleCreate = async (values: Record<string, string | number | boolean>) => {
    const slug = String(values.slug || String(values.name).toLowerCase().replace(/\s+/g, '-'));
    const category: AdminCategory = {
      slug,
      name: String(values.name),
      count: Number(values.count || 0),
      iconName: String(values.iconName || 'FolderTree'),
      gradient: String(values.gradient || 'from-brand-purple to-brand-purple/60'),
      description: String(values.description),
      seoTitle: String(values.seoTitle || ''),
      seoDescription: String(values.seoDescription || ''),
      sortOrder: categories.length,
    };
    await getDataProvider().createCategory(category);
    setCreating(false);
    await load();
  };

  const handleUpdate = async (values: Record<string, string | number | boolean>) => {
    if (!editing) return;
    await getDataProvider().updateCategory(editing.slug, {
      name: String(values.name),
      description: String(values.description),
      seoTitle: String(values.seoTitle || ''),
      seoDescription: String(values.seoDescription || ''),
      gradient: String(values.gradient),
    });
    setEditing(null);
    await load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await getDataProvider().deleteCategory(deleteTarget);
    setDeleteTarget(null);
    await load();
  };

  const handleMove = async (slug: string, dir: 'up' | 'down') => {
    const idx = categories.findIndex((c) => c.slug === slug);
    if (idx === -1) return;
    const newOrder = [...categories];
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= newOrder.length) return;
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
    await getDataProvider().reorderCategories(newOrder.map((c) => c.slug));
    await load();
  };

  const columns: Column<AdminCategory>[] = [
    {
      key: 'sortOrder',
      header: 'Order',
      render: (c) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMove(c.slug, 'up')}>
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMove(c.slug, 'down')}>
            <ArrowDown className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      sortValue: (c) => c.name,
      render: (c) => (
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-muted-foreground">/{c.slug}</p>
        </div>
      ),
    },
    { key: 'description', header: 'Description', render: (c) => <span className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{c.description}</span> },
    { key: 'count', header: 'Tools', sortable: true, sortValue: (c) => c.count, render: (c) => <Badge variant="secondary">{c.count}</Badge> },
    {
      key: 'seo',
      header: 'SEO',
      render: (c) => (
        <div className="text-xs">
          <p className={c.seoTitle ? 'text-emerald-500' : 'text-muted-foreground'}>
            {c.seoTitle ? 'Title set' : 'No title'}
          </p>
          <p className={c.seoDescription ? 'text-emerald-500' : 'text-muted-foreground'}>
            {c.seoDescription ? 'Desc set' : 'No desc'}
          </p>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(c)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-500" onClick={() => setDeleteTarget(c.slug)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const formFields: FormField[] = editing
    ? [
        { key: 'name', label: 'Name', type: 'text', value: editing.name },
        { key: 'description', label: 'Description', type: 'textarea', value: editing.description },
        { key: 'gradient', label: 'Gradient (Tailwind classes)', type: 'text', value: editing.gradient },
        { key: 'seoTitle', label: 'SEO Title', type: 'text', value: editing.seoTitle ?? '', description: 'Custom title for search engines' },
        { key: 'seoDescription', label: 'SEO Description', type: 'textarea', value: editing.seoDescription ?? '' },
      ]
    : [
        { key: 'name', label: 'Name', type: 'text', value: '' },
        { key: 'slug', label: 'Slug (URL)', type: 'text', value: '', placeholder: 'auto-generated from name' },
        { key: 'description', label: 'Description', type: 'textarea', value: '' },
        { key: 'gradient', label: 'Gradient (Tailwind classes)', type: 'text', value: 'from-brand-purple to-brand-purple/60' },
        { key: 'iconName', label: 'Icon Name (Lucide)', type: 'text', value: 'FolderTree', description: 'Name of a Lucide icon, e.g. FileText, Search, Code2' },
        { key: 'seoTitle', label: 'SEO Title', type: 'text', value: '' },
        { key: 'seoDescription', label: 'SEO Description', type: 'textarea', value: '' },
      ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Manager"
        description={`${categories.length} categories`}
        action={
          <Button className="bg-gradient-brand text-white gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        }
      />

      {(creating || editing) && (
        <ResourceForm
          title={editing ? `Edit: ${editing.name}` : 'Add New Category'}
          fields={formFields}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          submitLabel={editing ? 'Update Category' : 'Create Category'}
        />
      )}

      <DataTable
        columns={columns}
        data={categories}
        rowKey={(c) => c.slug}
        selectedIds={selected}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        emptyMessage="No categories found."
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this category?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
