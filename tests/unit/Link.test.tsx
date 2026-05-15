import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Link } from "@/components/primitives";

describe("Link", () => {
  it("renders an internal link via next/link (anchor in DOM)", () => {
    const { container } = render(<Link href="/about">About</Link>);
    const a = container.querySelector("a");
    expect(a).not.toBeNull();
    expect(a?.getAttribute("href")).toBe("/about");
    expect(a?.getAttribute("target")).toBeNull();
  });

  it("renders an external link with rel and target", () => {
    const { container } = render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const a = container.querySelector("a") as HTMLAnchorElement;
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("applies the underline animation class", () => {
    const { container } = render(<Link href="/x">x</Link>);
    expect(container.querySelector("a")?.className).toContain(
      "ol-link-underline",
    );
  });
});
