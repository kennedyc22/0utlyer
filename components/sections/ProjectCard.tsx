import NextLink from "next/link";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Text } from "../primitives/Text";
import type { Project } from "../../content/projects";

// Project banners have title + treatment baked in and varying aspect
// ratios — never force a crop. We render a plain <img> so the natural
// aspect ratio is preserved at every breakpoint and a failed asset does
// not block the rest of the grid from rendering.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <NextLink
      href={`/projects/${project.slug}`}
      className="ol-project-card"
      data-slug={project.slug}
      aria-label={`${project.title}, ${project.year}, ${project.status}`}
    >
      <div className="ol-project-card-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.hero.src} alt={project.hero.alt} loading="lazy" />
      </div>
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
