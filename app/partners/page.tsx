import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "../../components/primitives/Container";
import { Eyebrow } from "../../components/primitives/Eyebrow";
import { Heading } from "../../components/primitives/Heading";
import { Section } from "../../components/primitives/Section";
import { Text } from "../../components/primitives/Text";
import { PartnerLogoWall } from "../../components/sections/PartnerLogoWall";
import { partners } from "../../content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Outlyer collaborates with best-in-class partners who share our mission to make film more inclusive — on and off camera.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners — Outlyer",
    description:
      "Outlyer collaborates with best-in-class partners who share our mission to make film more inclusive — on and off camera.",
    url: "/partners",
    type: "website",
  },
};

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  marginBottom: "var(--space-16)",
  maxWidth: "65ch",
};

export default function PartnersPage() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <header style={headerStyle}>
          <Eyebrow>Partners</Eyebrow>
          <Heading as="h1" size="display-1">
            Partners.
          </Heading>
          <Text variant="lead">
            At OUTLYER, we collaborate with best-in-class partners who share our
            mission to make film more inclusive — on and off camera.
          </Text>
        </header>
        <PartnerLogoWall partners={partners} />
      </Container>
    </Section>
  );
}
