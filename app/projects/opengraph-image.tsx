import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Our Productions — 0UTLYER";

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
        0UTLYER
      </div>
      <div style={{ fontSize: 144, fontWeight: 700, lineHeight: 1 }}>
        OUR PRODUCTIONS
      </div>
      <div
        style={{
          fontSize: 28,
          color: "rgba(255,255,255,0.7)",
          marginTop: 24,
          maxWidth: 900,
        }}
      >
        The 0UTLYER slate — film and television projects.
      </div>
    </div>,
    { ...size },
  );
}
