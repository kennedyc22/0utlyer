import type { CSSProperties } from "react";
import NextLink from "next/link";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Section } from "../primitives/Section";
import { ProjectCard } from "./ProjectCard";
import { featuredProjectSlugs } from "../../content/featured-projects";
import { getProjectBySlug } from "../../content/projects";

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-4)",
  marginBottom: "var(--space-16)",
};

const footerStyle: CSSProperties = {
  marginTop: "var(--space-12)",
};

const seeAllStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-body)",
  color: "var(--color-fg)",
  textDecoration: "none",
};

export function FeaturedProjects() {
  const featured = featuredProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Section bg="paper" padding="xl">
      <Container>
        <div style={headerStyle}>
          <Eyebrow withDot>Featured Productions</Eyebrow>
          <Heading as="h2" size="display-2">
            Selected work.
          </Heading>
        </div>
        <div className="ol-featured-grid" data-count={featured.length}>
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div style={footerStyle}>
          <NextLink
            href="/projects"
            style={seeAllStyle}
            className="ol-link-underline"
          >
            See all productions →
          </NextLink>
        </div>
      </Container>
    </Section>
  );
}
