// Phase 7-final: runtime JSON-LD validation. For every canonical route, this
// spec extracts every <script type="application/ld+json"> block, parses it,
// asserts @context and @type are present and well-formed, and verifies the
// route emits the entity types it's supposed to per PRD §5. Each route's
// raw JSON-LD is written to tests/reports/schema/<route>.json for human
// review against https://validator.schema.org.

import { expect, test } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { projects } from "../../content/projects";

const FIRST_PROJECT_SLUG = projects[0]?.slug ?? "dream-fever";
const REPORTS_DIR = resolve(process.cwd(), "tests/reports/schema");
if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

const ROUTES: Array<{
  path: string;
  expectedTypes: string[];
  filename: string;
}> = [
  {
    path: "/",
    expectedTypes: ["Organization", "WebSite", "WebPage", "Person"],
    filename: "home",
  },
  {
    path: "/projects",
    expectedTypes: ["CollectionPage", "BreadcrumbList"],
    filename: "projects",
  },
  {
    path: `/projects/${FIRST_PROJECT_SLUG}`,
    expectedTypes: ["Movie", "BreadcrumbList"],
    filename: `project-${FIRST_PROJECT_SLUG}`,
  },
  {
    path: "/team",
    expectedTypes: ["Organization", "Person", "BreadcrumbList"],
    filename: "team",
  },
  {
    path: "/partners",
    expectedTypes: ["WebPage", "BreadcrumbList"],
    filename: "partners",
  },
  {
    path: "/legacy",
    expectedTypes: ["Article", "BreadcrumbList"],
    filename: "legacy",
  },
  {
    path: "/privacy",
    expectedTypes: ["WebPage", "BreadcrumbList"],
    filename: "privacy",
  },
];

function extractTypes(node: unknown, into: Set<string>) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) extractTypes(item, into);
    return;
  }
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") into.add(t);
  else if (Array.isArray(t))
    for (const x of t) if (typeof x === "string") into.add(x);
}

for (const route of ROUTES) {
  test(`schema: ${route.path} emits valid JSON-LD with expected @types`, async ({
    page,
  }) => {
    await page.goto(route.path);
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    expect(blocks.length, `no JSON-LD on ${route.path}`).toBeGreaterThan(0);

    const parsed: unknown[] = [];
    const seen = new Set<string>();

    for (const raw of blocks) {
      let json: unknown;
      try {
        json = JSON.parse(raw);
      } catch (err) {
        throw new Error(
          `Invalid JSON-LD on ${route.path}: ${(err as Error).message}\nRaw: ${raw.slice(0, 200)}`,
        );
      }
      parsed.push(json);
      const nodes = Array.isArray(json) ? json : [json];
      for (const node of nodes) {
        expect(
          (node as Record<string, unknown>)["@context"],
          `missing @context on ${route.path}`,
        ).toBeTruthy();
        const ctx = String((node as Record<string, unknown>)["@context"] ?? "");
        expect(
          ctx === "https://schema.org" || ctx === "https://schema.org/",
          `@context on ${route.path} must be https://schema.org, got: ${ctx}`,
        ).toBe(true);
        expect(
          (node as Record<string, unknown>)["@type"],
          `missing @type on ${route.path}`,
        ).toBeTruthy();
        extractTypes(node, seen);
      }
    }

    for (const expected of route.expectedTypes) {
      expect(
        seen.has(expected),
        `expected @type "${expected}" on ${route.path}, got: ${[...seen].join(", ")}`,
      ).toBe(true);
    }

    // Persist for human review.
    writeFileSync(
      join(REPORTS_DIR, `${route.filename}.json`),
      JSON.stringify(parsed, null, 2),
    );
  });
}
