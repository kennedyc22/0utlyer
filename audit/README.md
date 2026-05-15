# Outlyer audit

Forensic, read-only audit of https://www.0utlyer.com.

## Re-running

```
npm install
npx playwright install chromium
node audit.mjs                              # resume; skip pages already captured
node audit.mjs --only=projects,partners     # only these pages
node audit.mjs --force                      # wipe ./audit/ and redo everything
```

By default the script is resumable: any page whose 1440 full-page screenshot
already exists on disk is skipped. Pass `--force` to wipe and rebuild from scratch.

## Contents
- `audit-report.md` — the human-readable summary (the primary deliverable)
- `screenshots/` — full-page, hero, and component crops
- `content/` — extracted copy, links, images, sitemap
- `styles/` — computed CSS, palette, typography, spacing
- `meta/` — head tags, JSON-LD, robots.txt, sitemap.xml
- `performance/` — Lighthouse JSON + HTML reports
- `accessibility/` — axe-core JSON + summary
- `inventory/` — observed components and interactions
