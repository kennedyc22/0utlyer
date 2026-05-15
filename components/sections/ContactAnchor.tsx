import type { CSSProperties } from "react";
import { Container } from "../primitives/Container";
import { Eyebrow } from "../primitives/Eyebrow";
import { Heading } from "../primitives/Heading";
import { Section } from "../primitives/Section";
import { Text } from "../primitives/Text";

const innerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  maxWidth: "60ch",
};

const mailLinkStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-lead)",
  color: "var(--color-fg)",
  textDecoration: "none",
};

// TODO(phase-5): Replace with full contact form per PRD §3.
export function ContactAnchor() {
  return (
    <Section id="contact" bg="ink" padding="xl">
      <Container>
        <div style={innerStyle}>
          <Eyebrow withDot>Contact</Eyebrow>
          <Heading as="h2" size="display-2">
            Get in touch.
          </Heading>
          <Text variant="lead">
            Press, partnerships, and project submissions — the full contact form
            is coming. For now, reach us directly.
          </Text>
          <a
            href="mailto:hello@0utlyer.com"
            style={mailLinkStyle}
            className="ol-link-underline"
            data-testid="contact-anchor-mailto"
          >
            hello@0utlyer.com
          </a>
        </div>
      </Container>
    </Section>
  );
}
