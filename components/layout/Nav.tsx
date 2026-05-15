"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../primitives/Container";
import { Wordmark } from "./Wordmark";
import { navLinks } from "./nav-links";

const innerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: "var(--space-4)",
  gap: "var(--space-6)",
};

const listStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-6)",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const iconButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "var(--space-8)",
  height: "var(--space-8)",
  background: "transparent",
  border: "none",
  color: "var(--color-fg)",
  cursor: "pointer",
  borderRadius: "var(--radius-md)",
};

const sheetListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
  listStyle: "none",
  margin: 0,
  padding: 0,
  marginTop: "var(--space-12)",
};

const sheetLinkStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-display-3)",
  letterSpacing: "var(--tracking-tight)",
  color: "var(--color-fg)",
  textDecoration: "none",
};

const sheetHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const trigger = triggerRef.current;
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && sheet) {
        const focusables = sheet.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const firstLink = sheet?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      trigger?.focus();
    };
  }, [open]);

  return (
    <nav
      className="ol-nav"
      data-scrolled={scrolled || undefined}
      aria-label="Primary"
    >
      <Container>
        <div style={innerStyle}>
          <Wordmark />
          <ul style={listStyle} className="ol-nav-desktop">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="ol-nav-link"
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            ref={triggerRef}
            type="button"
            className="ol-nav-trigger"
            style={iconButtonStyle}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="ol-nav-sheet"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <div
        ref={sheetRef}
        id="ol-nav-sheet"
        className="ol-nav-sheet"
        data-open={open || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
      >
        <div style={sheetHeaderStyle}>
          <Wordmark />
          <button
            type="button"
            style={iconButtonStyle}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <ul style={sheetListStyle}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={sheetLinkStyle}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
