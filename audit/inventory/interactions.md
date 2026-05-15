# Interactions & motion (observed)

This file lists interactions detected during automated capture. Manual review
may surface additional motion that did not trigger during the script run.

- Page load: `networkidle` reached for each audited URL (logged in console).
- Lazy-loaded content: a 2s settle delay was used after navigation; any
  content that requires user scrolling or hovering to materialise was not
  triggered by the harness.
- Form submission flow: not executed (capture is read-only).
- Mobile nav behaviour: see `screenshots/full-page/home-375.png` for the
  collapsed state.
