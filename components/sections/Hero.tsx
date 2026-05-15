import type { CSSProperties, ReactNode } from "react";
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Heading } from "../primitives/Heading";
import { Text } from "../primitives/Text";

export interface HeroProps {
  heading: string;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}

const wrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "min(82vh, 800px)",
  display: "flex",
  alignItems: "flex-end",
  overflow: "hidden",
  // TODO(asset): Replace with full-bleed hero image. v1 uses a 4% red tint
  // on paper bg per Phase 4a spec.
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 4%, var(--color-paper)) 0%, var(--color-paper) 100%)",
  color: "var(--color-fg)",
  paddingBlockStart: "var(--space-32)",
  paddingBlockEnd: "var(--space-40)",
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  maxWidth: "min(60ch, 100%)",
};

const ctaGroupStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "var(--space-4)",
  marginTop: "var(--space-4)",
};

export function Hero({
  heading,
  sub,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section
      aria-label="Hero"
      style={wrapperStyle}
      data-hero-image={imageSrc ? "true" : "false"}
    >
      {/* TODO(asset): When imageSrc supplied, render full-bleed next/image
          behind the content with overlay. v1 placeholder retains the tint. */}
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt ?? ""}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      ) : null}
      <Container>
        <div style={{ ...contentStyle, position: "relative", zIndex: 1 }}>
          <Heading as="h1" size="display-1">
            {heading}
          </Heading>
          <Text variant="lead">{sub}</Text>
          <div style={ctaGroupStyle}>
            <Button as="a" href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </Button>
            <Button as="a" href={secondaryCta.href} variant="ghost" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
