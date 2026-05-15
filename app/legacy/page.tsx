import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "../../components/primitives/Container";
import { Eyebrow } from "../../components/primitives/Eyebrow";
import { Heading } from "../../components/primitives/Heading";
import { Section } from "../../components/primitives/Section";
import { Text } from "../../components/primitives/Text";
import { legacyFrontmatter, legacyParagraphs } from "../../content/legacy";

export const metadata: Metadata = {
  title: legacyFrontmatter.title,
  description: legacyFrontmatter.lead,
  alternates: { canonical: "/legacy" },
  openGraph: {
    title: `${legacyFrontmatter.title} — Outlyer`,
    description: legacyFrontmatter.lead,
    url: "/legacy",
    type: "article",
  },
};

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  marginBottom: "var(--space-16)",
};

const articleStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-8)",
};

export default function LegacyPage() {
  return (
    <Section bg="paper" padding="xl" as="article">
      <Container variant="narrow">
        <header style={headerStyle}>
          <Eyebrow>{legacyFrontmatter.eyebrow}</Eyebrow>
          <Heading as="h1" size="display-1">
            {legacyFrontmatter.title}
          </Heading>
          <Text variant="lead">{legacyFrontmatter.lead}</Text>
        </header>
        <div style={articleStyle} className="ol-legacy-prose">
          {legacyParagraphs.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "ol-dropcap" : undefined}
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "var(--text-body)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--color-fg)",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
