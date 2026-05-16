import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "../lib/seo/constants";

// Phase 6: PWA manifest. Icons point at the file-based generators in
// app/icon.tsx (64×64) and app/apple-icon.tsx (180×180); the AVIF source in
// /public/icon.avif is offered as a vector-ish "any size" fallback.
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
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon.avif", sizes: "any", type: "image/avif" },
    ],
  };
}
