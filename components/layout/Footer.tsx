import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "../primitives/Container";
import { Wordmark } from "./Wordmark";
import { navLinks } from "./nav-links";
import { social } from "../../content/social";

const footerStyle: CSSProperties = {
  borderTop: "var(--border-hairline)",
  paddingBlockStart: "var(--space-16)",
  paddingBlockEnd: "var(--space-16)",
  marginBlockStart: "var(--space-32)",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "var(--space-12)",
};

const colHeadingStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-meta)",
  fontWeight: "var(--weight-semibold)" as unknown as number,
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  color: "var(--color-fg-muted)",
  margin: 0,
  marginBlockEnd: "var(--space-4)",
};

const listStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
};

const linkStyle: CSSProperties = {
  color: "var(--color-fg)",
  textDecoration: "none",
  fontSize: "var(--text-small)",
};

const taglineStyle: CSSProperties = {
  color: "var(--color-fg-muted)",
  fontSize: "var(--text-small)",
  marginBlockStart: "var(--space-3)",
  maxWidth: "32ch",
};

const legalLineStyle: CSSProperties = {
  color: "var(--color-fg-muted)",
  fontSize: "var(--text-meta)",
  letterSpacing: "var(--tracking-wide)",
  textTransform: "uppercase",
  marginBlockStart: "var(--space-6)",
};

export function Footer() {
  return (
    <footer style={footerStyle}>
      <Container>
        <div style={gridStyle} className="ol-footer-grid">
          <div>
            <Wordmark />
            <p style={taglineStyle}>Inclusive film & television production</p>
          </div>
          <div>
            <h2 style={colHeadingStyle}>Site</h2>
            <ul style={listStyle}>
              {navLinks
                .filter((l) => !l.href.startsWith("/#"))
                .map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={linkStyle}>
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 style={colHeadingStyle}>Legal</h2>
            <ul style={listStyle}>
              <li>
                <Link href="/privacy" style={linkStyle}>
                  Privacy
                </Link>
              </li>
            </ul>
            {social.length > 0 && (
              <ul style={{ ...listStyle, marginBlockStart: "var(--space-6)" }}>
                {social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p style={legalLineStyle}>All rights reserved Ø Outlyer 2026</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
