import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders an h1 with the heading text and lead sub", () => {
    render(<Hero heading="Hello world" sub="A subtitle" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeTruthy();
    expect(screen.getByText("A subtitle")).toBeTruthy();
  });

  it("renders the 0UTLYER lockup image", () => {
    render(<Hero heading="x" sub="y" />);
    const img = screen.getByAltText("0UTLYER");
    expect(img).toBeTruthy();
  });
});
