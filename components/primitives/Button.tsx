import type { CSSProperties, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type CommonButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  id?: string;
  disabled?: boolean;
};

type ButtonAsButton = CommonButtonProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: never;
};

type ButtonAsAnchor = CommonButtonProps & {
  as: "a";
  href: string;
  external?: boolean;
  type?: never;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const SIZE_STYLES: Record<ButtonSize, CSSProperties> = {
  sm: {
    paddingBlock: "var(--space-2)",
    paddingInline: "var(--space-4)",
    fontSize: "var(--text-small)",
  },
  md: {
    paddingBlock: "var(--space-3)",
    paddingInline: "var(--space-6)",
    fontSize: "var(--text-body)",
  },
  lg: {
    paddingBlock: "var(--space-4)",
    paddingInline: "var(--space-8)",
    fontSize: "var(--text-lead)",
  },
};

const VARIANT_STYLES: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--color-accent)",
    color: "var(--color-white)",
    border: "1px solid var(--color-accent)",
    fontWeight: 700 as unknown as number,
  },
  secondary: {
    background: "var(--color-white)",
    color: "var(--color-black)",
    border: "1px solid var(--color-white)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-white)",
    border: "1px solid var(--color-white)",
  },
};

function buildStyle(variant: ButtonVariant, size: ButtonSize): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-text)",
    fontWeight: "var(--weight-medium)" as unknown as number,
    lineHeight: "var(--leading-normal)",
    letterSpacing: "var(--tracking-normal)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition:
      "background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
    textDecoration: "none",
    ...SIZE_STYLES[size],
    ...VARIANT_STYLES[variant],
  };
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    id,
    disabled,
  } = props;
  const style = buildStyle(variant, size);

  if (props.as === "a") {
    const rel = props.external ? "noopener noreferrer" : undefined;
    const target = props.external ? "_blank" : undefined;
    return (
      <a
        id={id}
        href={props.href}
        className={className}
        style={style}
        target={target}
        rel={rel}
        onClick={props.onClick}
        data-variant={variant}
        data-size={size}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={props.type ?? "button"}
      className={className}
      style={style}
      onClick={props.onClick}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  );
}
