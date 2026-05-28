import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Image } from "@/components/primitives";

describe("Image", () => {
  it("renders an img with required alt", () => {
    const { container } = render(
      <Image src="/logo.avif" alt="0UTLYER mark" aspectRatio="1:1" />,
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("alt")).toBe("0UTLYER mark");
  });

  it.each(["1:1", "3:4", "4:3", "16:9", "21:9"] as const)(
    "applies aspect ratio %s to the wrapper",
    (ar) => {
      const { container } = render(
        <Image src="/logo.avif" alt="x" aspectRatio={ar} />,
      );
      expect(
        container.firstElementChild?.getAttribute("data-aspect-ratio"),
      ).toBe(ar);
    },
  );
});
