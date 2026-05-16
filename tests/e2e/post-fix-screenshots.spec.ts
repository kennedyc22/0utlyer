import { test } from "@playwright/test";
import path from "node:path";

// Phase 4-fix verification: full-page home screenshots at the same two
// viewports as the original audit, written next to the existing fixtures so
// reviewers can flip between original and post-fix without leaving the
// tests/screenshots folder.
const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

const outDir = path.join(process.cwd(), "tests", "screenshots");

for (const v of viewports) {
  test(`post-fix home screenshot @ ${v.name}`, async ({ page }) => {
    await page.setViewportSize({ width: v.width, height: v.height });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(outDir, `post-fix-home-${v.name}.png`),
      fullPage: true,
    });
  });
}
