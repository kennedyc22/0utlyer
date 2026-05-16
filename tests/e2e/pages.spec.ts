import { expect, test } from "@playwright/test";

test("/team renders MEET THE TEAM heading and team cards", async ({ page }) => {
  const response = await page.goto("/team");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /meet the team/i }),
  ).toBeVisible();
  // Founders + broader team rendered in one grid
  const teamCards = page.locator(".ol-team-grid article");
  await expect(teamCards.first()).toBeVisible();
});

test("/partners renders heading, lead paragraph and partner tiles", async ({
  page,
}) => {
  const response = await page.goto("/partners");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /best-in-class partners/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/world-leading studios and post houses/i),
  ).toBeVisible();
  const tiles = page.locator(".ol-partners-grid > li");
  await expect(tiles).toHaveCount(3);
});

test("/legacy renders title and body", async ({ page }) => {
  const response = await page.goto("/legacy");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /the kingdom of o/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/a world-changing partnership/i).first(),
  ).toBeVisible();
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
