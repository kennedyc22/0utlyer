import NextImage from "next/image";
import type { CSSProperties } from "react";
import { Section, Container, Button } from "../components/primitives";

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

export default function NotFound() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <div style={wrapStyle}>
          <NextImage src="/icon.avif" alt="" width={200} height={200} />
          <h1 style={headingStyle}>
            This isn&apos;t the one you were looking for.
          </h1>
          <Button as="a" href="/" variant="primary">
            Back to home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
