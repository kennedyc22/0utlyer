import type { Metadata } from "next";
import { legacyFrontmatter, legacyParagraphs } from "../../content/legacy";

export const metadata: Metadata = {
  title: "LEGACY",
  description: legacyFrontmatter.lead,
  alternates: { canonical: "/legacy" },
  openGraph: {
    title: "LEGACY | OUTLYER",
    description: legacyFrontmatter.lead,
    url: "/legacy",
    type: "article",
  },
};

// Split the body copy: the first two paragraphs sit above the Cambridge
// image card; the remainder sits below the red partnership banner.
const FIRST_BLOCK = 2;

export default function LegacyPage() {
  const aboveImage = legacyParagraphs.slice(0, FIRST_BLOCK);
  const belowImage = legacyParagraphs.slice(FIRST_BLOCK);

  return (
    <article className="ol-legacy">
      <header className="ol-legacy-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/legacy-images/Ko0-Logo.avif"
          alt="The Kingdom of O"
          className="ol-legacy-mark"
        />
        <h1 className="ol-page-title">THE KINGDOM OF O</h1>
      </header>

      <section className="ol-legacy-body">
        {aboveImage.map((p, i) => (
          <p key={`a-${i}`}>{p}</p>
        ))}
      </section>

      <figure className="ol-legacy-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/legacy-images/Cambridge.avif"
          alt="King's College Chapel, University of Cambridge."
          className="ol-legacy-figure-bg"
        />
        <div className="ol-legacy-figure-tl" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.avif" alt="" className="ol-legacy-figure-logo" />
        </div>
        <div className="ol-legacy-figure-br" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/legacy-images/university of Cambridge’s Engineering Design Centre logo.avif"
            alt=""
            className="ol-legacy-figure-cambridge"
          />
        </div>
        <figcaption className="ol-legacy-figure-caption">
          A world-changing partnership between Cambridge University and OUTLYER
        </figcaption>
      </figure>

      <section className="ol-legacy-body">
        {belowImage.map((p, i) => (
          <p key={`b-${i}`}>{p}</p>
        ))}
      </section>
    </article>
  );
}
