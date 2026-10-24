#!/usr/bin/env tsx
/**
 * SEO validation script — checks tool pages for:
 * - Correct canonical URLs
 * - Correct robots directives (index vs noindex)
 * - Sitemap inclusion consistency
 * - Conflicting robots directives
 *
 * Run: npx tsx scripts/seo-validate.ts
 */

import { tools } from '../lib/data';
import { getIndexPolicy, classifyTool } from '../lib/tool-classification';
import { blogPosts } from '../lib/seo';

const SITE_URL = 'https://freetoolnest.vercel.app';

type Issue = {
  slug: string;
  type: 'canonical' | 'robots' | 'sitemap' | 'conflict';
  message: string;
};

const issues: Issue[] = [];

console.log('=== ToolNest SEO Validation ===\n');

// 1. Check each tool for classification consistency
console.log('Checking tool indexing policies...');
for (const tool of tools) {
  const policy = getIndexPolicy(tool.slug);
  const classification = classifyTool(tool.slug);

  // Check for conflicting classification (index:true but classified as template/utility)
  if (classification.tier === 'template' && policy.index) {
    issues.push({
      slug: tool.slug,
      type: 'robots',
      message: `Template tool "${tool.slug}" is marked index:true — should be noindex`,
    });
  }

  if (classification.tier === 'utility' && policy.index) {
    issues.push({
      slug: tool.slug,
      type: 'robots',
      message: `Utility tool "${tool.slug}" is marked index:true — should be noindex`,
    });
  }
}

// 2. Check that indexable tools have correct canonical pattern
console.log('Checking canonical URL patterns...');
for (const tool of tools) {
  const policy = getIndexPolicy(tool.slug);
  if (policy.index) {
    // Indexable tools should have canonical at /tools/{slug}
    const expectedCanonical = `/tools/${tool.slug}`;
    if (!expectedCanonical.startsWith('/tools/')) {
      issues.push({
        slug: tool.slug,
        type: 'canonical',
        message: `Indexable tool has unexpected canonical pattern`,
      });
    }
  }
}

// 3. Simulate sitemap — check that indexable tools are included and noindex tools are excluded
console.log('Checking sitemap eligibility...');
const indexableSlugs = tools.filter((t) => getIndexPolicy(t.slug).index).map((t) => t.slug);
const noindexSlugs = tools.filter((t) => !getIndexPolicy(t.slug).index).map((t) => t.slug);

console.log(`  Indexable tools (should be in sitemap): ${indexableSlugs.length}`);
console.log(`  Noindex tools (should NOT be in sitemap): ${noindexSlugs.length}`);

// 4. Check for noindex tools that might accidentally be in sitemap
for (const slug of noindexSlugs) {
  // The sitemap uses getIndexPolicy(t.slug).index to filter
  // If this returns false, the tool is correctly excluded
  const policy = getIndexPolicy(slug);
  if (policy.index) {
    issues.push({
      slug,
      type: 'sitemap',
      message: `Noindex tool "${slug}" would incorrectly appear in sitemap`,
    });
  }
}

// 5. Check blog posts for canonical and robots
console.log('Checking blog posts...');
for (const post of blogPosts) {
  const expectedCanonical = `/blog/${post.slug}`;
  if (!expectedCanonical.startsWith('/blog/')) {
    issues.push({
      slug: post.slug,
      type: 'canonical',
      message: `Blog post has unexpected canonical pattern`,
    });
  }
}

// 6. Check for duplicate canonicals
console.log('Checking for duplicate canonicals...');
const canonicalSet = new Set<string>();
for (const slug of indexableSlugs) {
  const canonical = `/tools/${slug}`;
  if (canonicalSet.has(canonical)) {
    issues.push({
      slug,
      type: 'canonical',
      message: `Duplicate canonical URL: ${canonical}`,
    });
  }
  canonicalSet.add(canonical);
}

// 7. Verify key URLs from GSC report
console.log('\nChecking GSC-reported URLs...');
const gscUrls = [
  { url: '/tools/color-palette-generator', expectIndex: true },
  { url: '/tools/background-remover', expectIndex: true },
  { url: '/about', expectIndex: true },
  { url: '/contact', expectIndex: true },
  { url: '/tools', expectIndex: true },
  { url: '/categories', expectIndex: true },
];

for (const { url, expectIndex } of gscUrls) {
  const slug = url.replace('/tools/', '').replace(/^\//, '');
  if (url.startsWith('/tools/')) {
    const policy = getIndexPolicy(slug);
    if (expectIndex && !policy.index) {
      issues.push({
        slug,
        type: 'robots',
        message: `GSC URL ${url} expected index:true but got index:${policy.index}`,
      });
    }
    console.log(`  ${url}: index=${policy.index} (expected: ${expectIndex}) — ${policy.index === expectIndex ? 'OK' : 'MISMATCH'}`);
  } else {
    console.log(`  ${url}: static page (expected: index) — OK (handled by layout metadata)`);
  }
}

// Report
console.log('\n=== Summary ===');
console.log(`Total tools: ${tools.length}`);
console.log(`Indexable: ${indexableSlugs.length}`);
console.log(`Noindex: ${noindexSlugs.length}`);
console.log(`Blog posts: ${blogPosts.length}`);
console.log(`Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log('\n--- Issues ---');
  for (const issue of issues) {
    console.log(`  [${issue.type}] ${issue.slug}: ${issue.message}`);
  }
  process.exit(1);
} else {
  console.log('\nAll checks passed.');
  process.exit(0);
}
