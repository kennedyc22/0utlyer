import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("/design-system", () => {
  test("renders without serious or critical axe violations", async ({
    page,
  }) => {
    await page.goto("/design-system");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    if (blocking.length > 0) {
      console.error(
        "axe violations:",
        JSON.stringify(
          blocking.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
          })),
          null,
          2,
        ),
      );
    }

    expect(blocking).toEqual([]);
  });
});
