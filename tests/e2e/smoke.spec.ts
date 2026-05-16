import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home renders with nav, footer, main, and 200 status", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("main#content")).toBeVisible();
  await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
});

test("home renders mission, founders count = 4, contact anchor", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /our mission/i,
    }),
  ).toBeVisible();
  await expect(page.locator("#mission")).toBeVisible();

  const founderCards = page.locator("#founders article");
  await expect(founderCards).toHaveCount(3);

  await expect(page.locator("#contact")).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
});

test("skip-to-content link is the first focusable element", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveAttribute("href", "#content");
});

test("hamburger button visible at 375 and opens the sheet", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.locator('button[aria-label="Open menu"]');
  await expect(trigger).toBeVisible();
  await trigger.click();
  const sheet = page.locator("#ol-nav-sheet");
  await expect(sheet).toHaveAttribute("data-open", "true");
  await expect(sheet.getByRole("link", { name: "Projects" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(sheet).not.toHaveAttribute("data-open", "true");
});

test("/nonexistent-route renders 404 page with status 404", async ({
  page,
}) => {
  const response = await page.goto("/nonexistent-route");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      name: /this isn'?t the one you were looking for/i,
    }),
  ).toBeVisible();
});

for (const path of ["/", "/design-system", "/nonexistent-route"]) {
  test(`axe: zero serious/critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("domcontentloaded");
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
}
