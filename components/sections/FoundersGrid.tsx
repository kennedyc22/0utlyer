import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Image } from "../primitives/Image";
import { Section } from "../primitives/Section";
import { Text } from "../primitives/Text";
import { founders, type Founder } from "../../content/founders";

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
  marginBottom: "var(--space-16)",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
};

const roleStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-normal)",
  letterSpacing: "var(--tracking-wide)",
  fontWeight: 500 as unknown as number,
  textTransform: "uppercase",
  color: "var(--color-fg-muted)",
  margin: 0,
};

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  color: "var(--color-fg)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-small)",
  textDecoration: "none",
  marginTop: "var(--space-2)",
};

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article style={cardStyle} aria-label={founder.name}>
      <Image
        src={founder.photo.src}
        alt={founder.photo.alt}
        aspectRatio="1:1"
        sizes="(min-width:1024px) 24vw, (min-width:768px) 45vw, 100vw"
      />
      <Heading as="h3" size="display-3">
        {founder.name}
      </Heading>
      <p style={roleStyle}>{founder.role}</p>
      {founder.bio ? <Text variant="small">{founder.bio}</Text> : null}
      {founder.link ? (
        <a
          href={founder.link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="ol-link-underline"
        >
          {founder.link.label}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}

export function FoundersGrid() {
  return (
    <Section id="founders" bg="paper-warm" padding="xl">
      <Container>
        <div style={headerStyle}>
          <Eyebrow>Founders</Eyebrow>
          <Heading as="h2" size="display-2">
            The people behind Outlyer.
          </Heading>
        </div>
        <div className="ol-founders-grid" data-count={founders.length}>
          {founders.map((f) => (
            <FounderCard key={f.slug} founder={f} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
