import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MissionBlock } from "@/components/sections/MissionBlock";
import { mission } from "@/content/mission";

describe("MissionBlock", () => {
  it("renders an h2 with the mission heading and the #mission anchor", () => {
    const { container } = render(<MissionBlock />);
    expect(
      screen.getByRole("heading", { level: 2, name: mission.heading }),
    ).toBeTruthy();
    expect(container.querySelector("#mission")).not.toBeNull();
  });

  it("renders every stanza line as a list item", () => {
    render(<MissionBlock />);
    for (const line of mission.stanza) {
      expect(screen.getByText(line)).toBeTruthy();
    }
    const list = screen.getByLabelText("Who Outlyer is for");
    expect(list.querySelectorAll("li").length).toBe(mission.stanza.length);
  });

  it("renders the emphasis line verbatim", () => {
    render(<MissionBlock />);
    expect(screen.getByText(mission.emphasis)).toBeTruthy();
  });
});
