import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FoundersGrid } from "@/components/sections/FoundersGrid";
import { founders } from "@/content/founders";

describe("FoundersGrid", () => {
  it("renders the #founders anchor and one article per founder", () => {
    const { container } = render(<FoundersGrid />);
    expect(container.querySelector("#founders")).not.toBeNull();
    expect(container.querySelectorAll("article").length).toBe(founders.length);
  });

  it("renders each founder's name as an h3 with role text", () => {
    render(<FoundersGrid />);
    for (const f of founders) {
      expect(
        screen.getByRole("heading", { level: 3, name: f.name }),
      ).toBeTruthy();
      expect(screen.getByText(f.role)).toBeTruthy();
    }
  });
});
