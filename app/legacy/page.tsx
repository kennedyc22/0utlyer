import type { Metadata } from "next";
import NextLink from "next/link";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildArticle, buildBreadcrumb } from "../../lib/seo/schema";
import { legacyFrontmatter, legacyParagraphs } from "../../content/legacy";

// TODO(seo): datePublished for the Legacy article — Dan to confirm. The audit
// page references a February 2025 Cambridge symposium so a placeholder of
// 2025-02-01 would be reasonable, but leave undefined until confirmed.
const LEGACY_DESCRIPTION =
  "The story behind OUTLYER. The Kingdom of O — a world-changing partnership between Cambridge University and OUTLYER to build the first fully accessible and sustainable experience park.";

export const metadata: Metadata = buildMetadata({
  title: "Legacy — The Kingdom of O",
  description: LEGACY_DESCRIPTION,
  path: "/legacy",
  type: "article",
});

// Split the body copy: the first two paragraphs sit above the Cambridge
// image card; the remainder sits below the red partnership banner.
const FIRST_BLOCK = 2;

export default function LegacyPage() {
  const aboveImage = legacyParagraphs.slice(0, FIRST_BLOCK);
  const belowImage = legacyParagraphs.slice(FIRST_BLOCK);

  return (
    <article className="ol-legacy">
      <JsonLd
        data={buildArticle({
          headline: "The Kingdom of O",
          description: LEGACY_DESCRIPTION,
          path: "/legacy",
          image: "/legacy-images/Cambridge.avif",
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Legacy", path: "/legacy" },
        ])}
      />
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
          alt={legacyFrontmatter.lead}
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
        <p className="ol-legacy-cta">
          <NextLink href="/projects" className="ol-link-underline">
            Explore the OUTLYER slate →
          </NextLink>
        </p>
      </section>
    </article>
  );
}
