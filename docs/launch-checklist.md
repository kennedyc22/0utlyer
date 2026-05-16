# Outlyer Launch Checklist

## Build status (automated — CI must be green)
- [ ] Lighthouse Performance ≥ 95 mobile on every route
- [ ] Lighthouse Accessibility = 100 on every route
- [ ] Lighthouse SEO = 100 on every route
- [ ] Lighthouse Best Practices ≥ 95 on every route
- [ ] axe-core: zero serious or critical violations on every route at 375 and 1440
- [ ] Visual regression baselines unchanged or intentionally updated
- [ ] Keyboard navigation test passes
- [ ] Reduced motion test passes
- [ ] Form integrity test passes
- [ ] Schema validation test passes
- [ ] Link integrity test passes (zero broken internal links)

## Tier 1 — Pre-launch (DO BEFORE DNS SWAP)

### Accessibility (audience-critical for Outlyer)
- [ ] Full VoiceOver pass on Mac across every route (Cmd+F5 to enable, 60-90 min)
  - Focus order is logical on every page
  - Founder cards announce as "name, role, biography" not "image, heading, paragraph"
  - Mission stanza lines are read as separate items
  - "YOU ARE AN OUTLYER" emphasis is communicated by screen reader
  - Mobile nav sheet announces correctly when opened
- [ ] Keyboard-only navigation pass on a fresh device (30 min)
- [ ] Vision deficiency screenshot review at tests/reports/colour-deficiency/ (15 min)
- [ ] WAVE browser extension pass on every route (15 min)
- [ ] Reading level check on Legacy page copy — target Flesch reading ease ≥ 60

### Performance
- [ ] WebPageTest run from London on real mid-tier Android (15 min, async)
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 on the real-Android test
- [ ] Site loads visibly on a throttled Fast 3G connection within 5s
- [ ] Test with JS disabled — critical content still visible

### Content sign-off (CLIENT ACTION REQUIRED)
- [ ] Joanne Reay approval — all routes, all copy
- [ ] Emmanuel Kelly approval — bio and any references
- [ ] Lauren Hutton approval — bio and any references
- [ ] Chris Martin team approval — bio handling and Coldplay references
- [ ] Privacy page reviewed by client's legal counsel
- [ ] Every project's year, status, synopsis confirmed accurate
- [ ] Every partner has confirmed their logo may be displayed as published

### Form and integrations
- [ ] Three live submissions through Netlify preview, confirmed received
- [ ] Form notification destination email confirmed and monitored
- [ ] One submission with industry keywords (casting, production, screenplay) — confirm not spam-filtered
- [ ] Form works with JavaScript disabled (static Netlify form fallback)

### SEO and discoverability
- [ ] Every JSON-LD block validated at https://validator.schema.org
- [ ] Every page passes https://search.google.com/test/rich-results
- [ ] sitemap.xml accessible and lists all routes
- [ ] robots.txt accessible
- [ ] llms.txt accessible and reads correctly
- [ ] OG image preview tested on LinkedIn, X, Slack

### Resilience
- [ ] 404 page renders correctly on deliberately broken URL
- [ ] Old Wix URLs redirect (/s-projects → /projects, /team-4 → /team)
- [ ] HTTPS certificate active post-DNS
- [ ] No mixed-content warnings in browser console

## Tier 2 — Within 2 weeks of launch
- [ ] BrowserStack cross-browser pass: Safari iOS, Safari macOS, Firefox, Edge, Samsung Internet
- [ ] NVDA screen reader pass (Windows)
- [ ] TalkBack screen reader pass (Android)
- [ ] One real user with assistive technology gives feedback
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Configure Plausible or alternative privacy-respecting analytics (optional)

## Tier 3 — Ongoing
- [ ] Weekly automated link checker (already in CI)
- [ ] Monthly Lighthouse regression (already in CI)
- [ ] Quarterly manual accessibility audit
- [ ] Annual full WCAG review

## Handover artefacts (for Level Group Ltd records)
- [ ] Signed Website Development and Handover Agreement
- [ ] Signed Schedule A — Acceptance
- [ ] GitHub repo ownership/admin transferred to client
- [ ] Netlify project transferred to client organisation
- [ ] DNS access returned to client
- [ ] Email confirming all access transfers, with dates
- [ ] /audit/ folder deleted from developer workstation post-acceptance
