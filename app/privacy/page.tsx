import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "../../components/primitives/Container";
import { Eyebrow } from "../../components/primitives/Eyebrow";
import { Heading } from "../../components/primitives/Heading";
import { Section } from "../../components/primitives/Section";
import { Text } from "../../components/primitives/Text";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildBreadcrumb, buildWebPage } from "../../lib/seo/schema";
import { privacyBlocks, privacyFrontmatter } from "../../content/privacy";

const PRIVACY_DESCRIPTION =
  "How OUTLYER handles your data. UK GDPR-compliant privacy notice covering collection, use, retention, and your rights.";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: PRIVACY_DESCRIPTION,
  path: "/privacy",
});

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  marginBottom: "var(--space-12)",
};

const blockGapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
};

const h2Style: CSSProperties = {
  marginTop: "var(--space-8)",
  marginBottom: "var(--space-2)",
};

const ulStyle: CSSProperties = {
  paddingInlineStart: "var(--space-6)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
};

export default function PrivacyPage() {
  return (
    <Section bg="paper" padding="xl" as="article">
      <JsonLd
        data={buildWebPage({
          name: privacyFrontmatter.title,
          description: PRIVACY_DESCRIPTION,
          path: "/privacy",
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <Container variant="narrow">
        <header style={headerStyle}>
          <Eyebrow>{privacyFrontmatter.eyebrow}</Eyebrow>
          <Heading as="h1" size="display-2">
            {privacyFrontmatter.title}
          </Heading>
          <Text variant="lead">{privacyFrontmatter.lead}</Text>
          <Text variant="meta" muted>
            Last updated {privacyFrontmatter.updated}
          </Text>
        </header>
        <div style={blockGapStyle}>
          {privacyBlocks.map((block, i) => {
            if (block.kind === "h2") {
              return (
                <div key={i} style={h2Style}>
                  <Heading as="h2" size="display-3">
                    {block.text}
                  </Heading>
                </div>
              );
            }
            if (block.kind === "p") {
              return (
                <Text key={i} variant="body">
                  {block.text}
                </Text>
              );
            }
            return (
              <ul key={i} style={ulStyle}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Text variant="body" as="span">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
