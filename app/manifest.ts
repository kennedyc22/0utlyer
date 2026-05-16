import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "../lib/seo/constants";

// Phase 6: PWA manifest. AVIF in manifest icons is broadly supported by 2026
// browsers but not universally — TODO(asset) for Dan to add PNG fallbacks
// (192x192 + 512x512) once available.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/icon.avif", sizes: "any", type: "image/avif" }],
  };
}
