// Next.js App Router file-based Apple touch icon: serves /apple-icon at the
// recommended 180×180 size. Same Ø mark composition as app/icon.tsx so iOS
// home-screen and Safari tab badges stay visually consistent.

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        fontSize: 144,
        lineHeight: 1,
      }}
    >
      Ø
    </div>,
    { ...size },
  );
}
