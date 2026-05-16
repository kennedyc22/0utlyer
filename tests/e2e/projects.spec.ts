import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("/projects renders 9 project cards", async ({ page }) => {
  const response = await page.goto("/projects");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /^projects$/i }),
  ).toBeVisible();
  const cards = page.locator("[data-slug]");
  await expect(cards).toHaveCount(9);
});

test("/projects card click navigates to detail page with required sections", async ({
  page,
}) => {
  await page.goto("/projects");
  const firstCard = page.locator("[data-slug]").first();
  const slug = await firstCard.getAttribute("data-slug");
  expect(slug).toBeTruthy();
  await firstCard.click();
  await page.waitForURL(`**/projects/${slug}`);

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /all projects/i })).toBeVisible();
  // Eyebrow row contains year + status
  await expect(page.locator("text=In Development").first()).toBeVisible();
});

test("/projects/[slug] renders title, synopsis and credits container", async ({
  page,
}) => {
  const response = await page.goto("/projects/dream-fever");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /dream fever/i }),
  ).toBeVisible();
});

test("redirect /s-projects → /projects (301)", async ({ page }) => {
  const response = await page.goto("/s-projects");
  expect(response?.status()).toBe(200);
  expect(page.url()).toMatch(/\/projects$/);
});

for (const path of [
  "/projects",
  "/projects/dream-fever",
  "/team",
  "/partners",
  "/legacy",
  "/privacy",
]) {
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
