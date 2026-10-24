import { tools, categories } from '../lib/data';
import { generateToolMetadata, generateCategoryMetadata, blogPosts, getBlogPost } from '../lib/seo';
import { getIndexPolicy } from '../lib/tool-classification';

interface Issue {
  route: string;
  type: string;
  detail: string;
}

const issues: Issue[] = [];
const titleMap = new Map<string, string[]>();
const descMap = new Map<string, string[]>();
const h1Map = new Map<string, string[]>();
const canonicalMap = new Map<string, string[]>();

// Helper: extract resolved title from Metadata (handles template)
function resolveTitle(meta: any): string {
  if (!meta) return '';
  if (typeof meta.title === 'string') return meta.title;
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

// === AUDIT TOOL PAGES ===
for (const tool of tools) {
  const route = `/tools/${tool.slug}`;
  const meta = generateToolMetadata(tool.slug);
  const title = resolveTitle(meta);
  const desc = resolveDesc(meta);
  const canonical = meta.alternates?.canonical as string | undefined;
  const indexPolicy = getIndexPolicy(tool.slug);

  if (!title) {
    issues.push({ route, type: 'missing_title', detail: 'No title generated' });
  }
  if (title === 'ToolNest' || title === 'ToolNest — ToolNest') {
    issues.push({ route, type: 'generic_title', detail: `Title is just site name: "${title}"` });
  }
  const titleCore = title.replace(/ — ToolNest.*$/, '').replace(/ \| ToolNest.*$/, '');
  if (titleCore.length < 10) {
    issues.push({ route, type: 'short_title', detail: `Title core too short: "${titleCore}" (${titleCore.length} chars)` });
  }
  if (title.length > 70) {
    issues.push({ route, type: 'long_title', detail: `Title too long: ${title.length} chars` });
  }

  if (!desc) {
    issues.push({ route, type: 'missing_description', detail: 'No meta description generated' });
  }
  if (desc && desc.length < 50) {
    issues.push({ route, type: 'short_description', detail: `Description too short: ${desc.length} chars` });
  }
  if (desc && desc.length > 165) {
    issues.push({ route, type: 'long_description', detail: `Description too long: ${desc.length} chars` });
  }

  if (!canonical) {
    issues.push({ route, type: 'missing_canonical', detail: 'No canonical URL' });
  } else if (!canonical.startsWith('https://')) {
    issues.push({ route, type: 'relative_canonical', detail: `Canonical is not absolute: ${canonical}` });
  } else if (!canonical.includes(`/tools/${tool.slug}`)) {
    issues.push({ route, type: 'wrong_canonical', detail: `Canonical does not match tool slug: ${canonical}` });
  }

  if (!meta.openGraph?.title) {
    issues.push({ route, type: 'missing_og_title', detail: 'No OpenGraph title' });
  }
  if (!meta.openGraph?.description) {
    issues.push({ route, type: 'missing_og_description', detail: 'No OpenGraph description' });
  }

  // Check robots directive
  const robots = meta.robots;
  const robotsIndex = typeof robots === 'object' && robots !== null ? robots.index : undefined;
  if (indexPolicy.index && robotsIndex === false) {
    issues.push({ route, type: 'noindex_on_indexable', detail: 'Tool should be indexed but robots says noindex' });
  }

  trackDup(titleMap, title, route);
  trackDup(descMap, desc, route);
  trackDup(h1Map, tool.name, route);
  if (canonical) trackDup(canonicalMap, canonical, route);
}

// === AUDIT CATEGORIES PAGE (single page, not per-category) ===
{
  const route = '/categories';
  // The /categories route has its own inline metadata; generateCategoryMetadata
  // is used for ?cat= filtered views (which are noindex). Check the base page.
  for (const cat of categories) {
    const meta = generateCategoryMetadata(cat.slug);
    const title = resolveTitle(meta);
    if (!title) {
      issues.push({ route: `${route}?cat=${cat.slug}`, type: 'missing_title', detail: 'No title for category' });
    }
    // Filtered category pages should be noindex
    const catRobots = meta.robots;
    const catRobotsIndex = typeof catRobots === 'object' && catRobots !== null ? catRobots.index : undefined;
    if (catRobotsIndex !== false) {
      issues.push({ route: `${route}?cat=${cat.slug}`, type: 'indexable_filtered_page', detail: 'Filtered category page should be noindex' });
    }
  }
}

// === AUDIT BLOG POSTS ===
for (const post of blogPosts) {
  const route = `/blog/${post.slug}`;
  if (!post.title) issues.push({ route, type: 'missing_title', detail: 'Blog post has no title' });
  if (!post.description) issues.push({ route, type: 'missing_description', detail: 'Blog post has no description' });
  if (!post.publishedAt) issues.push({ route, type: 'missing_date', detail: 'Blog post has no publish date' });

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
for (const [canon, routes] of Array.from(canonicalMap.entries())) {
  if (routes.length > 1 && canon) {
    issues.push({ route: routes.join(', '), type: 'duplicate_canonical', detail: `Canonical ${canon} used on ${routes.length} pages` });
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

const types = Array.from(new Set(issues.map(i => i.type)));
for (const type of types) {
  console.log(`\n--- ${type.toUpperCase()} ---`);
  for (const issue of issues.filter(i => i.type === type).slice(0, 20)) {
    console.log(`  ${issue.route}: ${issue.detail}`);
  }
  const count = issues.filter(i => i.type === type).length;
  if (count > 20) console.log(`  ... and ${count - 20} more`);
}
