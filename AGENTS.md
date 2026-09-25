# ToolNest — Agent Instructions

## Project Overview
Next.js 13.5 (App Router) + TypeScript + Tailwind + Supabase. A directory of 269+ free online tools across 21 categories with an admin dashboard for content management. Deployed on Netlify.

## Commands
```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build (next build)
npm run start     # Run production build locally
npm run lint      # ESLint (runs in CI; ignored during build)
npm run typecheck # tsc --noEmit (ignored during build)
```
> **Note**: `next.config.js` disables ESLint and TypeScript errors during builds. Run `lint` and `typecheck` manually before committing.

## Environment Variables
Required in `.env.local` (never committed):
```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
Admin dashboard requires Supabase Auth login. No service-role key used client-side.

## Architecture
### Data Flow
- **Static data** (`lib/data.ts`): 269 tools + 21 categories — fallback for SSR when Supabase unavailable
- **Dynamic data** (`lib/public-data.ts`): Fetches from Supabase (`admin_tools`, `admin_categories`, etc.) with 60s in-memory cache
- **Page metadata** (`lib/seo.ts`): Generates SEO metadata, JSON-LD (Breadcrumb, HowTo, FAQ), sitemap, robots.txt
- **Admin panel** (`app/admin/*`): Client-side CRUD via `lib/admin/static-provider.ts` (wraps Supabase)

### Key Directories
```
app/
├── page.tsx                    # Homepage (SSR, fetches settings + tools)
├── layout.tsx                  # Root layout: providers, SEO, fonts, ads
├── tools/[slug]/page.tsx       # Individual tool pages (269+)
├── categories/page.tsx         # Category listings
├── blog/[slug]/page.tsx        # Blog posts
├── admin/                      # Admin dashboard (client components)
│   ├── tools/page.tsx          # Tool CRUD
│   ├── categories/page.tsx     # Category CRUD
│   ├── blog/page.tsx           # Blog CRUD
│   └── settings/page.tsx       # Site/SEO/Homepage/Ads/Affiliate/Newsletter
├── api/
│   ├── track/route.ts          # Click tracking
│   ├── track-click/route.ts    # Tool click tracking
│   └── newsletter/             # Subscribe/unsubscribe
├── sitemap.ts                  # Dynamic sitemap.xml
└── robots.ts                   # Dynamic robots.txt

lib/
├── data.ts                     # Static tool/category definitions (source of truth)
├── public-data.ts              # Supabase fetchers + search index cache
├── supabase-client.ts          # Browser client (auth enabled)
├── supabase-server.ts          # Server client (no auth persistence)
├── seo.ts                      # Metadata + JSON-LD generators
├── utils.ts                    # cn(), formatting helpers
├── *-configs.ts                # Tool implementations (QR, PDF, video, AI, etc.)
└── admin/
    ├── types.ts                # AdminTool, AdminCategory, etc.
    ├── provider.ts             # Supabase admin provider interface
    └── static-provider.ts      # Implementation used by admin UI

components/
├── ui/                         # shadcn/ui primitives (40+ components)
├── qr-code-generator.tsx       # Example tool component
├── seo-content.tsx             # Reusable SEO content block
├── related-tools.tsx           # Cross-linking
├── tool-actions.tsx            # Favorite/share/feedback
├── public-chrome.tsx           # Header, footer, search, theme toggle
├── admin/                      # Admin UI components (DataTable, ResourceForm, etc.)
└── analytics.tsx               # Vercel Speed Insights + custom tracker
```

## Adding a New Tool
1. **Add to `lib/data.ts`**: Extend `tools` array with slug, name, description, category, icon, gradient, popularity
2. **Create page** at `app/tools/[slug]/page.tsx` following existing pattern:
   - Import tool component from `components/`
   - Use `generateToolMetadata()` for SEO
   - Include JSON-LD scripts (Breadcrumb, HowTo, FAQ)
   - Add `<SeoContent />`, `<ToolActions />`, `<RelatedTools />`
3. **Build tool component** in `components/` (client-side, no server deps)
4. **Optional**: Add SEO content in `lib/tool-seo-content.ts`
5. **Run SEO audit**: `npx tsx scripts/seo-audit.ts` (checks titles, descriptions, duplicates)

## Admin Dashboard
- Access at `/admin` (requires Supabase Auth login)
- Manages: Tools, Categories, Blog, Site Settings, SEO, Homepage, Ads, Affiliate, Newsletter
- Uses `lib/admin/static-provider.ts` for all CRUD
- Data syncs to Supabase tables (see migrations in `supabase/migrations/`)
- Soft deletes on `admin_tools` (`deleted_at` column)

## Database Schema (Supabase)
12 tables with RLS (authenticated-only access):
| Table | Purpose |
|-------|---------|
| `admin_tools` | Tools with slug, category, status, popularity, soft delete |
| `admin_categories` | Categories with sort_order, SEO fields |
| `admin_blog_posts` | Posts with JSONB content, tags, scheduling |
| `admin_seo_settings` | Singleton: default title, OG, Twitter, robots, sitemap |
| `admin_homepage_settings` | Singleton: hero, featured/trending/recent/popular tool slugs |
| `admin_ad_settings` | Singleton: AdSense/placeholder config |
| `admin_affiliate_products` | Affiliate products per network |
| `admin_affiliate_settings` | Singleton: network config |
| `admin_newsletter_subscribers` | Email list with status |
| `admin_newsletter_settings` | Singleton: provider config |
| `admin_site_settings` | Singleton: site name, logo, theme, social links, analytics |
| `admin_logs` | System logs |

Run migrations via Supabase CLI or dashboard.

## Tool Categories (from `lib/data.ts`)
PDF Tools, Image Tools, QR & Barcode, SEO Tools, AI Tools, Text Tools, Developer Tools, Calculators, Converters, Social Media, Security, Video, Audio, Office, Design, Web Utilities, Productivity (21 total)

## Testing & Quality
- No test framework configured
- `scripts/seo-audit.ts` validates metadata across all routes
- TypeScript strict mode enabled
- ESLint with `next/core-web-vitals`

## Deployment (Netlify)
```toml
# netlify.toml
[build]
  command = "npx next build"
  publish = ".next"
[[plugins]]
  package = "@netlify/plugin-nextjs"
```
- `next.config.js`: `images.unoptimized = true`, `output: 'standalone'` not used
- Build ignores TS/ESLint errors (configured in `next.config.js`)
- Set env vars in Netlify dashboard

## Common Gotchas
1. **Supabase client vs server**: Use `supabase-client.ts` in client components (`'use client'`), `supabase-server.ts` in server components
2. **Search index cache**: `fetchSearchIndex()` caches for 60s; call `invalidateSearchCache()` after admin mutations
3. **Static fallback**: Root layout falls back to `lib/data.ts` if Supabase fails
4. **Tool slugs**: Must match between `lib/data.ts`, Supabase `admin_tools`, and `app/tools/[slug]/page.tsx`
5. **Category names**: Must match exactly between `lib/data.ts` categories and tool `category` field
6. **Icons**: Use Lucide icon names as strings (e.g., `'QrCode'`) — mapped in `lib/icon-map.ts`

## Useful Scripts
```bash
npx tsx scripts/seo-audit.ts          # Audit all route metadata
npx tsx scripts/template-tools.tsv    # Export tools to TSV (for content team)
```

## File Naming Conventions
- Tool pages: `app/tools/kebab-case-slug/page.tsx`
- Tool components: `components/kebab-case-name.tsx` (PascalCase export)
- Config files: `lib/*-configs.ts` (e.g., `video-configs.ts`, `ai-generators.ts`)
- Admin pages: `app/admin/*/page.tsx` (all client components)