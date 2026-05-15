import { expect, test } from "@playwright/test";

test("/team renders founders, hides broader-team section when empty", async ({
  page,
}) => {
  const response = await page.goto("/team");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /the team\./i }),
  ).toBeVisible();
  // Founders block reused
  const founderCards = page.locator("#founders article");
  await expect(founderCards).toHaveCount(4);
  // Broader team section should not render when broaderTeam is empty
  await expect(page.locator(".ol-team-grid")).toHaveCount(0);
});

test("/partners renders heading, lead paragraph and 8 partner tiles", async ({
  page,
}) => {
  const response = await page.goto("/partners");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /partners\./i }),
  ).toBeVisible();
  await expect(
    page.getByText(/best-in-class partners who share our mission/i),
  ).toBeVisible();
  const tiles = page.locator(".ol-partner-wall > *");
  await expect(tiles).toHaveCount(8);
});

test("/legacy renders title, lead and drop-cap first paragraph", async ({
  page,
}) => {
  const response = await page.goto("/legacy");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /the kingdom of o/i }),
  ).toBeVisible();
  await expect(page.locator(".ol-dropcap")).toBeVisible();
});

test("/privacy renders boilerplate sections", async ({ page }) => {
  const response = await page.goto("/privacy");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /privacy policy/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /data controller/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /your rights/i }),
  ).toBeVisible();
});

test("redirect /team-4 → /team (301)", async ({ page }) => {
  const response = await page.goto("/team-4");
  expect(response?.status()).toBe(200);
  expect(page.url()).toMatch(/\/team$/);
});
