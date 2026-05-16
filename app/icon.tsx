// Next.js App Router file-based icon: serves /icon and exposes
// <link rel="icon"> automatically. Renders the Ø brand mark on black at
// 256×256 (browsers downscale to 16/32/48 cleanly).
//
// IMPORTANT: app/favicon.ico must not exist alongside this file. Browsers
// fetch /favicon.ico ahead of /icon and would otherwise display the legacy
// asset.

import { ImageResponse } from "next/og";

export const size = { width: 256, height: 256 };
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
        fontSize: 200,
        lineHeight: 1,
      }}
    >
      Ø
    </div>,
    { ...size },
  );
}
