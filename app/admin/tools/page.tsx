'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminTool } from '@/lib/admin/types';
import { DataTable, type Column } from '@/components/admin/data-table';
import { PageHeader, SectionCard, LoadingSpinner, ConfirmDialog } from '@/components/admin/shared';
import { ResourceForm, type FormField } from '@/components/admin/resource-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Copy, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminToolsPage() {
  const [tools, setTools] = React.useState<AdminTool[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [editing, setEditing] = React.useState<AdminTool | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState(false);
  const [bulkCategory, setBulkCategory] = React.useState<string>('');

  const load = React.useCallback(async () => {
    setLoading(true);
    const data = await getDataProvider().getTools();
    setTools(data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const categories = React.useMemo(
    () => Array.from(new Set(tools.map((t) => t.category))).sort(),
    [tools]
  );

  const filtered = React.useMemo(() => {
    return tools.filter((t) => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.slug.includes(search.toLowerCase())) return false;
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      return true;
    });
  }, [tools, search, categoryFilter, statusFilter]);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectAll = () => {
    if (filtered.every((t) => selected.has(t.slug))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((t) => t.slug)));
    }
  };

  const handleCreate = async (values: Record<string, string | number | boolean>) => {
    const slug = String(values.slug || String(values.name).toLowerCase().replace(/\s+/g, '-'));
    const tool: AdminTool = {
      slug,
      name: String(values.name),
      description: String(values.description),
      category: String(values.category),
      iconName: String(values.iconName || 'Wrench'),
      gradient: String(values.gradient || 'from-brand-purple to-brand-purple/60'),
      badge: values.badge ? String(values.badge) : undefined,
      isNew: Boolean(values.isNew),
      popularity: Number(values.popularity || 50),
      status: values.status === 'draft' ? 'draft' : 'published',
    };
    await getDataProvider().createTool(tool);
    setCreating(false);
    await load();
  };

  const handleUpdate = async (values: Record<string, string | number | boolean>) => {
    if (!editing) return;
    await getDataProvider().updateTool(editing.slug, {
      name: String(values.name),
      description: String(values.description),
      category: String(values.category),
      badge: values.badge ? String(values.badge) : undefined,
      isNew: Boolean(values.isNew),
      popularity: Number(values.popularity),
      status: values.status === 'draft' ? 'draft' : 'published',
    });
    setEditing(null);
    await load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await getDataProvider().deleteTool(deleteTarget);
    setDeleteTarget(null);
    await load();
  };

  const handleDuplicate = async (slug: string) => {
    await getDataProvider().duplicateTool(slug);
    await load();
  };

  const handleBulkDelete = async () => {
    await getDataProvider().bulkDeleteTools(Array.from(selected));
    setSelected(new Set());
    setBulkDeleteOpen(false);
    await load();
  };

  const handleBulkCategory = async () => {
    if (!bulkCategory) return;
    await getDataProvider().bulkUpdateToolCategory(Array.from(selected), bulkCategory);
    setSelected(new Set());
    setBulkCategory('');
    await load();
  };

  const handleBulkStatus = async (status: 'published' | 'draft') => {
    await getDataProvider().bulkUpdateToolStatus(Array.from(selected), status);
    setSelected(new Set());
    await load();
  };

  const columns: Column<AdminTool>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      sortValue: (t) => t.name,
      render: (t) => (
        <div>
          <p className="font-medium">{t.name}</p>
          <p className="text-xs text-muted-foreground">/{t.slug}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category', sortable: true, sortValue: (t) => t.category, render: (t) => <span className="text-muted-foreground">{t.category}</span> },
    {
      key: 'popularity',
      header: 'Popularity',
      sortable: true,
      sortValue: (t) => t.popularity,
      render: (t) => <span className="font-mono text-xs">{t.popularity}</span>,
    },
    {
      key: 'badge',
      header: 'Badge',
      render: (t) => (t.badge ? <Badge variant="secondary">{t.badge}</Badge> : <span className="text-xs text-muted-foreground">—</span>),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <Badge variant={t.status === 'published' ? 'default' : 'outline'} className={t.status === 'published' ? 'bg-emerald-500/15 text-emerald-600' : ''}>
          {t.status === 'published' ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (t) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(t)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(t.slug)}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => getDataProvider().updateTool(t.slug, { status: t.status === 'published' ? 'draft' : 'published' }).then(load)}
          >
            {t.status === 'published' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-500" onClick={() => setDeleteTarget(t.slug)}>
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
        { key: 'category', label: 'Category', type: 'select', value: editing.category, options: categories.map((c) => ({ label: c, value: c })) },
        { key: 'popularity', label: 'Popularity (0-100)', type: 'number', value: editing.popularity },
        { key: 'badge', label: 'Badge (optional)', type: 'text', value: editing.badge ?? '' },
        { key: 'isNew', label: 'Mark as New', type: 'switch', value: editing.isNew ?? false },
        { key: 'status', label: 'Status', type: 'select', value: editing.status, options: [{ label: 'Published', value: 'published' }, { label: 'Draft', value: 'draft' }] },
      ]
    : [
        { key: 'name', label: 'Name', type: 'text', value: '' },
        { key: 'slug', label: 'Slug (URL)', type: 'text', value: '', placeholder: 'auto-generated from name' },
        { key: 'description', label: 'Description', type: 'textarea', value: '' },
        { key: 'category', label: 'Category', type: 'select', value: categories[0] ?? '', options: categories.map((c) => ({ label: c, value: c })) },
        { key: 'popularity', label: 'Popularity (0-100)', type: 'number', value: 50 },
        { key: 'badge', label: 'Badge (optional)', type: 'text', value: '' },
        { key: 'status', label: 'Status', type: 'select', value: 'published', options: [{ label: 'Published', value: 'published' }, { label: 'Draft', value: 'draft' }] },
      ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tools Manager"
        description={`${tools.length} tools total`}
        action={
          <Button className="bg-gradient-brand text-white gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" />
            Add Tool
          </Button>
        }
      />

      {(creating || editing) && (
        <ResourceForm
          title={editing ? `Edit: ${editing.name}` : 'Add New Tool'}
          description="Fill in the tool details below."
          fields={formFields}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          submitLabel={editing ? 'Update Tool' : 'Create Tool'}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <Select value={bulkCategory} onValueChange={setBulkCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bulk: Set Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {bulkCategory && <Button size="sm" onClick={handleBulkCategory}>Apply</Button>}
            <Button size="sm" variant="outline" onClick={() => handleBulkStatus('published')}>Publish</Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkStatus('draft')}>Unpublish</Button>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(t) => t.slug}
        selectedIds={selected}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        searchable
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search tools by name or slug..."
        onBulkDelete={() => setBulkDeleteOpen(true)}
        emptyMessage="No tools match your filters."
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this tool?"
        description="This action cannot be undone. The tool will be permanently removed."
        onConfirm={handleDelete}
        confirmLabel="Delete"
        variant="destructive"
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        title={`Delete ${selected.size} tools?`}
        description="This will permanently delete all selected tools. This action cannot be undone."
        onConfirm={handleBulkDelete}
        confirmLabel="Delete All"
        variant="destructive"
      />
    </div>
  );
}
