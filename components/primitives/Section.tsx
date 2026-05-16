import type { CSSProperties, ReactNode } from "react";

export type SectionBg = "paper" | "paper-warm" | "ink";
export type SectionPadding = "sm" | "md" | "lg" | "xl";

export interface SectionProps {
  children: ReactNode;
  bg?: SectionBg;
  padding?: SectionPadding;
  accentRail?: boolean;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article" | "header" | "footer";
}

// Phase 4 fix: the brand is dark. All Section variants now resolve to a
// black-or-near-black surface with white foreground. The variant names are
// retained for API compatibility (and the existing test matrix).
const BG_TO_VAR: Record<SectionBg, string> = {
  paper: "var(--color-bg)",
  "paper-warm": "var(--color-surface)",
  ink: "var(--color-black)",
};

const FG_FOR_BG: Record<SectionBg, string> = {
  paper: "var(--color-fg)",
  "paper-warm": "var(--color-fg)",
  ink: "var(--color-fg)",
};

const PADDING_TO_VAR: Record<SectionPadding, string> = {
  sm: "var(--space-16)",
  md: "var(--space-24)",
  lg: "var(--space-32)",
  xl: "var(--space-40)",
};

export function Section({
  children,
  bg = "paper",
  padding = "md",
  accentRail = false,
  className,
  id,
  as: Tag = "section",
}: SectionProps) {
  const style: CSSProperties = {
    position: "relative",
    background: BG_TO_VAR[bg],
    color: FG_FOR_BG[bg],
    paddingBlock: PADDING_TO_VAR[padding],
  };

  const railStyle: CSSProperties = {
    position: "absolute",
    insetBlock: 0,
    left: 0,
    width: "2px",
    background: "var(--color-accent)",
  };

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      data-bg={bg}
      data-padding={padding}
      data-accent-rail={accentRail ? "true" : "false"}
    >
      {accentRail ? (
        <span aria-hidden="true" className="ol-accent-rail" style={railStyle} />
      ) : null}
      {children}
    </Tag>
  );
}
