import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { TeamCard } from "../../components/sections/TeamCard";
import { broaderTeam } from "../../content/team";

export const metadata: Metadata = {
  title: "TEAM",
  description: "Meet the OUTLYER team.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "TEAM | OUTLYER",
    description: "Meet the OUTLYER team.",
    url: "/team",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <h1 className="ol-page-title">MEET THE TEAM</h1>
        <div className="ol-team-grid" data-count={broaderTeam.length}>
          {broaderTeam.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
