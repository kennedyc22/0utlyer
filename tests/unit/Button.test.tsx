import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "@/components/primitives";

describe("Button", () => {
  it("renders a <button> by default", () => {
    const { container } = render(<Button>Go</Button>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe("BUTTON");
    expect(el.getAttribute("type")).toBe("button");
  });

  it("renders an anchor when as='a'", () => {
    const { container } = render(
      <Button as="a" href="/x">
        Go
      </Button>,
    );
    const el = container.firstElementChild as HTMLAnchorElement;
    expect(el.tagName).toBe("A");
    expect(el.getAttribute("href")).toBe("/x");
  });

  it("anchor external adds rel and target", () => {
    const { container } = render(
      <Button as="a" href="https://x" external>
        Go
      </Button>,
    );
    const el = container.firstElementChild as HTMLAnchorElement;
    expect(el.getAttribute("target")).toBe("_blank");
    expect(el.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it.each(["primary", "secondary", "ghost"] as const)(
    "renders variant %s",
    (variant) => {
      const { container } = render(<Button variant={variant}>x</Button>);
      expect(container.firstElementChild?.getAttribute("data-variant")).toBe(
        variant,
      );
    },
  );

  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    const { container } = render(<Button size={size}>x</Button>);
    expect(container.firstElementChild?.getAttribute("data-size")).toBe(size);
  });
});
