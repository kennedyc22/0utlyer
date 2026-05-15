import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "display-1" | "display-2" | "display-3";

export interface HeadingProps {
  children: ReactNode;
  as: HeadingTag;
  size?: HeadingSize;
  className?: string;
  id?: string;
}

const DEFAULT_SIZE_FOR_TAG: Record<HeadingTag, HeadingSize> = {
  h1: "display-1",
  h2: "display-2",
  h3: "display-3",
  h4: "display-3",
  h5: "display-3",
  h6: "display-3",
};

const SIZE_STYLES: Record<HeadingSize, CSSProperties> = {
  "display-1": {
    fontSize: "var(--text-display-1)",
    lineHeight: "var(--leading-tight)",
    letterSpacing: "var(--tracking-tight)",
    fontWeight: "var(--weight-semibold)" as unknown as number,
  },
  "display-2": {
    fontSize: "var(--text-display-2)",
    lineHeight: "var(--leading-tight)",
    letterSpacing: "var(--tracking-tight)",
    fontWeight: "var(--weight-semibold)" as unknown as number,
  },
  "display-3": {
    fontSize: "var(--text-display-3)",
    lineHeight: "var(--leading-snug)",
    letterSpacing: "var(--tracking-normal)",
    fontWeight: "var(--weight-medium)" as unknown as number,
  },
};

export function Heading({ children, as, size, className, id }: HeadingProps) {
  const resolved = size ?? DEFAULT_SIZE_FOR_TAG[as];
  const style: CSSProperties = {
    fontFamily: "var(--font-display)",
    color: "var(--color-fg)",
    margin: 0,
    ...SIZE_STYLES[resolved],
  };
  return createElement(
    as,
    { id, className, "data-size": resolved, style },
    children,
  );
}
