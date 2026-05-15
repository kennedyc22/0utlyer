import { test } from "@playwright/test";
import path from "node:path";

const targets = [
  { name: "home", url: "/" },
  { name: "design-system", url: "/design-system" },
  { name: "nonexistent", url: "/nonexistent-route" },
  { name: "projects", url: "/projects" },
  { name: "project-detail-dream-fever", url: "/projects/dream-fever" },
];

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

const outDir = path.join(process.cwd(), "tests", "screenshots");

for (const t of targets) {
  for (const v of viewports) {
    test(`screenshot ${t.name} @ ${v.name}`, async ({ page }) => {
      await page.setViewportSize({ width: v.width, height: v.height });
      await page.goto(t.url);
      await page.waitForLoadState("domcontentloaded");
      await page.screenshot({
        path: path.join(outDir, `${t.name}-${v.name}.png`),
        fullPage: true,
      });
    });
  }
}
