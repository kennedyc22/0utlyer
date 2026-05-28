import NextImage from "next/image";
import type { CSSProperties } from "react";
import { Container } from "../primitives/Container";

export interface HeroProps {
  heading: string;
  sub: string;
  /** Retained for API compatibility with prior call-sites; ignored in v2. */
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
}

const sectionStyle: CSSProperties = {
  background: "var(--color-black)",
  color: "var(--color-white)",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: "var(--tracking-tight)",
  color: "var(--color-white)",
  margin: 0,
};

const subStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-lead)",
  color: "var(--color-white)",
  margin: 0,
};

export function Hero({ heading, sub }: HeroProps) {
  return (
    <section aria-label="Hero" className="ol-hero" style={sectionStyle}>
      <Container>
        <div className="ol-hero-inner">
          <div className="ol-hero-lockup">
            <NextImage
              src="/logo.avif"
              alt="0UTLYER"
              width={1200}
              height={500}
              priority
            />
          </div>
          <div className="ol-hero-copy">
            <h1 style={headingStyle}>{heading}</h1>
            <p style={subStyle}>{sub}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
