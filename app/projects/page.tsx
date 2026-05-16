import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { ProjectCard } from "../../components/sections/ProjectCard";
import { projects } from "../../content/projects";

export const metadata: Metadata = {
  title: "PROJECTS",
  description: "The OUTLYER slate of film and television projects.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "PROJECTS | OUTLYER",
    description: "The OUTLYER slate of film and television projects.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsIndexPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <Section bg="paper" padding="xl">
      <Container>
        <h1 className="ol-page-title">PROJECTS</h1>
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
