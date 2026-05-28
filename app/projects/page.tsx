import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { ProjectCard } from "../../components/sections/ProjectCard";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildBreadcrumb, buildCollectionPage } from "../../lib/seo/schema";
import { projects } from "../../content/projects";
import { SITE_URL } from "../../lib/seo/constants";

const PROJECTS_DESCRIPTION =
  "The 0UTLYER slate. Film and television projects in development, production, and released — featuring 0UTLYER talent in front of and behind the camera.";

export const metadata: Metadata = buildMetadata({
  title: "Our Productions",
  description: PROJECTS_DESCRIPTION,
  path: "/projects",
});

export default function ProjectsIndexPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <Section bg="paper" padding="xl">
      <JsonLd
        data={buildCollectionPage({
          name: "Our Productions — 0UTLYER",
          description: PROJECTS_DESCRIPTION,
          path: "/projects",
          items: sorted.map((p) => ({
            url: `${SITE_URL}/projects/${p.slug}`,
            name: p.title,
            image: p.hero.src,
          })),
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Our Productions", path: "/projects" },
        ])}
      />
      <Container>
        <h1 className="ol-page-title">OUR PRODUCTIONS</h1>
        <ul className="ol-projects-grid" data-count={sorted.length}>
          {sorted.map((project) => (
            <li key={project.slug} style={{ listStyle: "none" }}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
