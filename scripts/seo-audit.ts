import { tools, categories } from '../lib/data';
import { generateToolMetadata, generateCategoryMetadata, blogPosts, getBlogPost } from '../lib/seo';

interface Issue {
  route: string;
  type: string;
  detail: string;
}

const issues: Issue[] = [];
const titleMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();
const h1Map = new Map<string, string[]>();

// Helper: extract resolved title from Metadata (handles template)
function resolveTitle(meta: any): string {
  if (!meta) return '';
  if (typeof meta.title === 'string') return meta.title;
  // With template "%s — ToolNest", title field is the string before template
  if (meta.title && typeof meta.title === 'object' && meta.title.template) {
    return meta.title.template.replace('%s', meta.title.default || meta.title.absolute || '');
  }
  if (meta.title && meta.title.absolute) return meta.title.absolute;
  if (meta.title && meta.title.default) return meta.title.default;
  return '';
}

function resolveDesc(meta: any): string {
  if (!meta) return '';
  return meta.description || '';
}

function trackDup(map: Map<string, string[]>, key: string, route: string) {
  if (!key) return;
  const existing = map.get(key);
  if (existing) {
    existing.push(route);
    map.set(key, existing);
  } else {
    map.set(key, [route]);
  }
}

// === AUDIT TOOL PAGES (269) ===
for (const tool of tools) {
  const route = `/tools/${tool.slug}`;
  const meta = generateToolMetadata(tool.slug);
  const title = resolveTitle(meta);
  const desc = resolveDesc(meta);
  const canonical = meta.alternates?.canonical as string | undefined;

  // Missing title
  if (!title) {
    issues.push({ route, type: 'missing_title', detail: 'No title generated' });
  }
  // Generic title (just "ToolNest")
  if (title === 'ToolNest' || title === 'ToolNest — ToolNest') {
    issues.push({ route, type: 'generic_title', detail: `Title is just site name: "${title}"` });
  }
  // Title too short (< 10 chars excluding site name)
  const titleCore = title.replace(/ — ToolNest.*$/, '').replace(/ \| ToolNest.*$/, '');
  if (titleCore.length < 10) {
    issues.push({ route, type: 'short_title', detail: `Title core too short: "${titleCore}" (${titleCore.length} chars)` });
  }
  // Title too long (> 70 chars)
  if (title.length > 70) {
    issues.push({ route, type: 'long_title', detail: `Title too long: ${title.length} chars` });
  }

  // Missing description
  if (!desc) {
    issues.push({ route, type: 'missing_description', detail: 'No meta description generated' });
  }
  // Description too short (< 50 chars)
  if (desc && desc.length < 50) {
    issues.push({ route, type: 'short_description', detail: `Description too short: ${desc.length} chars` });
  }
  // Description too long (> 160 chars)
  if (desc && desc.length > 165) {
    issues.push({ route, type: 'long_description', detail: `Description too long: ${desc.length} chars` });
  }

  // Missing canonical
  if (!canonical) {
    issues.push({ route, type: 'missing_canonical', detail: 'No canonical URL' });
  }

  // Missing OG
  if (!meta.openGraph?.title) {
    issues.push({ route, type: 'missing_og_title', detail: 'No OpenGraph title' });
  }
  if (!meta.openGraph?.description) {
    issues.push({ route, type: 'missing_og_description', detail: 'No OpenGraph description' });
  }

  trackDup(titleMap, title, route);
  trackDup(descMap, desc, route);
  trackDup(h1Map, tool.name, route);
}

// === AUDIT CATEGORY PAGES (17) ===
for (const cat of categories) {
  const route = `/categories?cat=${cat.slug}`;
  const meta = generateCategoryMetadata(cat.slug);
  const title = resolveTitle(meta);
  const desc = resolveDesc(meta);

  if (!title) issues.push({ route, type: 'missing_title', detail: 'No title for category' });
  if (!desc) issues.push({ route, type: 'missing_description', detail: 'No description for category' });
  if (!meta.alternates?.canonical) issues.push({ route, type: 'missing_canonical', detail: 'No canonical for category' });
  if (!meta.openGraph?.title) issues.push({ route, type: 'missing_og_title', detail: 'No OG title for category' });

  trackDup(titleMap, title, route);
  trackDup(descMap, desc, route);
  trackDup(h1Map, cat.name, route);
}

// === AUDIT BLOG POSTS ===
for (const post of blogPosts) {
  const route = `/blog/${post.slug}`;
  // Blog post metadata is generated in the page file, not here - check data
  if (!post.title) issues.push({ route, type: 'missing_title', detail: 'Blog post has no title' });
  if (!post.description) issues.push({ route, type: 'missing_description', detail: 'Blog post has no description' });

  trackDup(titleMap, post.title, route);
  trackDup(descMap, post.description, route);
  trackDup(h1Map, post.title, route);
}

// === REPORT DUPLICATES ===
for (const [title, routes] of Array.from(titleMap.entries())) {
  if (routes.length > 1 && title) {
    issues.push({ route: routes.join(', '), type: 'duplicate_title', detail: `"${title}" used on ${routes.length} pages` });
  }
}
for (const [desc, routes] of Array.from(descMap.entries())) {
  if (routes.length > 1 && desc) {
    issues.push({ route: routes.join(', '), type: 'duplicate_description', detail: `Description used on ${routes.length} pages: "${desc.substring(0, 80)}..."` });
  }
}
for (const [h1, routes] of Array.from(h1Map.entries())) {
  if (routes.length > 1 && h1) {
    issues.push({ route: routes.join(', '), type: 'duplicate_h1', detail: `H1 "${h1}" used on ${routes.length} pages` });
  }
}

// === SUMMARY ===
const byType = new Map<string, number>();
for (const issue of issues) {
  byType.set(issue.type, (byType.get(issue.type) || 0) + 1);
}

console.log('\n=== SEO AUDIT RESULTS ===\n');
console.log(`Total routes audited: ${tools.length + categories.length + blogPosts.length}`);
console.log(`  - Tool pages: ${tools.length}`);
console.log(`  - Category pages: ${categories.length}`);
console.log(`  - Blog posts: ${blogPosts.length}`);
console.log(`\nTotal issues found: ${issues.length}\n`);

console.log('Issues by type:');
for (const [type, count] of Array.from(byType.entries()).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${type}: ${count}`);
}

// Print details for each type
const types = Array.from(new Set(issues.map(i => i.type)));
for (const type of types) {
  console.log(`\n--- ${type.toUpperCase()} ---`);
  for (const issue of issues.filter(i => i.type === type).slice(0, 20)) {
    console.log(`  ${issue.route}: ${issue.detail}`);
  }
  const count = issues.filter(i => i.type === type).length;
  if (count > 20) console.log(`  ... and ${count - 20} more`);
}
