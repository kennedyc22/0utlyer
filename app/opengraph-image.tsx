import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "0UTLYER — Inclusive Film & TV Production";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: -2 }}>
        0UTLYER
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#e30a17",
          letterSpacing: "0.2em",
          marginTop: 16,
        }}
      >
        INCLUSIVE FILM &amp; TV PRODUCTION
      </div>
    </div>,
    { ...size },
  );
}
