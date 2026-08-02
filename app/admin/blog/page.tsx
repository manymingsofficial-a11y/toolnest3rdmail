'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminBlogPost } from '@/lib/admin/types';
import { DataTable, type Column } from '@/components/admin/data-table';
import { PageHeader, LoadingSpinner, ConfirmDialog, SectionCard } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Eye, Calendar } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [editing, setEditing] = React.useState<AdminBlogPost | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [previewPost, setPreviewPost] = React.useState<AdminBlogPost | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    const data = await getDataProvider().getBlogPosts();
    setPosts(data);
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
    if (posts.every((p) => selected.has(p.slug))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posts.map((p) => p.slug)));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await getDataProvider().deleteBlogPost(deleteTarget);
    setDeleteTarget(null);
    await load();
  };

  const columns: Column<AdminBlogPost>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      sortValue: (p) => p.title,
      render: (p) => (
        <div>
          <p className="font-medium">{p.title}</p>
          <p className="text-xs text-muted-foreground">/{p.slug}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Category', sortable: true, sortValue: (p) => p.category, render: (p) => <Badge variant="secondary">{p.category}</Badge> },
    { key: 'author', header: 'Author', render: (p) => <span className="text-muted-foreground">{p.author}</span> },
    {
      key: 'publishedAt',
      header: 'Date',
      sortable: true,
      sortValue: (p) => p.publishedAt,
      render: (p) => <span className="text-xs text-muted-foreground">{p.publishedAt}</span>,
    },
    {
      key: 'readingTime',
      header: 'Read',
      render: (p) => <span className="text-xs">{p.readingTime} min</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <Badge
          variant={p.status === 'published' ? 'default' : 'outline'}
          className={
            p.status === 'published'
              ? 'bg-emerald-500/15 text-emerald-600'
              : p.status === 'scheduled'
              ? 'bg-amber-500/15 text-amber-600'
              : ''
          }
        >
          {p.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewPost(p)}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(p)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-500" onClick={() => setDeleteTarget(p.slug)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Manager"
        description={`${posts.length} posts`}
        action={
          <Button className="bg-gradient-brand text-white gap-2" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        }
      />

      {(creating || editing) && (
        <BlogEditor
          post={editing}
          onSave={async (post) => {
            if (editing) {
              await getDataProvider().updateBlogPost(editing.slug, post);
            } else {
              await getDataProvider().createBlogPost(post as AdminBlogPost);
            }
            setCreating(false);
            setEditing(null);
            await load();
          }}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      <DataTable
        columns={columns}
        data={posts}
        rowKey={(p) => p.slug}
        selectedIds={selected}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        searchable
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Search blog posts..."
        emptyMessage="No blog posts found."
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Delete this post?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        confirmLabel="Delete"
        variant="destructive"
      />

      {previewPost && (
        <BlogPreview post={previewPost} onClose={() => setPreviewPost(null)} />
      )}
    </div>
  );
}

function BlogEditor({
  post,
  onSave,
  onCancel,
}: {
  post: AdminBlogPost | null;
  onSave: (post: AdminBlogPost) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = React.useState<AdminBlogPost>(
    post ?? {
      slug: '',
      title: '',
      description: '',
      category: '',
      tags: [],
      author: 'ToolNest Team',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: 5,
      status: 'draft',
      content: [{ heading: '', body: [''] }],
      seoTitle: '',
      seoDescription: '',
    }
  );
  const [tagInput, setTagInput] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const update = (key: keyof AdminBlogPost, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val } as AdminBlogPost));

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      update('tags', [...form.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => update('tags', form.tags.filter((t) => t !== tag));

  const addSection = () =>
    update('content', [...form.content, { heading: '', body: [''] }]);

  const updateSection = (i: number, heading: string, body: string) => {
    const content = [...form.content];
    content[i] = { heading, body: body.split('\n\n') };
    update('content', content);
  };

  const removeSection = (i: number) => {
    update('content', form.content.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setSaving(true);
    await onSave({ ...form, slug });
    setSaving(false);
  };

  return (
    <SectionCard
      title={post ? `Edit: ${post.title}` : 'New Blog Post'}
      action={
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" form="blog-editor-form" disabled={saving} className="bg-gradient-brand text-white">
            {saving ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      }
    >
      <form id="blog-editor-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={form.title} onChange={(e) => update('title', e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="auto-generated" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={2} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. SEO Tools" />
          </div>
          <div className="space-y-1.5">
            <Label>Author</Label>
            <Input value={form.author} onChange={(e) => update('author', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => update('status', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="publishedAt">Publish Date</Label>
            <Input id="publishedAt" type="date" value={form.publishedAt} onChange={(e) => update('publishedAt', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="readingTime">Reading Time (min)</Label>
            <Input id="readingTime" type="number" value={form.readingTime} onChange={(e) => update('readingTime', Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input id="featuredImage" value={form.featuredImage ?? ''} onChange={(e) => update('featuredImage', e.target.value)} placeholder="/images/blog/..." />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Type a tag and press Enter"
            />
            <Button type="button" variant="outline" onClick={addTag}>Add</Button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {form.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 text-muted-foreground hover:text-rose-500">&times;</button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content sections */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Content Sections</Label>
            <Button type="button" variant="outline" size="sm" onClick={addSection} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Section
            </Button>
          </div>
          {form.content.map((section, i) => (
            <div key={i} className="rounded-lg border border-border/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Section {i + 1}</span>
                {form.content.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" className="h-7 w-7 hover:text-rose-500" onClick={() => removeSection(i)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Input
                value={section.heading}
                onChange={(e) => updateSection(i, e.target.value, section.body.join('\n\n'))}
                placeholder="Section heading"
              />
              <Textarea
                value={section.body.join('\n\n')}
                onChange={(e) => updateSection(i, section.heading, e.target.value)}
                placeholder="Write the section content here. Separate paragraphs with a blank line."
                rows={4}
              />
            </div>
          ))}
        </div>

        {/* SEO fields */}
        <div className="space-y-1.5">
          <Label htmlFor="seoTitle">SEO Title (optional)</Label>
          <Input id="seoTitle" value={form.seoTitle ?? ''} onChange={(e) => update('seoTitle', e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="seoDescription">SEO Description (optional)</Label>
          <Textarea id="seoDescription" value={form.seoDescription ?? ''} onChange={(e) => update('seoDescription', e.target.value)} rows={2} />
        </div>
      </form>
    </SectionCard>
  );
}

function BlogPreview({ post, onClose }: { post: AdminBlogPost; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[80vh] max-w-2xl overflow-y-auto rounded-2xl bg-background p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Preview</span>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{post.author} - {post.publishedAt} - {post.readingTime} min read</p>
        <p className="mt-4 text-sm">{post.description}</p>
        <div className="mt-6 space-y-6">
          {post.content.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              {section.body.map((para, j) => (
                <p key={j} className="mt-2 text-sm leading-relaxed text-muted-foreground">{para}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
