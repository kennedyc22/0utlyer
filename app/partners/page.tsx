import type { Metadata } from "next";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildBreadcrumb, buildWebPage } from "../../lib/seo/schema";
import { partners } from "../../content/partners";

const PARTNERS_DESCRIPTION =
  "OUTLYER collaborates with best-in-class partners who share our mission to make film more inclusive — on and off camera.";

export const metadata: Metadata = buildMetadata({
  title: "Partners",
  description: PARTNERS_DESCRIPTION,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={buildWebPage({
          name: "Partners — OUTLYER",
          description: PARTNERS_DESCRIPTION,
          path: "/partners",
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ])}
      />
      <section className="ol-partners-intro" aria-label="Partners overview">
        <div className="ol-partners-intro-left">
          <h1>
            At OUTLYER, we collaborate with best-in-class partners who share our
            mission to make film more inclusive — on and off camera.
          </h1>
          <span className="ol-partners-intro-rule" aria-hidden="true" />
        </div>
        <div className="ol-partners-intro-right">
          <p>
            From world-leading studios and post houses to visionary brands and
            social impact organisations, our partners are more than
            collaborators &mdash; they&rsquo;re co-creators of a new industry
            standard. Together, we&rsquo;re building a future where
            accessibility, creativity, and excellence coexist seamlessly.
          </p>
          <p>
            Each partnership is chosen with purpose: to amplify underrepresented
            voices, pioneer sustainable production practices, and deliver
            world-class storytelling that reaches and inspires global audiences.
          </p>
          <p>
            Because when the right people come together, inclusion becomes
            innovation.
          </p>
        </div>
      </section>

      <section className="ol-partners-grid-section" aria-label="Partners">
        <ul className="ol-partners-grid" data-count={partners.length}>
          {partners.map((p) => (
            <li key={p.name} className="ol-partner-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo.src} alt={p.logo.alt} loading="lazy" />
              <span className="ol-partner-card-title">
                {p.name.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
