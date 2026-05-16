// Phase 6: end-to-end SEO/GEO validation. Asserts that every canonical route
// renders the expected metadata, that sitemap/robots/llms.txt are served, and
// that each page emits at least one well-formed JSON-LD block.
//
// These tests run in the same Playwright suite as the rest of the e2e specs.
// They are deliberately strict: missing title/description/canonical or
// malformed JSON-LD should fail the build.

import { expect, test } from "@playwright/test";

const SITE_HOST = "http://localhost:3000";
const PROD_HOST = "https://www.0utlyer.com";

const ROUTES: Array<{
  path: string;
  expectedTitleSubstring: string;
  expectedJsonLdTypes: string[];
}> = [
  {
    path: "/",
    expectedTitleSubstring: "OUTLYER",
    expectedJsonLdTypes: ["Organization", "WebSite", "WebPage", "Person"],
  },
  {
    path: "/projects",
    expectedTitleSubstring: "Projects",
    expectedJsonLdTypes: ["CollectionPage", "BreadcrumbList"],
  },
  {
    path: "/projects/dream-fever",
    expectedTitleSubstring: "Dream Fever",
    expectedJsonLdTypes: ["Movie", "BreadcrumbList"],
  },
  {
    path: "/team",
    expectedTitleSubstring: "Team",
    expectedJsonLdTypes: ["Organization", "Person", "BreadcrumbList"],
  },
  {
    path: "/partners",
    expectedTitleSubstring: "Partners",
    expectedJsonLdTypes: ["WebPage", "BreadcrumbList"],
  },
  {
    path: "/legacy",
    expectedTitleSubstring: "Legacy",
    expectedJsonLdTypes: ["Article", "BreadcrumbList"],
  },
  {
    path: "/privacy",
    expectedTitleSubstring: "Privacy",
    expectedJsonLdTypes: ["WebPage", "BreadcrumbList"],
  },
];

for (const route of ROUTES) {
  test(`seo: ${route.path} has title, description, canonical, OG, twitter, JSON-LD`, async ({
    page,
  }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).toContain(route.expectedTitleSubstring);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description, `description on ${route.path}`).toBeTruthy();
    expect((description ?? "").length).toBeGreaterThan(40);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical, `canonical on ${route.path}`).toBeTruthy();
    // Canonical should be absolute and end with the route path (modulo "/").
    expect(canonical).toMatch(/^https?:\/\//);
    const canonicalPath = new URL(canonical ?? "").pathname.replace(/\/$/, "");
    const expectedPath = route.path.replace(/\/$/, "");
    expect(canonicalPath).toBe(expectedPath);

    // Open Graph
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      /.+/,
    );

    // Twitter
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    // JSON-LD: parse every block, collect @type values, verify expected types
    // appear at least once. JSON-LD nodes may be arrays.
    const jsonLdBlocks = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    expect(jsonLdBlocks.length).toBeGreaterThan(0);

    const seenTypes = new Set<string>();
    for (const raw of jsonLdBlocks) {
      const parsed = JSON.parse(raw);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        expect(node["@context"], `@context on ${route.path}`).toBeTruthy();
        const t = node["@type"];
        if (Array.isArray(t)) t.forEach((x) => seenTypes.add(String(x)));
        else if (t) seenTypes.add(String(t));
      }
    }
    for (const expected of route.expectedJsonLdTypes) {
      expect(
        seenTypes.has(expected),
        `expected JSON-LD @type "${expected}" on ${route.path} — saw ${[...seenTypes].join(", ")}`,
      ).toBe(true);
    }
  });
}

test("seo: sitemap.xml lists every canonical route + project", async ({
  request,
}) => {
  const res = await request.get(`${SITE_HOST}/sitemap.xml`);
  expect(res.status()).toBe(200);
  const body = await res.text();
  // Static routes
  for (const p of [
    "/",
    "/projects",
    "/team",
    "/partners",
    "/legacy",
    "/privacy",
  ]) {
    expect(body).toContain(`${PROD_HOST}${p === "/" ? "/" : p}`);
  }
  // At least one project detail URL — dream-fever is always present.
  expect(body).toContain(`${PROD_HOST}/projects/dream-fever`);
  // /design-system must NOT appear (dev-only).
  expect(body).not.toContain("/design-system");
});

test("seo: robots.txt allows root, lists sitemap, allows GPTBot", async ({
  request,
}) => {
  const res = await request.get(`${SITE_HOST}/robots.txt`);
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/Sitemap:\s*https:\/\/www\.0utlyer\.com\/sitemap\.xml/);
  expect(body).toMatch(/User-Agent:\s*GPTBot/i);
  expect(body).toMatch(/User-Agent:\s*\*/);
});

test("seo: /llms.txt is served with H1 OUTLYER as first line", async ({
  request,
}) => {
  const res = await request.get(`${SITE_HOST}/llms.txt`);
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body.split(/\r?\n/)[0]).toBe("# OUTLYER");
  expect(body).toContain("## Founders");
  expect(body).toContain("## Projects");
});

test("seo: /manifest.webmanifest served as JSON with name OUTLYER", async ({
  request,
}) => {
  const res = await request.get(`${SITE_HOST}/manifest.webmanifest`);
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.name).toBe("OUTLYER");
  expect(json.start_url).toBe("/");
});

test("seo: 404 page is noindex", async ({ page }) => {
  await page.goto("/nonexistent-route");
  // Next.js can emit multiple meta[name="robots"] when both the layout default
  // and the page-level override are present — assert that *some* tag carries
  // noindex rather than relying on a single match.
  const robotsTags = await page
    .locator('meta[name="robots"]')
    .evaluateAll((els) =>
      (els as HTMLMetaElement[]).map((m) => m.getAttribute("content") ?? ""),
    );
  expect(robotsTags.length).toBeGreaterThan(0);
  expect(robotsTags.some((c) => /noindex/.test(c))).toBe(true);
});
