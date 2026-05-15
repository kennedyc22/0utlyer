Outlyer Entertainment — Product SpecVersion: 1.0
Date: 15 May 2026
Owner: Dan Ford
Status: Draft for approval1. PurposeA new marketing website for Øutlyer Entertainment — a film and television production company founded by Chris Martin and Emmanuel Kelly, with a mission to feature differently-abled, neurodivergent, psychologically divergent, and primary-carer talent in front of the camera, off-screen, and on stage.The current site is on Wix. It works, but it under-serves a brand of this calibre. This rebuild is a step-change in design ambition, performance, accessibility, and discoverability — without losing the brand DNA (the red, the founders' voice, the inclusion mission as central frame).2. AudienceThree primary audiences, in priority order:
Industry buyers and commissioners — studios, streamers, broadcasters, production companies, casting directors. They arrive with intent (researching projects, founders, or partnerships) and judge the brand on perceived production quality.
Talent and the inclusion community — differently-abled performers, neurodivergent creatives, primary carers, advocates. They need to feel seen and recognise themselves in the site's language and imagery. The "YOU ARE AN OUTLYER" frame matters to them.
Press, partners, and aligned organisations — journalists writing about inclusion in film, charitable partners, funders. They need crisp facts, quotable mission language, and contactability.
Secondary audiences: existing fans of Chris Martin or Emmanuel Kelly arriving curious; AI-search surfaces (ChatGPT, Perplexity, Google AI Overviews) summarising the brand on behalf of any of the above.3. Business goals
Be perceived as a world-class production company at first impression — equal to A24, Element Pictures, or See-Saw Films in design ambition, even at lower content volume.
Make the mission unmissable and unambiguous, without sliding into charity-website tropes.
Be findable on representational-inclusion search queries that the current site doesn't rank for.
Open a clean, frictionless contact channel for industry approaches.
4. Non-goals
E-commerce of any kind.
Member accounts, login, or gated content.
A blog or news section in v1.
Multilingual / hreflang support in v1.
A CMS in v1 — content lives in the repo as MDX or TypeScript data files. Headless CMS can come later if frequency demands it.
5. Voice and content principlesDerived from the audit's verbatim content:
Confident, not earnest. The current copy says "YOU ARE AN OUTLYER" — capitalised, declarative, no apology. The new site preserves that register. No "we strive to," no "we hope to," no charity humility.
Founders speak in their own voice. Chris Martin is honorary president; Joanne Reay is CEO; Emmanuel Kelly is CVO; Lauren Hutton is CCO. Bios are first-person where possible, kept short, and don't soften credentials.
The inclusion frame is the headline, not a footnote. Mission copy sits at the top of the home page and is the first thing AI summarisers parse.
Project titles speak for themselves. No marketing puffery around individual projects. Synopsis, credits, status. Let the work be the work.
No buzzwords. "Diverse," "inclusive ecosystem," "representation matters," "DEI" are absent from the copy. The site's existence makes the point.
6. Brand DNA — what staysFrom the audit:
Primary colour: red #e30a17. Stays. It's recognisably Outlyer.
The Ø stylistic mark. Stays. Used as logo and ambient brand glyph.
The pages and IA. Home, Projects, Mission (anchor), Team, Partners, Legacy, Contact (anchor). Stays, with light expansion (light project detail pages).
The mission frame. "If you are differently-abled / neuro or psychologically divergent / have an exclusory condition / are a primary carer… YOU ARE AN OUTLYER." Stays verbatim. The audit also confirmed the live site truncates this — we restore it.
The founders. Same four people, same hierarchy (Emmanuel + Joanne as operating founders, Lauren as founding partner, Chris as honorary president).
7. Brand DNA — what changes
Typography. Current site is Wix template defaults (5+ font families including Arial, Poppins ExtraLight, Helvetica-W01-Bold, Barlow Condensed, Avenir 85 Heavy). New site uses one display face and one text face, deliberately chosen, with a defined type scale. Recommendation comes in the Design System (next message).
Layout grammar. Current site is template-driven, centred, vertically-stacked. New site uses an editorial grid with asymmetric rhythm, deliberate negative space, and cinematic full-bleed imagery.
Motion. Current site has Wix's stock fade-ins. New site has restrained, purposeful motion — page transitions, scroll-anchored image reveals, no carousels.
Image treatment. Current portraits are square-cropped at varying focal points, sized inconsistently. New site standardises portrait crop, frame, and treatment.
The red itself. Same hex, but used as a punctuation colour, not a fill — restricted to a few specific roles in the design system. The current site uses it ambiently; we tighten it.
8. Success criteriaThe site is "done" when, in this order:
Every page passes Lighthouse mobile thresholds: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100.
Every page validates against axe-core with zero serious or critical violations.
Every page has valid JSON-LD structured data appropriate to its type (Organization, Person, CreativeWork).
robots.txt, sitemap.xml, and llms.txt are present, valid, and reflect the site.
The contact form submits successfully via Netlify Forms with email notification arriving at the configured address, plus a graceful success state.
All audit content is faithfully migrated (verbatim where it appears verbatim; truncated mission copy is restored to its complete form which Dan supplies).
Manual review: the site feels like a step-change. Reviewable on a calibration call against named references (A24, Element, See-Saw).
9. Constraints
Single-developer build (you + Claude Code).
Host: Netlify, free tier acceptable for launch.
Domain: 0utlyer.com (existing, no migration).
No budget for paid fonts initially — fonts must be available via Google Fonts, Fontshare, or a similar free-for-commercial-use source. If a paid foundry face is preferred later, that's a design-system swap, not a re-architecture.
No third-party tracking beyond a privacy-respecting analytics solution (Plausible recommended, but optional in v1).
No analytics, ad pixels, or cookie banners that require consent management in v1.
10. Out of scope for v1, but considered
Headless CMS (Sanity / Contentful / Payload) — defer until project frequency justifies it.
Blog / press section.
Newsletter capture.
Project trailers / video hero on individual project pages.
Multilingual.
Animations beyond defined design-system motion.
AI search (llms.txt is in scope, but no chat agent in v1).