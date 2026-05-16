// Phase 7-final: link integrity. Crawls every canonical internal route,
// collects all internal links (relative or SITE_URL-prefixed), and asserts
// each returns HTTP 200. External links with rel="noopener noreferrer" are
// HEAD-probed with a short timeout; 4xx/5xx is logged as a warning but never
// fails the test (external sites being down is not our problem). The report
// is written to tests/reports/links.json.

import { expect, request as pwRequest, test } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROUTES_TO_CRAWL = [
  "/",
  "/projects",
  "/team",
  "/partners",
  "/legacy",
  "/privacy",
];

const REPORTS_DIR = resolve(process.cwd(), "tests/reports");
if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

const SITE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

function isInternal(href: string): boolean {
  if (href.startsWith("/")) return true;
  try {
    const u = new URL(href);
    const base = new URL(SITE_URL);
    return (
      u.host === base.host ||
      u.host === "www.0utlyer.com" ||
      u.host === "0utlyer.com"
    );
  } catch {
    return false;
  }
}

function isExternalHttp(href: string): boolean {
  return /^https?:\/\//.test(href) && !isInternal(href);
}

function normalizeInternal(href: string): string {
  if (href.startsWith("/")) return href;
  try {
    return new URL(href).pathname + (new URL(href).search ?? "");
  } catch {
    return href;
  }
}

test("links: every internal link resolves to 200 and external links are tracked", async ({
  page,
}) => {
  const internalToCheck = new Set<string>();
  const externalToCheck = new Set<string>();

  for (const route of ROUTES_TO_CRAWL) {
    await page.goto(route);
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((els) =>
        (els as HTMLAnchorElement[])
          .map((a) => a.getAttribute("href"))
          .filter((h): h is string => !!h),
      );
    for (const raw of hrefs) {
      const href = raw.split("#")[0]; // strip fragment
      if (!href) continue;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (isInternal(href)) {
        internalToCheck.add(normalizeInternal(href));
      } else if (isExternalHttp(href)) {
        externalToCheck.add(href);
      }
    }
  }

  const ctx = await pwRequest.newContext();
  const internalResults: Array<{ url: string; status: number }> = [];
  const externalResults: Array<{ url: string; status: number | null }> = [];

  for (const url of internalToCheck) {
    const res = await ctx
      .get(url.startsWith("http") ? url : `${SITE_URL}${url}`, {
        maxRedirects: 5,
      })
      .catch(() => null);
    internalResults.push({ url, status: res?.status() ?? 0 });
  }

  for (const url of externalToCheck) {
    try {
      const res = await ctx.fetch(url, { method: "HEAD", timeout: 5000 });
      externalResults.push({ url, status: res.status() });
    } catch {
      externalResults.push({ url, status: null });
    }
  }

  writeFileSync(
    resolve(REPORTS_DIR, "links.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        internal: internalResults,
        external: externalResults,
      },
      null,
      2,
    ),
  );

  const broken = internalResults.filter(
    (r) => r.status < 200 || r.status >= 400,
  );
  expect(
    broken,
    `broken internal links: ${JSON.stringify(broken, null, 2)}`,
  ).toEqual([]);

  // External: warn only.
  const externalBroken = externalResults.filter(
    (r) => r.status !== null && (r.status < 200 || r.status >= 400),
  );
  if (externalBroken.length > 0) {
    console.warn(
      `external links returned non-200:`,
      JSON.stringify(externalBroken, null, 2),
    );
  }
});
