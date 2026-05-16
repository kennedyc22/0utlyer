import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Container } from "../../../components/primitives/Container";
import { Eyebrow } from "../../../components/primitives/Eyebrow";
import { Heading } from "../../../components/primitives/Heading";
import { Image } from "../../../components/primitives/Image";
import { Section } from "../../../components/primitives/Section";
import { Text } from "../../../components/primitives/Text";
import { JsonLd } from "../../../components/seo/JsonLd";
import { buildMetadata } from "../../../lib/seo/build-metadata";
import { buildBreadcrumb, buildMovie } from "../../../lib/seo/schema";
import { getProjectBySlug, projects } from "../../../content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.synopsis,
    path: `/projects/${project.slug}`,
    image: project.ogImage,
    type: "article",
  });
}

const backLinkStyle: CSSProperties = {
  display: "inline-block",
  marginBottom: "var(--space-8)",
  color: "var(--color-fg)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-small)",
  textDecoration: "none",
};

const heroWrapStyle: CSSProperties = {
  width: "100%",
  marginBottom: "var(--space-16)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  marginBottom: "var(--space-12)",
  maxWidth: "65ch",
};

const eyebrowRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--space-3)",
  alignItems: "center",
};

const creditsHeaderStyle: CSSProperties = {
  marginBottom: "var(--space-8)",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Section bg="paper" padding="xl">
      <JsonLd data={buildMovie(project)} />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <Container>
        <NextLink
          href="/projects"
          style={backLinkStyle}
          className="ol-link-underline"
        >
          ← All projects
        </NextLink>

        <div style={heroWrapStyle} className="ol-project-hero">
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            aspectRatio="16:9"
            priority
            sizes="100vw"
          />
        </div>

        <header style={headerStyle}>
          <div style={eyebrowRowStyle}>
            <Eyebrow>{project.year}</Eyebrow>
            <span aria-hidden="true">·</span>
            <Eyebrow>{project.status}</Eyebrow>
          </div>
          <Heading as="h1" size="display-1">
            {project.title}
          </Heading>
          <Text variant="lead">{project.synopsis}</Text>
        </header>

        {project.description ? (
          <Text variant="body" muted className="ol-project-description">
            {project.description}
          </Text>
        ) : null}

        {project.credits.length > 0 ? (
          <section aria-labelledby="project-credits-heading">
            <div style={creditsHeaderStyle}>
              <Eyebrow id="project-credits-heading">Credits</Eyebrow>
            </div>
            <dl className="ol-credits-grid">
              {project.credits.map((c, i) => (
                <div key={`${c.role}-${i}`} className="ol-credit">
                  <dt>
                    <Text variant="meta" muted>
                      {c.role}
                    </Text>
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <Text variant="body">{c.name}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </Container>
    </Section>
  );
}
