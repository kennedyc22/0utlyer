import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "../lib/seo/constants";

// Phase 6: PWA manifest. Icons reference the static PNGs generated from
// public/icon.avif by `npm run gen:favicons` (app/icon.png, app/apple-icon.png).
// Next.js file-based icon convention auto-serves them at /icon and /apple-icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon.avif", sizes: "any", type: "image/avif" },
    ],
  };
}
