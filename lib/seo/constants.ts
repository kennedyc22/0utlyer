// Phase 6: SEO/GEO constants. Single source of truth for site-wide identity
// strings used by Metadata, JSON-LD, sitemap, robots, llms.txt, and OG image
// generators.

export const SITE_URL = "https://www.0utlyer.com";
export const SITE_NAME = "0UTLYER";
export const SITE_TAGLINE =
  "A Film and TV production company with a powerful Inclusion Mission.";

// The verbatim brand mission paragraph. AI engines tend to surface schema
// descriptions when answering "what is X?" — this is the one canonical
// statement that flows into Organization.description and Twitter/OG fallbacks.
// Mirrors content/mission.ts (lead + stanza + emphasis) collapsed to a single
// quote-ready paragraph.
export const BRAND_DESCRIPTION =
  "0UTLYER is a full-service entertainment production company, committed to featuring 0UTLYERS in front of the camera, off-screen and on stage. If you are differently-abled. If you are Neuro or Psychological Divergent. If you have an exclusory condition. If you are a primary carer… YOU ARE AN 0UTLYER.";

// Default OG image path served by the dynamic generator at app/opengraph-image.tsx.
// Next.js maps the file route to /opengraph-image at the relevant URL prefix.
export const DEFAULT_OG_IMAGE = "/opengraph-image";

// TODO(seo): Dan to supply the Twitter / X handle. When null, twitter:site is
// omitted (per Phase 6 spec). Set to '@handle' once available.
export const TWITTER_HANDLE: string | null = null;

// Public-facing brand profiles. Flows into Organization.sameAs (JSON-LD) for
// entity disambiguation in search + GEO surfaces.
export const SOCIAL_PROFILES: string[] = [
  "https://www.instagram.com/0UTLYERofficial/",
];

// Locale used across OG + JSON-LD inLanguage fields. UK-based company.
export const SITE_LOCALE = "en_GB";
export const SITE_LANGUAGE = "en-GB";

// Stable JSON-LD identifiers used to cross-reference entities across the
// site-wide schema graph.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
