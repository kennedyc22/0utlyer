import NextLink from "next/link";
import type { CSSProperties, ReactNode } from "react";

export type LinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
};

const linkStyle: CSSProperties = {
  color: "var(--color-fg)",
  textDecoration: "none",
  fontFamily: "var(--font-text)",
  cursor: "pointer",
};

export function Link({
  href,
  children,
  external = false,
  className,
  id,
  ariaLabel,
}: LinkProps) {
  const combined = ["ol-link-underline", className].filter(Boolean).join(" ");

  if (external) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={combined}
        style={linkStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      id={id}
      href={href}
      aria-label={ariaLabel}
      className={combined}
      style={linkStyle}
    >
      {children}
    </NextLink>
  );
}
