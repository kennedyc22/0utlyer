import { test } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

const targets = [
  { name: "home", url: "/" },
  { name: "projects", url: "/projects" },
  { name: "project-detail-dream-fever", url: "/projects/dream-fever" },
  { name: "team", url: "/team" },
  { name: "production-services", url: "/production-services" },
  {
    name: "training-recruitment",
    url: "/training-recruitment",
  },
  { name: "partners", url: "/partners" },
  { name: "legacy", url: "/legacy" },
  { name: "privacy", url: "/privacy" },
  { name: "not-found", url: "/this-route-does-not-exist" },
];

const viewports = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

const outDir = path.join(process.cwd(), "tests", "screenshots", "replication");

test.beforeAll(() => {
  fs.mkdirSync(outDir, { recursive: true });
});

for (const t of targets) {
  for (const v of viewports) {
    test(`replication ${t.name} @ ${v.name}`, async ({ page }) => {
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
