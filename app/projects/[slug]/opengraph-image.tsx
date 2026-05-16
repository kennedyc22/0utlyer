import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "../../../content/projects";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OUTLYER project";

export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  return [
    {
      id: "card",
      alt: project ? `${project.title} — OUTLYER` : "OUTLYER project",
      contentType,
      size,
    },
  ];
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Per-project OG: dark gradient with project title + status overlay. The hero
// asset itself is not composited because next/og requires absolute URLs for
// remote images and bundling local AVIFs into the edge function isn't worth
// the extra complexity — the title card is information-dense enough on its
// own and reads cleanly when shared.
export default async function Image({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
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
