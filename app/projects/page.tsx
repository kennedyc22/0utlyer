import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Eyebrow } from "../../components/primitives/Eyebrow";
import { Heading } from "../../components/primitives/Heading";
import { Section } from "../../components/primitives/Section";
import { Text } from "../../components/primitives/Text";
import { ProjectCard } from "../../components/sections/ProjectCard";
import { projects } from "../../content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The Outlyer slate — ten film and television projects in development and production, made with inclusion at the centre.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Outlyer",
    description:
      "The Outlyer slate — ten film and television projects in development and production, made with inclusion at the centre.",
    url: "/projects",
    type: "website",
  },
};

const headerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "var(--space-6)",
  marginBottom: "var(--space-16)",
  maxWidth: "65ch",
};

export default function ProjectsIndexPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <Section bg="paper" padding="xl">
      <Container>
        <header style={headerStyle}>
          <Eyebrow>Our Work</Eyebrow>
          <Heading as="h1" size="display-2">
            Projects.
          </Heading>
          {/* TODO(content): projects-index.lead — Dan to replace neutral placeholder. */}
          <Text variant="lead" muted>
            A slate of film and television projects in development across
            genres, united by Outlyer&rsquo;s inclusion mission.
          </Text>
        </header>
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
