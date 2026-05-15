import { expect, test } from "@playwright/test";

test("home renders with a <main> element and 200 status", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("main")).toBeVisible();
});
