import type { CSSProperties } from "react";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Section } from "../primitives/Section";
import { Text } from "../primitives/Text";
import { mission } from "../../content/mission";

const innerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-8)",
  maxWidth: "65ch",
};

const stanzaStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-lead)",
  lineHeight: "var(--leading-relaxed)",
  color: "var(--color-fg)",
  textAlign: "left",
};

const emphasisStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-display-2)",
  lineHeight: "var(--leading-tight)",
  letterSpacing: "var(--tracking-tight)",
  fontWeight: 700 as unknown as number,
  color: "var(--color-accent)",
  margin: 0,
  marginTop: "var(--space-4)",
};

export function MissionBlock() {
  return (
    <Section id="mission" bg="paper" padding="xl" accentRail>
      <Container>
        <div style={innerStyle}>
          <Eyebrow withDot>{mission.eyebrow}</Eyebrow>
          <Heading as="h2" size="display-2">
            {mission.heading}
          </Heading>
          <Text variant="lead">{mission.lead}</Text>
          <ul style={stanzaStyle} aria-label="Who Outlyer is for">
            {mission.stanza.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p style={emphasisStyle}>{mission.emphasis}</p>
        </div>
      </Container>
    </Section>
  );
}
