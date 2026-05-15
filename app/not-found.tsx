import type { CSSProperties } from "react";
import {
  Section,
  Container,
  Heading,
  Text,
  Button,
} from "../components/primitives";

const wrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--space-6)",
  maxWidth: "60ch",
};

const markStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-display-1)",
  lineHeight: "var(--leading-tight)",
  color: "var(--color-accent)",
  margin: 0,
};

export default function NotFound() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <div style={wrapStyle}>
          <p aria-hidden="true" style={markStyle}>
            Ø
          </p>
          <Heading as="h1">
            This isn&apos;t the one you were looking for.
          </Heading>
          <Text variant="small" muted>
            The page may have moved, or it never existed. Either way.
          </Text>
          <Button as="a" href="/" variant="primary">
            Back to home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
