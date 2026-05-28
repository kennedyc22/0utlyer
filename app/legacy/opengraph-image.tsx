import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Legacy — The Kingdom of O — 0UTLYER";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(135deg, #000 0%, #1a0707 60%, #2a0d0d 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: 80,
        fontFamily: "system-ui",
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: "#e30a17",
          letterSpacing: "0.2em",
          marginBottom: 24,
        }}
      >
        0UTLYER · LEGACY
      </div>
      <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1 }}>
        THE KINGDOM OF O
      </div>
      <div
        style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.75)",
          marginTop: 24,
          maxWidth: 900,
        }}
      >
        A world-changing partnership between Cambridge University and 0UTLYER.
      </div>
    </div>,
    { ...size },
  );
}
