import Link from "next/link";
import type { CSSProperties } from "react";

const style: CSSProperties = {
  display: "inline-flex",
  alignItems: "baseline",
  gap: "var(--space-2)",
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-semibold)" as unknown as number,
  letterSpacing: "var(--tracking-wider)",
  color: "var(--color-fg)",
  textDecoration: "none",
  textTransform: "uppercase",
  fontSize: "var(--text-body)",
  lineHeight: "var(--leading-tight)",
};

const markStyle: CSSProperties = {
  fontSize: "1.25em",
  color: "var(--color-accent)",
  lineHeight: 1,
};

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} aria-label="Outlyer home" style={style}>
      <span aria-hidden="true" style={markStyle}>
        Ø
      </span>
      <span>Outlyer</span>
    </Link>
  );
}
