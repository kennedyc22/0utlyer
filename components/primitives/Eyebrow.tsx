import type { CSSProperties, ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  withDot?: boolean;
  className?: string;
  id?: string;
}

const wrapperStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-normal)",
  letterSpacing: "var(--tracking-wider)",
  fontWeight: "var(--weight-bold)" as unknown as number,
  textTransform: "uppercase",
  color: "var(--color-accent)",
  margin: 0,
};

const dotStyle: CSSProperties = {
  display: "inline-block",
  width: "var(--space-2)",
  height: "var(--space-2)",
  borderRadius: "var(--radius-full)",
  background: "var(--color-accent)",
  flex: "none",
};

export function Eyebrow({
  children,
  withDot = false,
  className,
  id,
}: EyebrowProps) {
  return (
    <span id={id} className={className} style={wrapperStyle}>
      {withDot ? <span aria-hidden="true" style={dotStyle} /> : null}
      <span>{children}</span>
    </span>
  );
}
