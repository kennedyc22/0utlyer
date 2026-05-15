import type { CSSProperties, ReactNode } from "react";

export type ContainerVariant = "default" | "narrow" | "wide";

export interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
  className?: string;
  id?: string;
}

const VARIANT_STYLES: Record<ContainerVariant, CSSProperties> = {
  default: {
    maxWidth: "var(--container-max)",
    paddingInline: "var(--gutter-mobile)",
    marginInline: "auto",
    width: "100%",
  },
  narrow: {
    maxWidth: "var(--container-text)",
    paddingInline: "var(--gutter-mobile)",
    marginInline: "auto",
    width: "100%",
  },
  wide: {
    maxWidth: "100%",
    paddingInline: "0",
    marginInline: "auto",
    width: "100%",
  },
};

export function Container({
  children,
  variant = "default",
  as: Tag = "div",
  className,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={className}
      data-variant={variant}
      style={VARIANT_STYLES[variant]}
    >
      {children}
    </Tag>
  );
}
