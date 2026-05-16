// Phase 7-final: visual regression baselines. Captures full-page screenshots
// at 375 (mobile) and 1440 (desktop) for every canonical route, plus the
// first project detail and the 404. Baselines live under
// tests/visual/__snapshots__/ and are committed. A diff fails CI; intentional
// UI changes are landed by running `npx playwright test tests/visual
// --update-snapshots` locally and committing the new baselines.

import { expect, test } from "@playwright/test";
import { projects } from "../../content/projects";

const FIRST_PROJECT_SLUG = projects[0]?.slug ?? "dream-fever";

const ROUTES: Array<{ path: string; name: string }> = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
  {
    path: `/projects/${FIRST_PROJECT_SLUG}`,
    name: `project-${FIRST_PROJECT_SLUG}`,
  },
  { path: "/team", name: "team" },
  { path: "/partners", name: "partners" },
  { path: "/legacy", name: "legacy" },
  { path: "/nonexistent-route", name: "404" },
];

const VIEWPORTS = [
  { width: 375, height: 812, label: "mobile" },
  { width: 1440, height: 900, label: "desktop" },
];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`visual: ${route.name} @ ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(route.path);
      await page.waitForLoadState("networkidle");
      // Disable transitions/animations defensively in addition to the
      // toHaveScreenshot animations:'disabled' setting.
      await page.addStyleTag({
        content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
      });
      await expect(page).toHaveScreenshot(`${route.name}-${vp.label}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
        threshold: 0.2,
        animations: "disabled",
        caret: "hide",
      });
    });
  }
}
