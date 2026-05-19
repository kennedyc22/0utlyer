"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "../primitives/Container";
import { Wordmark } from "./Wordmark";
import { navLinks } from "./nav-links";

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const HEAVY_ROUTES = new Set(["/projects", "/team", "/partners", "/legacy"]);

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

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
    <nav className="ol-nav" aria-label="Primary">
      <Container>
        <div className="ol-nav-inner">
          <Wordmark height={32} />
          <ul className="ol-nav-desktop">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="ol-nav-link"
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  prefetch={HEAVY_ROUTES.has(l.href) ? false : undefined}
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
        <div className="ol-nav-sheet-header">
          <Wordmark height={32} />
          <button
            type="button"
            className="ol-nav-trigger"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <ul className="ol-nav-sheet-list">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="ol-nav-link"
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                prefetch={HEAVY_ROUTES.has(l.href) ? false : undefined}
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
