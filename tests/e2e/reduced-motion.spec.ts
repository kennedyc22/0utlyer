// Phase 7-final: prefers-reduced-motion test. Emulates a user who has
// requested reduced motion and asserts no transition exceeds 100ms and no
// CSS animation runs on the visible page.

import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/projects", "/team"];

function parseDurationMs(value: string): number {
  // CSS duration is "0.3s" or "300ms"; computedStyle returns "0.3s" or "300ms".
  const v = value.trim();
  if (!v || v === "0s" || v === "0ms") return 0;
  if (v.endsWith("ms")) return parseFloat(v);
  if (v.endsWith("s")) return parseFloat(v) * 1000;
  return parseFloat(v) || 0;
}

for (const path of ROUTES) {
  test(`reduced-motion: no transition >100ms on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const offenders = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll("*")) as HTMLElement[];
      const found: Array<{
        selector: string;
        transitionDuration: string;
        animationName: string;
        animationDuration: string;
      }> = [];
      for (const el of all) {
        const cs = window.getComputedStyle(el);
        // Transitions: comma-separated list, take max.
        const durations = cs.transitionDuration.split(",").map((s) => s.trim());
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : "";
        const cls =
          el.className && typeof el.className === "string"
            ? "." + el.className.split(/\s+/).slice(0, 2).join(".")
            : "";
        const selector = `${tag}${id}${cls}`;
        const animName = cs.animationName;
        for (const d of durations) {
          const ms = d.endsWith("ms")
            ? parseFloat(d)
            : d.endsWith("s")
              ? parseFloat(d) * 1000
              : 0;
          if (ms > 100) {
            found.push({
              selector,
              transitionDuration: d,
              animationName: animName,
              animationDuration: cs.animationDuration,
            });
            break;
          }
        }
        if (animName && animName !== "none") {
          const animDur = cs.animationDuration.split(",")[0]?.trim() ?? "0s";
          const ms = animDur.endsWith("ms")
            ? parseFloat(animDur)
            : animDur.endsWith("s")
              ? parseFloat(animDur) * 1000
              : 0;
          if (ms > 100) {
            found.push({
              selector,
              transitionDuration: cs.transitionDuration,
              animationName: animName,
              animationDuration: animDur,
            });
          }
        }
      }
      return found.slice(0, 50);
    });

    if (offenders.length > 0) {
      console.error(
        "reduced-motion offenders:",
        JSON.stringify(offenders, null, 2),
      );
    }
    expect(offenders).toEqual([]);
  });
}

// Sanity guard: parseDurationMs is referenced for symmetry with the inline
// helper above and to keep behavior consistent if the parser ever moves out
// of the browser context.
void parseDurationMs;
