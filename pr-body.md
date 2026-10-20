## Summary
Consolidates 51 replicated AI template tools into 8 unified tools with mode selection to resolve AdSense "replicated content" and "low-value content" rejections.

## Changes
- **51 AI tool pages deleted** → 8 consolidated tools with mode selection dropdown
- **51 permanent 301 redirects** in `next.config.js` + `public/_redirects` preserving `?mode=` query param
- **noindex,follow** on all AI template, utility, reference, and redirected pages via `getIndexPolicy()`
- **AdSense ads blocked** on all ineligible pages (template, utility, reference, redirected) via `getAdEligibility()`
- **Sitemap** excludes noindex pages via `getIndexPolicy()` filter
- **Category fixes**: "AI Tools" renamed from "Content Generators" (count 8), empty "Social Media Tools" removed
- **Internal links updated**: 6 schema tool pages now reference consolidated tools
- **51 old AI tool pages deleted**, 8 new consolidated pages created

## Verification
- TypeScript: PASS
- ESLint: PASS (pre-existing img warnings only)
- Build: PASS (271 pages)
- SEO Audit: PASS (254 routes, 0 issues)
- 8 consolidated AI tools: noindex, noads
- 51 redirected AI tools: noindex, noads
- 3 misleading tools (pdf-protect, png-to-svg, ip-address-checker): noindex, noads

## Security
- Next.js upgraded to 14.2.35 (patches CVE-2025-55184 DoS)
- Remaining 2026 CVEs require Next.js 15+/React 19 migration (documented separately)

## Not Included
- No production deploy
- No main branch merge
- No AdSense approval guarantee