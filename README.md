# Outlyer Entertainment — Website Rebuild

Marketing site for Øutlyer Entertainment — a film and TV production company
founded by Chris Martin and Emmanuel Kelly with a powerful inclusion mission.

## Stack

- **Framework:** Next.js 16 (App Router, SSG)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first tokens in `styles/globals.css`)
- **Forms:** Netlify Forms
- **Hosting:** Netlify
- **Testing:** Vitest (unit), Playwright (e2e), Lighthouse CI (perf)
- **Quality gates:** ESLint, Prettier, Husky + lint-staged, axe-core

## Scripts

| Script              | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start dev server (Turbopack)            |
| `npm run build`     | Production build                        |
| `npm run start`     | Serve production build                  |
| `npm run lint`      | ESLint                                  |
| `npm run typecheck` | `tsc --noEmit`                          |
| `npm run test`      | Vitest unit tests                       |
| `npm run test:e2e`  | Playwright e2e against a running server |
| `npm run lhci`      | Lighthouse CI against a running server  |
| `npm run format`    | Prettier write across the repo          |

## Documentation

Authoritative specs live in [`docs/`](./docs):

- `docs/product-spec.md` — purpose, audience, brand DNA, success criteria
- `docs/prd.md` — IA, pages, contact form, SEO/GEO, perf budgets, repo layout
- `docs/design-system.md` — tokens, typography, components, motion, a11y rules

Forensic audit of the current Wix site (Markdown + JSON inventory, content
extracts, screenshots, accessibility report) lives in [`audit/`](./audit).

## Git hooks

Husky runs `lint-staged` on pre-commit. Hooks are configured for WSL/Linux
shells; commit from inside WSL to ensure hooks fire correctly.
