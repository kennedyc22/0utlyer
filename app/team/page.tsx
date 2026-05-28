import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { TeamCard } from "../../components/sections/TeamCard";
import { TeamGrid } from "../../components/sections/TeamGrid";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import {
  buildBreadcrumb,
  buildOrganization,
  buildPerson,
} from "../../lib/seo/schema";
import { broaderTeam, outlyerCircle } from "../../content/team";
import { founders } from "../../content/founders";

const TEAM_DESCRIPTION =
  "Meet the 0UTLYER team — the producers, creatives, and operators building an inclusive entertainment company.";

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
        <TeamGrid members={broaderTeam} />
        <div className="ol-team-circle">
          <h2 className="ol-page-title ol-team-circle-title">0UTLYER CIRCLE</h2>
          <p className="ol-team-circle-intro">
            The 0UTLYER Circle brings together influential leaders, strategic
            advisors and highly connected individuals who share 0UTLYER's
            long-term vision for the future of the entertainment industry.
            Through their expertise, networks and leadership, they help support
            the growth of both the company and its wider mission.
          </p>
          <ul
            className="ol-team-circle-grid"
            data-count={outlyerCircle.length}
            aria-label="0UTLYER Circle members"
          >
            {outlyerCircle.map((member) => (
              <li key={member.name} className="ol-team-circle-item">
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
