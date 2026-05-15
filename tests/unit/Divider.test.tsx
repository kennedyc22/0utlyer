import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "@/components/primitives";

describe("Divider", () => {
  it("renders a separator role", () => {
    const { getByRole } = render(<Divider />);
    expect(getByRole("separator")).toBeTruthy();
  });

  it("renders a single hr without dot", () => {
    const { container } = render(<Divider />);
    expect(container.querySelectorAll("hr").length).toBe(1);
    expect(container.firstElementChild?.getAttribute("data-with-dot")).toBe(
      "false",
    );
  });

  it("renders two hrs and a dot when withDot is true", () => {
    const { container } = render(<Divider withDot />);
    expect(container.querySelectorAll("hr").length).toBe(2);
    expect(container.firstElementChild?.getAttribute("data-with-dot")).toBe(
      "true",
    );
  });
});
