import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "../../../content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OUTLYER project";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Per-project OG: dark gradient with project title + status overlay. Hero
// AVIF is intentionally not composited — next/og bundling a binary at the
// edge isn't worth the complexity for a title card that reads cleanly on its
// own when shared.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "OUTLYER";
  const synopsis = project?.synopsis ?? "";
  const status = project?.status ?? "";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #1a0707 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        fontFamily: "system-ui",
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#e30a17",
          letterSpacing: "0.2em",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
        }}
      >
        OUTLYER {status ? `· ${status.toUpperCase()}` : ""}
      </div>
      <div
        style={{
          fontSize: title.length > 18 ? 96 : 128,
          fontWeight: 700,
          lineHeight: 1,
          marginTop: "auto",
        }}
      >
        {title.toUpperCase()}
      </div>
      {synopsis ? (
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            marginTop: 24,
            maxWidth: 1040,
            lineHeight: 1.3,
          }}
        >
          {synopsis}
        </div>
      ) : null}
    </div>,
    { ...size },
  );
}
