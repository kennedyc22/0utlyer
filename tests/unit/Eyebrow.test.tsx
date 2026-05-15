import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Eyebrow } from "@/components/primitives";

describe("Eyebrow", () => {
  it("renders text content", () => {
    const { getByText } = render(<Eyebrow>OUR MISSION</Eyebrow>);
    expect(getByText("OUR MISSION")).toBeTruthy();
  });

  it("omits the dot by default", () => {
    const { container } = render(<Eyebrow>label</Eyebrow>);
    expect(container.querySelectorAll("span").length).toBe(2);
  });

  it("renders a leading dot when withDot is true", () => {
    const { container } = render(<Eyebrow withDot>label</Eyebrow>);
    expect(container.querySelectorAll("span").length).toBe(3);
  });
});
