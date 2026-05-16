// Next.js App Router file-based icon: serves /icon and exposes
// <link rel="icon"> automatically. Renders the Ø brand mark on black at 64×64
// (browsers downscale for the tab bar). Replaces the need for a separate
// favicon.png in /public — Dan can swap in a PNG/SVG asset later by adding
// /app/icon.png or /app/icon.svg, which take precedence over this generator.

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 52,
        lineHeight: 1,
      }}
    >
      Ø
    </div>,
    { ...size },
  );
}
