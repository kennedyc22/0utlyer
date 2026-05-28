"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "../primitives/Container";
import { Wordmark } from "./Wordmark";
import { navItems, type NavGroup, type NavLink } from "./nav-links";

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function isGroupActive(pathname: string, group: NavGroup) {
  return group.items.some((link) => isActive(pathname, link.href));
}

const HEAVY_ROUTES = new Set(["/projects", "/team", "/partners", "/legacy"]);

function PrimaryNavLink({
  link,
  pathname,
  onNavigate,
  className = "ol-nav-link",
}: {
  link: NavLink;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label} (opens in new tab)`}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className={className}
      aria-current={isActive(pathname, link.href) ? "page" : undefined}
      prefetch={HEAVY_ROUTES.has(link.href) ? false : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

const DROPDOWN_CLOSE_DELAY_MS = 150;

function NavDropdown({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = isGroupActive(pathname, group);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), DROPDOWN_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="ol-nav-dropdown"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="ol-nav-link ol-nav-dropdown-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "true" : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {group.label}
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      <ul
        id={panelId}
        className="ol-nav-dropdown-panel"
        hidden={!open}
        role="list"
      >
        {group.items.map((link) => (
          <li key={link.href}>
            <PrimaryNavLink
              link={link}
              pathname={pathname}
              className="ol-nav-dropdown-link"
              onNavigate={() => setOpen(false)}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

function NavSheetGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <li className="ol-nav-sheet-group">
      <p className="ol-nav-sheet-group-label">{group.label}</p>
      <ul className="ol-nav-sheet-sublist">
        {group.items.map((link) => (
          <li key={link.href}>
            <PrimaryNavLink
              link={link}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

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
            {navItems.map((item) =>
              item.type === "link" ? (
                <li key={item.link.href}>
                  <PrimaryNavLink link={item.link} pathname={pathname} />
                </li>
              ) : (
                <NavDropdown
                  key={item.group.label}
                  group={item.group}
                  pathname={pathname}
                />
              ),
            )}
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
          {navItems.map((item) =>
            item.type === "link" ? (
              <li key={item.link.href}>
                <PrimaryNavLink
                  link={item.link}
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ) : (
              <NavSheetGroup
                key={item.group.label}
                group={item.group}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}
