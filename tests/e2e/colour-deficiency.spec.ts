// Phase 7-final: colour vision deficiency screenshots. Uses Chromium's
// built-in vision deficiency emulation to capture how the site looks under
// achromatopsia, deuteranopia, protanopia, tritanopia, and blurred vision.
// This spec does not assert anything programmatically — it produces
// artefacts at tests/reports/colour-deficiency/ for human review. The brand
// red on black should remain distinguishable under all four conditions; if
// it doesn't, that's a design problem to flag on the launch checklist.

import { test } from "@playwright/test";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const CONDITIONS = [
  "achromatopsia",
  "deuteranopia",
  "protanopia",
  "tritanopia",
  "blurredVision",
] as const;

type Condition = (typeof CONDITIONS)[number];

const ROUTES: Array<{ path: string; name: string }> = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
];

const OUT_DIR = resolve(process.cwd(), "tests/reports/colour-deficiency");
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

for (const condition of CONDITIONS) {
  for (const route of ROUTES) {
    test(`colour-deficiency: ${condition} on ${route.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      // Chromium-only feature; falls back to a no-op on other engines.
      const client = await page.context().newCDPSession(page);
      await client.send("Emulation.setEmulatedVisionDeficiency", {
        type: chromiumTypeFor(condition),
      });
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      const file = join(OUT_DIR, `${condition}-${route.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
    });
  }
}

function chromiumTypeFor(c: Condition): string {
  // Map our taxonomy onto Chromium's setEmulatedVisionDeficiency.type enum.
  switch (c) {
    case "achromatopsia":
      return "achromatopsia";
    case "deuteranopia":
      return "deuteranopia";
    case "protanopia":
      return "protanopia";
    case "tritanopia":
      return "tritanopia";
    case "blurredVision":
      return "blurredVision";
  }
}
