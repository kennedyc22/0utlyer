import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Section } from "@/components/primitives";

describe("Section", () => {
  it("renders a <section> by default", () => {
    const { container } = render(<Section>x</Section>);
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });

  it.each(["paper", "paper-warm", "ink"] as const)("supports bg=%s", (bg) => {
    const { container } = render(<Section bg={bg}>x</Section>);
    expect(container.firstElementChild?.getAttribute("data-bg")).toBe(bg);
  });

  it.each(["sm", "md", "lg", "xl"] as const)(
    "supports padding=%s",
    (padding) => {
      const { container } = render(<Section padding={padding}>x</Section>);
      expect(container.firstElementChild?.getAttribute("data-padding")).toBe(
        padding,
      );
    },
  );

  it("renders accent rail span when enabled", () => {
    const { container } = render(<Section accentRail>x</Section>);
    expect(container.querySelector(".ol-accent-rail")).not.toBeNull();
  });

  it("omits accent rail by default", () => {
    const { container } = render(<Section>x</Section>);
    expect(container.querySelector(".ol-accent-rail")).toBeNull();
  });
});
