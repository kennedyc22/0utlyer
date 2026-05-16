// Phase 6: generate public/llms.txt from content/* sources. Curated, single
// file at root — no per-page mirror (deliberately rejected as duplicate-content
// risk on a small site). Runs as `prebuild` so the bundled file is always in
// sync with the data layer.
//
// Run via: tsx scripts/generate-llms-txt.ts  (registered as `prebuild` in
// package.json so `npm run build` invokes it automatically).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { founders } from "../content/founders";
import { projects } from "../content/projects";
import { SITE_URL } from "../lib/seo/constants";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(HERE, "..", "public", "llms.txt");

function lines(): string {
  const founderBullets = founders
    .map((f) => `- [${f.name}](${SITE_URL}/team#${f.slug}) — ${f.role}`)
    .join("\n");

  const projectBullets = projects
    .map(
      (p) =>
        `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.synopsis} (${p.status}, ${p.year})`,
    )
    .join("\n");

  return `# OUTLYER

> OUTLYER is a UK-based film and television production company founded by Coldplay's Chris Martin and Emmanuel Kelly. The company features differently-abled, neurodivergent, psychologically divergent, and primary-carer talent in front of the camera, off-screen, and on stage.

## About

OUTLYER is a full-service entertainment production company, committed to featuring outlyers in front of the camera, off-screen and on stage. The company was founded on the principle that if you are differently-abled, neuro or psychologically divergent, have an exclusory condition, or are a primary carer — you are an outlyer.

## Founders

${founderBullets}

## Projects

${projectBullets}

## Key Pages

- [Home](${SITE_URL}/): brand and mission overview
- [Projects](${SITE_URL}/projects): the full OUTLYER slate
- [Team](${SITE_URL}/team): full team and bios
- [Partners](${SITE_URL}/partners): collaborators and aligned organisations
- [Legacy](${SITE_URL}/legacy): The Kingdom of O — Cambridge partnership
- [Contact](${SITE_URL}/#contact): inquiries and partnership

## Contact

For press, partnerships, or project submissions: ${SITE_URL}/#contact
`;
}

async function main() {
  const content = lines();
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, content, "utf8");
  console.log(`[llms.txt] wrote ${OUTPUT} (${content.length} bytes)`);
}

main().catch((err) => {
  console.error("[llms.txt] generation failed:", err);
  process.exit(1);
});
