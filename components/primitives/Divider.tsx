import type { CSSProperties } from "react";

export interface DividerProps {
  withDot?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export function Divider({
  withDot = false,
  className,
  id,
  ariaLabel,
}: DividerProps) {
  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    blockSize: "var(--space-2)",
  };

  const lineStyle: CSSProperties = {
    flex: 1,
    height: "1px",
    background: "var(--color-border)",
    border: "none",
    margin: 0,
  };

  const dotStyle: CSSProperties = {
    width: "var(--space-2)",
    height: "var(--space-2)",
    borderRadius: "var(--radius-full)",
    background: "var(--color-accent)",
    margin: "0 var(--space-3)",
    flex: "none",
  };

  return (
    <div
      id={id}
      className={className}
      role="separator"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
      style={wrapperStyle}
      data-with-dot={withDot ? "true" : "false"}
    >
      <hr role="presentation" style={lineStyle} />
      {withDot ? <span aria-hidden="true" style={dotStyle} /> : null}
      {withDot ? <hr role="presentation" style={lineStyle} /> : null}
    </div>
  );
}
