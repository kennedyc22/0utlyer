import type { CSSProperties } from "react";
import NextLink from "next/link";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Image } from "../primitives/Image";
import { Text } from "../primitives/Text";
import type { Project } from "../../content/projects";

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
  color: "var(--color-fg)",
  textDecoration: "none",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <NextLink
      href={`/projects/${project.slug}`}
      style={cardStyle}
      data-slug={project.slug}
      aria-label={`${project.title}, ${project.year}, ${project.status}`}
    >
      <Image
        src={project.hero.src}
        alt={project.hero.alt}
        aspectRatio="3:4"
        sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw"
      />
      <Eyebrow>
        {project.year} · {project.status}
      </Eyebrow>
      <Heading as="h3" size="display-3">
        {project.title}
      </Heading>
      <Text variant="small" muted>
        {project.synopsis}
      </Text>
    </NextLink>
  );
}
