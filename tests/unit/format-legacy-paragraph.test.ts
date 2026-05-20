import { describe, expect, it } from "vitest";
import { formatLegacyParagraph } from "../../lib/format-legacy-paragraph";

const NBSP = "\u00A0";

describe("formatLegacyParagraph", () => {
  it("keeps The Kingdom Of O on one line", () => {
    const out = formatLegacyParagraph(
      "The focal project will be The Kingdom Of O.",
    );
    expect(out).toContain(`The${NBSP}Kingdom${NBSP}Of${NBSP}O.`);
    expect(out).not.toMatch(/Of O\./);
  });

  it("binds the last two words of other sentences", () => {
    const out = formatLegacyParagraph(
      "humanity will fully harness the untapped potential of over 2 Billion people.",
    );
    expect(out).toContain(`Billion${NBSP}people.`);
  });
});
