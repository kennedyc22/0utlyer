import Link from "next/link";
import { Container } from "../primitives/Container";
import { Wordmark } from "./Wordmark";
import { navLinks } from "./nav-links";

const HEAVY_ROUTES = new Set(["/projects", "/team", "/partners", "/legacy"]);

export function Footer() {
  return (
    <footer className="ol-footer">
      <Container>
        <div className="ol-footer-inner">
          <Wordmark height={36} />
          <ul className="ol-footer-nav" aria-label="Footer">
            {navLinks.map((l) => (
              <li key={l.href}>
                {l.external ? (
                  <a
                    href={l.href}
                    className="ol-nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="ol-nav-link"
                    prefetch={HEAVY_ROUTES.has(l.href) ? false : undefined}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-meta)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--color-white)",
            }}
          >
            All rights reserved Ø 0UTLYER 2026
          </p>
          <p style={{ margin: 0 }}>
            <Link
              href="/privacy"
              className="ol-nav-link"
              style={{ fontSize: "var(--text-meta)" }}
            >
              Privacy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
