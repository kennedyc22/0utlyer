import NextImage from "next/image";
import { Container } from "../primitives/Container";
import { Section } from "../primitives/Section";
import { founders, type Founder } from "../../content/founders";

function FounderCard({ founder }: { founder: Founder }) {
  const hasBio = founder.bio.trim().length > 0;
  const showCta = hasBio && !founder.hideCta;
  return (
    <article className="ol-founder-card" aria-label={founder.name}>
      <div className="ol-founder-portrait">
        <NextImage
          src={founder.photo.src}
          alt={founder.photo.alt}
          width={400}
          height={400}
          sizes="200px"
        />
      </div>
      <h3 className="ol-founder-name">{founder.name}</h3>
      <p className="ol-founder-role">{founder.role}</p>
      {hasBio ? (
        <div className="ol-founder-overlay">
          <p className="ol-founder-bio">{founder.bio}</p>
          <span className="ol-founder-overlay-name">{founder.name}</span>
          {showCta ? (
            founder.link ? (
              <a
                className="ol-founder-cta"
                href={founder.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                View More
              </a>
            ) : (
              <a className="ol-founder-cta" href={`/team#${founder.slug}`}>
                View More
              </a>
            )
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function FoundersGrid() {
  return (
    <Section id="founders" bg="paper" padding="lg">
      <Container>
        <h2 className="ol-page-title">FOUNDERS</h2>
        <div className="ol-founders-grid" data-count={founders.length}>
          {founders.map((f) => (
            <FounderCard key={f.slug} founder={f} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
