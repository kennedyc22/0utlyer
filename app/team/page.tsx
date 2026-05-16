import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { TeamCard } from "../../components/sections/TeamCard";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import {
  buildBreadcrumb,
  buildOrganization,
  buildPerson,
} from "../../lib/seo/schema";
import { broaderTeam } from "../../content/team";
import { founders } from "../../content/founders";

const TEAM_DESCRIPTION =
  "Meet the OUTLYER team — the producers, creatives, and operators building an inclusive entertainment company.";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description: TEAM_DESCRIPTION,
  path: "/team",
});

export default function TeamPage() {
  return (
    <Section bg="paper" padding="xl">
      <JsonLd data={buildOrganization(founders)} />
      {founders.map((f) => (
        <JsonLd key={f.slug} data={buildPerson(f)} />
      ))}
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ])}
      />
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
