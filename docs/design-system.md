Outlyer Entertainment — Design System
Version: 1.0
Date: 15 May 2026

1. Design principles
Four rules that override everything else:

Restraint over expression. The work is the work. Design retreats so the projects, founders, and mission lead.
Editorial rhythm, not template grid. Asymmetry, deliberate negative space, varied vertical pacing. Never feels like a Squarespace.
The red is a verb. #e30a17 is used to do something — punctuate, mark, separate — never to fill. If a block is red, it's because something needed marking.
Cinematic, not corporate. Full-bleed imagery, generous type sizes at desktop, a black that's actually black. Closer to A24 / Element / See-Saw than to a SaaS marketing site.

2. Reference direction
After reviewing the audit, the recommended aesthetic axis is:
A24-influenced editorial + cinematic full-bleed imagery, anchored by typographic confidence.
Specifically:

a24films.com — type-led, image-heavy, restrained chrome
element-pictures.com — editorial weight, tight type, clean grid
see-saw-films.com — confident hero treatments, restrained palette

The Outlyer twist: that aesthetic, but the red is the brand's signature mark in a way none of those references have. Outlyer's red is doing what See-Saw's gold does — punctuating, not dominating.
3. Design tokens
All tokens defined as CSS custom properties in styles/globals.css. Tailwind reads them via theme.extend. Never hardcode a hex, px, or ms anywhere in components.
3.1 Colour
css:root {
  /* Brand */
  --color-outlyer-red: #e30a17;
  --color-outlyer-red-dark: #89070c;
  --color-outlyer-red-soft: #f06d73;

  /* Neutrals */
  --color-ink: #0a0a0a;        /* near-black, body and headings */
  --color-ink-muted: #4a4a4a;  /* secondary text */
  --color-paper: #fafaf7;      /* off-white background */
  --color-paper-warm: #f2efe8; /* tertiary surface */
  --color-line: #1f1f1f;       /* hairlines on dark; rare */
  --color-line-soft: #e5e3dc;  /* hairlines on light */

  /* Semantic */
  --color-bg: var(--color-paper);
  --color-fg: var(--color-ink);
  --color-fg-muted: var(--color-ink-muted);
  --color-accent: var(--color-outlyer-red);
  --color-accent-dark: var(--color-outlyer-red-dark);
  --color-surface: var(--color-paper-warm);
  --color-border: var(--color-line-soft);

  /* Focus */
  --color-focus-ring: var(--color-outlyer-red);
}
Colour roles, not just hex:

--color-bg — page background. Default paper.
--color-fg — primary text and UI.
--color-fg-muted — secondary copy, captions, meta.
--color-accent — the red. Used for: active nav state, link underlines on hover, mission-block typographic emphasis, error states, button primary, focus ring. Never for large fills.
--color-surface — slightly warmer neutral for cards or differentiated blocks.
--color-border — hairlines, dividers.

No dark mode in v1. The brand's identity is the warm-paper-and-black palette plus the red. Dark mode would dilute that and is non-trivial to do well for an image-led site. Revisit in v2.
3.2 Typography
Display face: Söhne Breit — not available free. Free equivalent for v1: Bricolage Grotesque (Google Fonts, OFL). Modern, slight character, holds up at 80px+. Use for headlines and the wordmark only.
Text face: Söhne → free equivalent: Inter (variable, Google Fonts, OFL). Workhorse sans, excellent at small sizes, full UI character set.
Both self-hosted via next/font/local, subsetted to Latin, font-display: swap. No Google Fonts CDN.
If Dan later wants to license Söhne or another foundry face, the swap is a one-line next/font/local change.
Type scale (clamp-based, fluid between mobile and desktop):
css:root {
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-text: 'Inter', system-ui, sans-serif;

  /* Display (headlines) — fluid */
  --text-display-1: clamp(3rem, 8vw, 6.5rem);   /* hero */
  --text-display-2: clamp(2.25rem, 5vw, 4rem);  /* section heads */
  --text-display-3: clamp(1.75rem, 3vw, 2.5rem);/* sub-section */

  /* Text */
  --text-lead: clamp(1.125rem, 1.5vw, 1.375rem);/* mission lead, hero sub */
  --text-body: 1.0625rem;                       /* 17px */
  --text-small: 0.9375rem;                      /* 15px */
  --text-meta: 0.8125rem;                       /* 13px, uppercase use */

  /* Line heights */
  --leading-tight: 1.05;   /* display */
  --leading-snug: 1.2;     /* sub-display */
  --leading-normal: 1.5;   /* body */
  --leading-relaxed: 1.7;  /* long-form legacy */

  /* Tracking */
  --tracking-tight: -0.02em;     /* display */
  --tracking-normal: 0;
  --tracking-wide: 0.08em;       /* uppercase meta */
  --tracking-wider: 0.16em;      /* nav, brand mark */

  /* Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
Usage rules:

Display 1 — one per page maximum, hero only.
Display 2 — section heads on home and long pages.
Display 3 — sub-section, founder names, project titles in cards.
Lead — first paragraph after a Display, hero sub.
Body — everything else.
Meta — uppercase labels, dates, status pills. Always letter-spacing: var(--tracking-wide).

3.3 Spacing
8-point base, plus a 4 for fine adjustments.
css:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4 */
  --space-2: 0.5rem;    /* 8 */
  --space-3: 0.75rem;   /* 12 */
  --space-4: 1rem;      /* 16 */
  --space-6: 1.5rem;    /* 24 */
  --space-8: 2rem;      /* 32 */
  --space-12: 3rem;     /* 48 */
  --space-16: 4rem;     /* 64 */
  --space-24: 6rem;     /* 96 */
  --space-32: 8rem;     /* 128 */
  --space-40: 10rem;    /* 160 */
}
Section vertical rhythm:

Mobile section padding: --space-16 top/bottom.
Tablet: --space-24.
Desktop: --space-32 to --space-40 depending on importance.

Hero gets --space-40 desktop bottom. Footer separator gets --space-32 top.
3.4 Layout
css:root {
  --container-max: 1440px;
  --container-text: 65ch;  /* long-form */
  --gutter-mobile: var(--space-6);
  --gutter-tablet: var(--space-12);
  --gutter-desktop: var(--space-16);
}
Container component centralises this — never set gutters manually in pages.
3.5 Radii, borders, shadows
css:root {
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;       /* default for cards and buttons */
  --radius-full: 9999px;  /* circular images, pills */

  --border-hairline: 1px solid var(--color-border);

  /* Shadows — used very sparingly */
  --shadow-card: 0 1px 2px rgba(10, 10, 10, 0.04), 0 8px 24px rgba(10, 10, 10, 0.06);
  --shadow-focus: 0 0 0 3px var(--color-focus-ring);
}
Default to no shadow. Shadows are a fallback only when a card genuinely needs lift; we prefer hairlines and negative space.
3.6 Motion
css:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-base: 320ms;
  --duration-slow: 600ms;
  --duration-cinematic: 1000ms;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* default */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* page transitions */
  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
}
Motion rules:

Every animation respects prefers-reduced-motion. If reduced, duration becomes --duration-instant and easing becomes linear.
Hover transitions: --duration-fast --ease-out.
Reveal-on-scroll: --duration-slow --ease-cinematic, opacity + 12px translateY only. No springs, no bounces, no rotation.
No carousels. Ever.
Page transitions in v1: none. The site is fast enough that transitions add latency without value.

3.7 Z-index scale
css:root {
  --z-base: 0;
  --z-raised: 10;
  --z-sticky-nav: 50;
  --z-overlay: 100;
  --z-modal: 200;
  --z-toast: 300;
}
3.8 Breakpoints
Tailwind defaults are fine. Standardise on:

sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1440px

4. Component primitives
Built from scratch on Tailwind. No shadcn, no UI library. The primitives:
PrimitivePurposeContainerLayout width + guttersHeadingSemantic h1–h6 with display levels 1–3 + visual overrideTextBody, lead, small, meta variantsLinkInternal/external, with underline-on-hover treatmentButtonPrimary, secondary, ghost; sizes sm/md/lgImageWrapper on next/image with aspect-ratio + blur placeholder enforcementSectionPadded vertical-rhythm wrapper with optional accent railEyebrowUppercase meta label above headingsDividerHairline divider with optional red dot punctuation
5. Component recipes (site-level)
ComponentCompositionNavContainer + wordmark + nav links + mobile sheetFooterContainer + Ø mark + copyright + Privacy link + social (if supplied)HeroSection (full-bleed) + Image background + Heading display-1 + lead Text + Button groupMissionBlockSection + Eyebrow "OUR MISSION" + Heading display-2 + structured mission stanza + red emphasis on "YOU ARE AN OUTLYER"FoundersGridSection + 4-up grid → 2-up → 1-up; each card: portrait + name + role + bio + optional external linkFeaturedProjectsSection + 3-up grid of ProjectCardProjectCardImage (1:1 or 3:4) + Eyebrow (year · status) + Heading display-3 + Text small synopsisPartnerLogoWallSection + grayscale logo grid with hover-restore-colourContactFormSection + form per PRD §3
6. Accessibility rules (non-negotiable)

Every interactive element has a visible :focus-visible state using --shadow-focus.
Skip-to-content link first in tab order.
All images: meaningful alt or alt="" if decorative. No alt="image", no filenames.
Forms: persistent labels, aria-describedby for errors, aria-live="polite" for the form-level error.
Headings: one h1 per page, no skipped levels.
Colour contrast: body text ≥ 4.5:1, large text ≥ 3:1. The red #e30a17 on --color-paper gives ~5.2:1 — passes for body. Never use red on --color-paper-warm (drops to 4.4:1 — borderline). Red on --color-ink is 3.9:1 — only for large text.

7. Imagery treatment

Portraits: 1:1 square crop, focal point on eyes, neutral background where possible. Consistent crop discipline replaces the audit's inconsistent founder portraits.
Project stills: 3:4 portrait for cards, 16:9 for project detail heroes. Always full-quality AVIF + WebP via next/image.
Logos (partners): Treated to a single monochrome dark version. Hover restores original colour. Maximum height 56px; minimum 32px. Pad to a consistent bounding box.
The Ø mark: Used as logo, favicon, and the only ornamental glyph allowed. Never as background pattern.

8. Iconography
Lucide React. Tree-shaken. Stroke 1.5px. Only used where a label alone would be ambiguous (hamburger, close, external-link arrow on partner cards, send icon on form submit). Decorative icons are absent.
9. Forbidden patterns
Things Claude Code must not generate, regardless of how natural they feel:

Drop shadows on everything.
Gradients (any).
Carousels, sliders, marquees.
Animated counters or stat bars.
"Animate on scroll" on every element. Only deliberate moments.
Hero videos with autoplay in v1.
Stock-style "modern minimalism" emoji or icon explosions.
Centred-everything layouts. Use deliberate asymmetry.
Cards with thick borders and shadows. Hairlines or nothing.
Toast notifications for form submission. Use inline states.