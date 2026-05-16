import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { SkipLink } from "../components/layout/SkipLink";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { CookieConsent } from "../components/cookies/CookieConsent";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SITE_LOCALE,
} from "../lib/seo/constants";

// Phase 6: root metadata foundation. Per-route pages extend this via the
// shared buildMetadata() helper. metadataBase is mandatory for Next.js to
// resolve relative og:image / twitter:image paths to absolute URLs.
//
// Icons are served by Next.js file-based convention: app/icon.png (256×256)
// and app/apple-icon.png (180×180). Both are generated from public/icon.avif
// by `npm run gen:favicons` (scripts/generate-favicons.ts). No `icons` block
// needed in metadata — Next auto-injects the <link> tags.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OUTLYER — Inclusive Film & TV Production",
    template: "%s — OUTLYER",
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: [
    "inclusive film production",
    "TV production company",
    "differently-abled actors",
    "neurodivergent talent",
    "Emmanuel Kelly",
    "Chris Martin Coldplay",
    "inclusion in film",
    "representation in entertainment",
  ],
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "OUTLYER — Inclusive Film & TV Production",
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: "OUTLYER — Inclusive Film & TV Production",
    description: SITE_TAGLINE,
  },
  manifest: "/manifest.webmanifest",
};

// CRITICAL: themeColor + colorScheme live in `viewport`, not `metadata` (Next.js
// 15+ breaking change). Putting them in metadata triggers framework warnings
// and they may be ignored.
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body>
        <SkipLink />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
