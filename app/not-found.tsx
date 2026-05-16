import type { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import type { CSSProperties } from "react";
import { Section, Container, Button } from "../components/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const wrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--space-6)",
  textAlign: "center",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-display-2)",
  fontWeight: 700,
  color: "var(--color-white)",
  margin: 0,
};

const linkRowStyle: CSSProperties = {
  display: "flex",
  gap: "var(--space-4)",
  flexWrap: "wrap",
  justifyContent: "center",
};

export default function NotFound() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <div style={wrapStyle}>
          <NextImage
            src="/icon.avif"
            alt=""
            width={200}
            height={200}
            unoptimized
          />
          <h1 style={headingStyle}>
            This isn&apos;t the one you were looking for.
          </h1>
          <div style={linkRowStyle}>
            <Button as="a" href="/" variant="primary">
              Back to home
            </Button>
            <NextLink href="/projects" className="ol-link-underline">
              View projects
            </NextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
