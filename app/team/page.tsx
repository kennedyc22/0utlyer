import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Container } from "../../components/primitives/Container";
import { Eyebrow } from "../../components/primitives/Eyebrow";
import { Heading } from "../../components/primitives/Heading";
import { Section } from "../../components/primitives/Section";
import { FoundersGrid } from "../../components/sections/FoundersGrid";
import { TeamCard } from "../../components/sections/TeamCard";
import { broaderTeam } from "../../content/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the founders and operating team behind Outlyer Entertainment.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team — Outlyer",
    description:
      "Meet the founders and operating team behind Outlyer Entertainment.",
    url: "/team",
    type: "website",
  },
};

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  marginBottom: "var(--space-8)",
  maxWidth: "65ch",
};

const broaderHeaderStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
  marginBottom: "var(--space-16)",
};

export default function TeamPage() {
  return (
    <>
      <Section bg="paper" padding="lg">
        <Container>
          <header style={headerStyle}>
            <Eyebrow>Meet the team</Eyebrow>
            <Heading as="h1" size="display-1">
              The team.
            </Heading>
          </header>
        </Container>
      </Section>
      <FoundersGrid />
      {broaderTeam.length > 0 ? (
        <Section bg="paper" padding="xl">
          <Container>
            <div style={broaderHeaderStyle}>
              <Eyebrow withDot>The broader team</Eyebrow>
              <Heading as="h2" size="display-2">
                Operating team.
              </Heading>
            </div>
            <div className="ol-team-grid" data-count={broaderTeam.length}>
              {broaderTeam.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
