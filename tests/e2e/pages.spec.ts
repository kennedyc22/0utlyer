import { expect, test } from "@playwright/test";
import { productionServicesCta } from "../../content/production-services";

test("/team renders MEET THE TEAM heading and team cards", async ({ page }) => {
  const response = await page.goto("/team");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /meet the team/i }),
  ).toBeVisible();
  // Founders + broader team rendered in one grid
  const teamCards = page.locator(".ol-team-layout__item");
  await expect(teamCards.first()).toBeVisible();
});

test("/training-recruitment renders hero image and copy", async ({ page }) => {
  const response = await page.goto("/training-recruitment");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /breaking barriers, backing talent/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/0utShine is 0utlyer's training and recruitment/i),
  ).toBeVisible();
  await expect(
    page.getByText(/backed by industry\. connected to government/i),
  ).toBeVisible();
  await expect(
    page.locator('.ol-training-hero-media img[src*="0utShine"]'),
  ).toBeVisible();
});

test("/training-recruitment renders real productions split", async ({
  page,
}) => {
  await page.goto("/training-recruitment");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /real productions\. real opportunities/i,
    }),
  ).toBeVisible();
  await expect(
    page.locator('.ol-training-opportunities-media img[src*="film"]'),
  ).toBeVisible();
  await expect(
    page.getByText(/Film • TV • Animation • Post • Music • Live Events/i),
  ).toBeVisible();
});

test("/training-recruitment renders industry and government split", async ({
  page,
}) => {
  await page.goto("/training-recruitment");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /industry and government working together/i,
    }),
  ).toBeVisible();
  await expect(
    page.locator('.ol-training-impact-media img[src*="HOC"]'),
  ).toBeVisible();
  await expect(page.getByText(/1,200\+/)).toBeVisible();
  await expect(page.getByText(/Next APPG Event/i)).toBeVisible();
  await expect(page.getByText(/15 July.*London/i)).toBeVisible();
});

test("/training-recruitment renders support mission contact section", async ({
  page,
}) => {
  await page.goto("/training-recruitment");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: /want to support the mission/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      /explore partnership opportunities or support the wider movement/i,
    ),
  ).toBeVisible();
  await expect(page.locator("#contact form[name='contact']")).toBeVisible();
});

test("/production-services renders intro, service images, and contact form", async ({
  page,
}) => {
  const response = await page.goto("/production-services");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /^PRODUCTION SERVICES$/i }),
  ).toBeVisible();
  const items = page.locator(".ol-production-list > li");
  await expect(items).toHaveCount(3);
  await expect(
    page.getByRole("heading", { level: 2, name: /contact us/i }),
  ).toBeVisible();
  await expect(page.locator(".ol-contact-ribbon")).toHaveCount(0);
  await expect(page.locator('form[name="contact"]')).toBeVisible();
  await expect(page.getByText(productionServicesCta)).toBeVisible();
  await expect(
    page.locator('.ol-production-image img[src*="0utLoud"]'),
  ).toBeVisible();
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
