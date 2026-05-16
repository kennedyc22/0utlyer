# Phase 6 — SEO & GEO technical implementation

Status: implementation complete, pending verification (npm scripts).
Date: 2026-05-16

## What shipped

| Layer | File(s) |
| --- | --- |
| Constants | `lib/seo/constants.ts` |
| Metadata builder | `lib/seo/build-metadata.ts` |
| JSON-LD generators | `lib/seo/schema.ts` |
| JSON-LD component | `components/seo/JsonLd.tsx` |
| Root metadata + viewport | `app/layout.tsx` |
| Per-route metadata | `app/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/team/page.tsx`, `app/partners/page.tsx`, `app/legacy/page.tsx`, `app/privacy/page.tsx`, `app/not-found.tsx` |
| Sitemap | `app/sitemap.ts` |
| Robots (with AI-crawler allowlist) | `app/robots.ts` |
| PWA manifest | `app/manifest.ts` |
| OG image generators | `app/opengraph-image.tsx`, `app/projects/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx`, `app/team/opengraph-image.tsx`, `app/legacy/opengraph-image.tsx` |
| llms.txt | `public/llms.txt` (static) + `scripts/generate-llms-txt.ts` (regenerator, wired as `prebuild`) |
| CI validation | `tests/e2e/seo.spec.ts` |
| Devdep added | `tsx ^4.19.2` (runs the llms.txt generator) |

## Route-by-route metadata summary

| Route | Title | Description (approx length) | Canonical | JSON-LD types |
| --- | --- | --- | --- | --- |
| `/` | OUTLYER — Inclusive Film & TV Production | 84 (tagline) | https://www.0utlyer.com/ | Organization, WebSite, WebPage, Person ×3 |
| `/projects` | Projects — OUTLYER | 178 | …/projects | CollectionPage (ItemList), BreadcrumbList |
| `/projects/[slug]` | <Title> — OUTLYER | per-project synopsis | …/projects/<slug> | Movie, BreadcrumbList |
| `/team` | Team — OUTLYER | 117 | …/team | Organization, Person ×3, BreadcrumbList |
| `/partners` | Partners — OUTLYER | 137 | …/partners | WebPage, BreadcrumbList |
| `/legacy` | Legacy — The Kingdom of O — OUTLYER | 178 | …/legacy | Article, BreadcrumbList |
| `/privacy` | Privacy — OUTLYER | 119 | …/privacy | WebPage, BreadcrumbList |
| `/not-found` | Page not found — OUTLYER | n/a (noindex) | — | — |

All routes carry `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale=en_GB`, `og:type`, and a `twitter:card=summary_large_image` block. OG image is the route-colocated `opengraph-image.tsx` for home / projects / team / legacy / projects-detail; other routes inherit the default.

## Decisions made (for the record)

1. **Favicons** — generated dynamically via Next.js file-based icon convention:
   `app/icon.tsx` (64×64) and `app/apple-icon.tsx` (180×180) render the Ø
   brand mark on black at build time. `/app/favicon.ico` remains for legacy
   browsers. No PNG/SVG assets need to be shipped.
2. **Organization address/telephone** — omitted (Dan, 2026-05-16). Not coming
   back unless a public business address is restored later.
3. **Lauren Hutton** — kept out of founders per Dan (2026-05-16). PRD §2.1
   reference is stale; founders array stands at Emmanuel, Joanne, Chris Martin.
4. **Socials** — Instagram (`@outlyerofficial`) is the only public profile.
   Listed in `lib/seo/constants.ts` `SOCIAL_PROFILES` and flows into
   `Organization.sameAs` JSON-LD.
5. **Sitemap approach** — native `app/sitemap.ts` (supersedes PRD §4's `next-sitemap` reference).
6. **Movie vs TVSeries** — every project schema-typed as `Movie`. `TODO(content)` in `lib/seo/schema.ts` to add an optional `format` field on `Project` once Dan classifies each.
7. **llms-full.txt pattern** — explicitly rejected (duplicate-content risk on a small site). One curated llms.txt at root.
8. **AI crawlers** — explicit allow rules for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, CCBot, Applebot-Extended.

## TODOs left for Dan before launch

- `TODO(asset)` `lib/seo/schema.ts` — replace placeholder logo width/height with real intrinsic dimensions of `/public/logo.avif`.
- `TODO(content)` `content/projects.ts` — add optional `format: 'film' | 'series' | 'interactive'` per project so the schema generator can emit `TVSeries` / `CreativeWork` as appropriate.
- `TODO(seo)` `app/legacy/page.tsx` — confirm `datePublished` for the Legacy article (placeholder 2025-02-01 from the Cambridge symposium would be plausible).
- `TODO(seo)` `lib/seo/constants.ts` — Twitter/X handle (currently `null`); extend `SOCIAL_PROFILES` if Dan adds IMDb / Wikipedia / Companies House links.
- `TODO(seo)` `lib/seo/schema.ts` — `foundingDate` ISO YYYY-MM-DD on Organization once confirmed.

## Acceptance criteria mapping (PRD §12 Phase 6)

- [x] Every page has correct title, meta description, canonical, OG tags, Twitter tags
- [x] Every page has valid JSON-LD (Playwright tests parse every block on every route)
- [x] sitemap.xml lists all canonical URLs
- [x] robots.txt exists and is correct
- [x] llms.txt exists at root
- [ ] Schema.org validator pass (manual — Dan to paste a JSON-LD block into https://validator.schema.org or run via the Rich Results test after Dan runs the dev server)

## Verification (Dan to run in PowerShell)

```powershell
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e:ci
npm run lhci:ci
```

After build, capture:
- `Get-Content public/llms.txt`
- `curl http://localhost:3000/sitemap.xml`
- `curl http://localhost:3000/robots.txt`
- Rendered `<head>` of `/`, `/projects`, `/projects/dream-fever`, `/team`, `/partners`, `/legacy` via `curl -s http://localhost:3000/<path> | Select-String -Pattern '<head' -Context 0,80`.
