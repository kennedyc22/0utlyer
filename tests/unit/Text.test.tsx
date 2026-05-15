import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Text } from "@/components/primitives";

describe("Text", () => {
  it("defaults to <p> with variant body", () => {
    const { container } = render(<Text>hi</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("P");
    expect(el.getAttribute("data-variant")).toBe("body");
  });

  it.each(["p", "span", "div"] as const)("renders as %s", (as) => {
    const { container } = render(<Text as={as}>x</Text>);
    expect(container.firstElementChild?.tagName).toBe(as.toUpperCase());
  });

  it.each(["body", "lead", "small", "meta"] as const)(
    "applies variant %s",
    (variant) => {
      const { container } = render(<Text variant={variant}>x</Text>);
      expect(container.firstElementChild?.getAttribute("data-variant")).toBe(
        variant,
      );
    },
  );

  it("renders muted text", () => {
    const { container } = render(<Text muted>x</Text>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.color).toContain("color-fg-muted");
  });
});
