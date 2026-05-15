import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";

export type TextTag = "p" | "span" | "div";
export type TextVariant = "body" | "lead" | "small" | "meta";

export interface TextProps {
  children: ReactNode;
  as?: TextTag;
  variant?: TextVariant;
  className?: string;
  id?: string;
  muted?: boolean;
}

const VARIANT_STYLES: Record<TextVariant, CSSProperties> = {
  body: {
    fontSize: "var(--text-body)",
    lineHeight: "var(--leading-normal)",
    letterSpacing: "var(--tracking-normal)",
    fontWeight: "var(--weight-regular)" as unknown as number,
    textTransform: "none",
  },
  lead: {
    fontSize: "var(--text-lead)",
    lineHeight: "var(--leading-snug)",
    letterSpacing: "var(--tracking-normal)",
    fontWeight: "var(--weight-regular)" as unknown as number,
    textTransform: "none",
  },
  small: {
    fontSize: "var(--text-small)",
    lineHeight: "var(--leading-normal)",
    letterSpacing: "var(--tracking-normal)",
    fontWeight: "var(--weight-regular)" as unknown as number,
    textTransform: "none",
  },
  meta: {
    fontSize: "var(--text-meta)",
    lineHeight: "var(--leading-normal)",
    letterSpacing: "var(--tracking-wide)",
    fontWeight: "var(--weight-medium)" as unknown as number,
    textTransform: "uppercase",
  },
};

export function Text({
  children,
  as = "p",
  variant = "body",
  className,
  id,
  muted = false,
}: TextProps) {
  const style: CSSProperties = {
    fontFamily: "var(--font-text)",
    color: muted ? "var(--color-fg-muted)" : "var(--color-fg)",
    margin: 0,
    ...VARIANT_STYLES[variant],
  };
  return createElement(
    as,
    { id, className, "data-variant": variant, style },
    children,
  );
}
