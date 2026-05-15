Outlyer Entertainment — Product Requirements Document
Version: 1.0
Date: 15 May 2026
Status: Ready for build

1. Information architecture
/                       Home
├─ #mission             (anchor section on home)
├─ #founders            (anchor section on home)
└─ #contact             (anchor section on home)
/projects               Projects index (grid of 10)
/projects/[slug]        Project detail (light template)
/team                   Full team page (expanded bios)
/partners               Partners page
/legacy                 "The Kingdom of O" narrative
/privacy                Privacy policy (boilerplate)
/404                    Branded not-found
Slugs preserved from existing site so any indexed inbound links don't break:

an-orc-in-new-york
crewel-work
dream-fever
game-of-hearts
high-power-williams
mission-creep
slippery-beast
something-blue
the-widow-man
wolf-who-chased-the-sun  // TODO(asset): banner not yet supplied

Old URLs to redirect (301s in next.config.js):

/s-projects → /projects
/team-4 → /team

2. Page specifications
2.1 Home (/)
Purpose: Establish brand authority and mission in one screen. Funnel to projects or contact.
Sections, in order:

Nav. Logo (Ø wordmark) left; nav links right (Projects, Team, Partners, Legacy, Contact). Sticky on scroll. Collapses to hamburger ≤ 768px.
Hero. Single-frame cinematic image (founder portrait, project still, or atmospheric — Dan to provide). Tagline overlay: "A Film and TV production company with a powerful inclusion mission." Sub: "Founded by Coldplay's Chris Martin and Emmanuel Kelly." CTA: Projects + Contact.
v1 hero placeholder uses /project-images/dream-fever.png with a 40% paper overlay for contrast. TODO(asset) for bespoke hero later.
Mission block (#mission). Restores full mission copy:

OUTLYER is a full-service entertainment production company, committed to featuring OUTLYERS in front of the camera, off-screen and on stage.
If you are differently-abled.
If you are Neuro or Psychological Divergent.
If you have an exclusory condition.
If you are a primary carer…
YOU ARE AN OUTLYER.

The current site truncates after "If you are a primary carer…" — Dan supplies the complete final clause if one exists, otherwise the ellipsis → "YOU ARE AN OUTLYER" stands as is.
Founders (#founders). 4-up grid at desktop, 2-up at tablet, 1-up at mobile. Cards per audit:

Emmanuel Kelly — CVO & Co-Founder. Bio verbatim. External link to emmanuelkelly.com.
Joanne Reay — CEO & Co-Founder. Bio verbatim.
Lauren Hutton — CCO & Founding Partner. Bio verbatim.
Chris Martin — Honorary Founder & President. (Audit shows no bio for Chris on the live site — leave bio-less or Dan to supply a single line.)


Featured projects. 3-up grid surfacing 3 hand-picked projects from the 10. Link to /projects for full grid.
v1 featured slugs: dream-fever, high-power-williams, the-widow-man.
Contact (#contact). The form (spec in §3).
Footer. Ø mark, address (if any), copyright line ("ALL RIGHTS RESERVED 0UTLYER 2026"), legal links (Privacy), social links if any (Dan to supply).

2.2 Projects index (/projects)
Purpose: Show the body of work as a credible production slate.
Layout: Editorial grid, 3 columns at 1440, 2 at 1024, 1 at mobile. Each card: project still (1:1 or 3:4), title, year, status (in development / production / released), one-line synopsis from the project data file.
Filter / sort: None in v1. Reverse-chronological by year.
Hero image src for each project follows /project-images/<slug>.avif except dream-fever which is .png until re-encoded.
Data shape (TypeScript projects.ts):
tstype Project = {
  slug: string;
  title: string;
  year: number;
  status: 'In Development' | 'In Production' | 'Released';
  synopsis: string;        // one line
  description: string;     // 2–3 short paragraphs for detail page
  hero: { src: string; alt: string };
  credits: Array<{ role: string; name: string }>;
  ogImage: string;         // for social cards
};
2.3 Project detail (/projects/[slug])
Purpose: Light case-study template. Generated per project from the data file. No CMS.
Sections:

Back link → /projects.
Hero image (full-bleed at desktop; 16:9 mobile).
Title (display face, large), year, status.
Synopsis (one line, large).
Description (2–3 short paragraphs).
Credits block (role: name pairs).
Footer.

Out of scope: trailers, galleries, press quotes. (Easy to add later inside the same template.)
2.4 Team (/team)
Purpose: Establish the operating team beyond the founders.
Layout: Founders restated at top (cross-link from home); broader team listed below in a uniform grid.
Per-member data shape:
tstype TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
  links?: Array<{ label: string; href: string }>;
};
Audit captured 223 words of team page content — Dan supplies the expanded team list.
2.5 Partners (/partners)
Purpose: Show the company's credibility-by-association.
Layout: Brand statement (verbatim from audit: "At OUTLYER, we collaborate with best-in-class partners who share our mission to make film more inclusive — on and off camera.") followed by a partner logo grid. Logos in a uniform monochrome treatment to avoid visual chaos.
Per-partner data shape:
tstype Partner = {
  name: string;
  logo: { src: string; alt: string };
  url?: string;
  blurb?: string;
};
2.6 Legacy (/legacy)
Purpose: "The Kingdom of O" narrative — 376 words on the live site. Long-form, narrative-led, single column.
Layout: Editorial article — display title, drop cap on first paragraph, restrained typography. No imagery breaking the prose unless Dan supplies it. Single column max 65ch.
2.7 Privacy (/privacy)
Standard privacy boilerplate page (UK GDPR-aligned given Outlyer's UK base — Dan to confirm jurisdiction). Generated from template, not a Claude Code creative task.
2.8 404
Branded not-found. Ø mark, "This isn't the one you were looking for," link back to home. Small, restrained, on-brand.
3. Contact form
Implementation: Netlify Forms (zero-config, free tier covers expected volume).
Fields:
Name              (required, text)
Email             (required, email, validated)
Organisation      (optional, text)
Subject           (required, single-select: General / Press / Project Submission / Partnership)
Message           (required, textarea, 10–2000 chars)
Honeypot          (hidden, anti-spam)
Note: the audit's existing form has First Name / Last Name / Email / Message. The new form replaces "First Name / Last Name" with a single "Name" field (industry standard, less friction) and adds Organisation + Subject for routing intelligence on the inbound side.
States:

Idle (default).
Submitting (button disabled, spinner inline).
Success (replaces form with: "Thanks. We'll be in touch." plus a return-to-home link).
Error (inline field errors + a top-level error message that survives validation; submission failures fall back to a mailto: link).

Email delivery: Netlify Forms native notifications to [email protected] (Dan to confirm address). Optional Slack notification if Dan wants it (separate Netlify integration).
Anti-spam:

Honeypot field.
Netlify Forms built-in Akismet (free).
No reCAPTCHA in v1 (privacy cost, friction cost, mostly unnecessary at this volume).

Accessibility:

All fields have visible, persistent labels.
Error messages are tied to their field via aria-describedby.
Focus management on submit: success message receives focus.
Submit button is a <button type="submit">, never a styled div.

4. SEO strategy
On-page basics (every page):

<title> — pattern: <Page Name> — OUTLYER (home is OUTLYER — Inclusive Film & TV Production).
<meta name="description"> — 150–160 chars, written per page, no boilerplate.
Canonical URL.
Open Graph: og:title, og:description, og:image (page-specific 1200×630), og:url, og:type, og:site_name.
Twitter Card: summary_large_image with matching image.
<link rel="icon"> — SVG favicon (Ø mark) + PNG fallback.

Structured data (JSON-LD):
PageSchemaHomeOrganization (with founder array referencing Person nodes) + WebSite (with SearchAction pointed at /projects?q=)Projects indexCollectionPageProject detailMovie or TVSeries per type, with creator, productionCompany, inLanguage, dateCreatedTeamOrganization (re-stated) + array of Person nodesPartnersOrganizationLegacyArticle
Sitemap & robots:

sitemap.xml generated at build time. Listing all canonical URLs, lastmod from git history per page (Next.js next-sitemap package).
robots.txt allows all, points to sitemap. No noindex on production.

Redirects:

/s-projects → /projects (301).
/team-4 → /team (301).
Configured in next.config.js.

Migration safety:

Maintain canonical URLs that match the post-redirect destinations.
Submit the new sitemap to Google Search Console after launch.
Once stable, request re-indexing of the old project URLs.

5. GEO strategy (Generative Engine Optimisation)
The goal: when ChatGPT, Perplexity, Claude, or Google AI Overviews are asked "what is Outlyer Entertainment?", "who founded Outlyer?", "inclusive film production companies?", or "differently-abled actors in mainstream film?" — Outlyer surfaces accurately and quotably.
Tactics:

llms.txt at root. Plain-text summary of the site, the brand, the founders, the mission, and an explicit list of canonical pages. Format per the emerging convention (# Outlyer heading, sections for About / Founders / Projects / Partners, all in clean Markdown).
Semantic HTML. Every page uses <main>, <article>, <section> with appropriate aria-labelledby. AI scrapers parse semantic structure better than <div> soup.
JSON-LD as the authoritative summary. Every entity (Organization, Person, Movie) has a description that's clean, declarative, and quote-ready.
One canonical mission paragraph. The mission copy appears once verbatim in the JSON-LD description field of the Organization schema. AI engines tend to surface schema descriptions when answering "what is X?"
Clear ownership of "Outlyer" as a brand entity. sameAs links in the Organization schema pointing to Wikipedia (if a page exists or gets created), Companies House (if UK incorporated), founders' Wikipedia / official sites, IMDb company page (if present).
No dynamic-only content. AI crawlers don't run JS reliably. Next.js SSG by default; no client-side-rendered critical content.

6. Performance budgets
Per page, mobile Lighthouse, on Netlify production deployment:
MetricTargetPerformance≥ 95LCP≤ 1.8sCLS≤ 0.05INP≤ 200msTBT≤ 150msTotal page weight (gzipped, no video)≤ 350KBNumber of requests≤ 30
Means:

Next.js 15+ App Router, SSG by default.
next/image with AVIF + WebP fallbacks, blur placeholders.
One self-hosted display font, one self-hosted text font, subsetted, font-display: swap. No Google Fonts CDN — self-host for performance and privacy.
Tailwind purged. No CSS-in-JS runtime.
No client-side JS framework bundles beyond what Next.js requires.
No third-party scripts in v1 (no GA, no Hotjar, no chat widget).
Lighthouse CI in GitHub Actions blocks PRs that regress budgets.

7. Accessibility targets

WCAG 2.2 AA across all pages.
Zero serious or critical axe-core violations on every page.
All interactive elements keyboard-operable.
Focus visible everywhere; :focus-visible styled per design system.
Colour contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components.
Images have meaningful alt text; decorative images have alt="".
Form errors announced via aria-live="polite".
Prefers-reduced-motion respected for all animations.
Skip-to-content link as the first focusable element.

8. Tech stack
LayerChoiceNotesFrameworkNext.js 15+ App RouterSSG, server componentsLanguageTypeScript strictStylingTailwind CSS v4 + CSS variablesDesign tokens as CSS varsComponentsNone (no shadcn, no UI library)Build from scratch on Tailwind primitivesContentTypeScript data files (/content/*.ts) + MDX for /legacyNo CMS in v1FormsNetlify FormsImagesnext/image, AVIF + WebPFontsSelf-hosted via next/font/localTBD in design systemIconsLucide React (tree-shaken)HostingNetlifyDomain0utlyer.com (existing)DNS migration plan in §10CIGitHub ActionsBuild, test, Lighthouse CITestingVitest (unit) + Playwright (e2e)LintingESLint, PrettierStrictGit hooksHusky + lint-stagedPre-commitAnalyticsNone in v1Plausible recommended for v2
9. Repository structure
outlyer-site/
├── .github/workflows/
│   ├── ci.yml             # build, lint, test
│   └── lighthouse.yml     # perf budget enforcement on PRs
├── app/
│   ├── layout.tsx
│   ├── page.tsx           # home
│   ├── projects/
│   │   ├── page.tsx       # index
│   │   └── [slug]/page.tsx
│   ├── team/page.tsx
│   ├── partners/page.tsx
│   ├── legacy/page.tsx
│   ├── privacy/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
├── components/
│   ├── primitives/         # Button, Link, Heading, etc.
│   ├── layout/             # Nav, Footer, Container
│   └── sections/           # Hero, Mission, FoundersGrid, etc.
├── content/
│   ├── projects.ts
│   ├── team.ts
│   ├── partners.ts
│   └── legacy.mdx
├── public/
│   ├── fonts/
│   ├── project-images/   # kebab-case slug.avif per project
│   ├── logo.avif         # Ø wordmark
│   ├── icon.avif         # Ø mark for OG fallback
│   ├── favicon.svg
│   ├── favicon.png
│   ├── llms.txt
│   └── robots.txt
├── styles/
│   └── globals.css         # design tokens as CSS vars
├── lib/
│   └── schema.ts           # JSON-LD generators
├── tests/
│   ├── e2e/
│   └── unit/
├── docs/
│   ├── product-spec.md     # this file
│   ├── prd.md              # and this
│   └── design-system.md    # next
├── audit/                  # the existing audit folder
├── lighthouserc.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
10. Deployment & DNS
Build pipeline:

Push to main → Netlify auto-deploys production.
PRs → Netlify deploy preview.
GitHub Actions runs in parallel: build, lint, test, Lighthouse CI.
Lighthouse CI uses lighthouserc.json with the budgets in §6. Below threshold = PR blocked.

DNS migration (existing 0utlyer.com on Wix):

Phase 1 (build): site lives at outlyer-rebuild.netlify.app. Stakeholders review there.
Phase 2 (launch): Dan changes A and CNAME records at the registrar to point at Netlify. Wix subscription cancelled only after 72h of confirmed clean traffic.
301 redirects (§4) handled in next.config.js.

Pre-launch checklist (gate before DNS swap):

All Lighthouse budgets met on all pages.
axe-core passes with zero serious/critical violations.
Contact form submits successfully end-to-end on the Netlify preview.
JSON-LD validates on every page (Schema.org validator or Google's Rich Results test).
sitemap.xml validates.
Manual review on real devices: iPhone, Android, iPad, MacBook, 1440 desktop.
Founders / stakeholders sign off on content accuracy.

11. Analytics
None in v1. Plausible Analytics recommended for v2 — privacy-respecting, no cookie banner needed, small JS payload (~1KB), single environment variable to enable.
If Dan wants Plausible in v1, it's a 30-minute add. Flag separately.
12. Acceptance criteria (build-phase gates)
Each phase is "done" only when all criteria pass. These map directly to the /goal conditions in the next message.
Phase 1 — Scaffold:

npm run build exits 0.
npm run lint exits 0.
npm run typecheck exits 0.
A single smoke Playwright test passes against the dev server.
Git repo initialised, first commit on main, pushed to GitHub.

Phase 2 — Design system:

All tokens (colour, type, space, radii, motion) defined as CSS variables in globals.css.
Primitives (Heading, Text, Button, Link, Container) exist with TypeScript types.
A /design-system route (dev-only) renders every primitive in every variant.
axe-core passes on /design-system.

Phase 3 — Layout shell:

Nav and Footer render on every route.
Nav collapses to hamburger ≤ 768px and is keyboard-operable.
Skip-to-content link works.
404 page renders.

Phase 4 — Pages (one sub-phase per page):

Page renders with verbatim audit content.
All content sourced from /content/*.ts, not hardcoded.
Page matches design-system rules (no off-token values).
Responsive at 375 / 640 / 768 / 1024 / 1440.

Phase 5 — Contact form:

Form renders, validates, submits to Netlify.
Success + error states render.
Email notification confirmed received during preview deploy.

Phase 6 — SEO + GEO:

Every page has correct title, meta description, canonical, OG tags, Twitter tags.
Every page has valid JSON-LD (validated by Schema.org).
sitemap.xml lists all canonical URLs.
robots.txt exists and is correct.
llms.txt exists at root.

Phase 7 — Performance & a11y:

Lighthouse CI in GitHub Actions passes all budgets.
axe-core e2e tests pass on all pages.
No console errors on any page.

Phase 8 — Deploy:

Site deploys to Netlify production.
Contact form submission delivers email to configured address.
Manual checklist (§10) signed off.