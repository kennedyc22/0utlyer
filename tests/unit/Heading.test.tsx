import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Heading } from "@/components/primitives";

describe("Heading", () => {
  it("renders the requested heading tag", () => {
    const { container } = render(<Heading as="h2">Title</Heading>);
    expect(container.querySelector("h2")?.textContent).toBe("Title");
  });

  it("defaults size from the tag (h1 -> display-1)", () => {
    const { container } = render(<Heading as="h1">x</Heading>);
    expect(container.querySelector("h1")?.getAttribute("data-size")).toBe(
      "display-1",
    );
  });

  it("respects an explicit size override", () => {
    const { container } = render(
      <Heading as="h3" size="display-1">
        x
      </Heading>,
    );
    expect(container.querySelector("h3")?.getAttribute("data-size")).toBe(
      "display-1",
    );
  });

  it.each(["h1", "h2", "h3", "h4", "h5", "h6"] as const)(
    "renders %s correctly",
    (tag) => {
      const { container } = render(<Heading as={tag}>x</Heading>);
      expect(container.querySelector(tag)).not.toBeNull();
    },
  );
});
