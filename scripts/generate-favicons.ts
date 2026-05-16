// One-shot: convert public/icon.avif into the favicon PNGs Next.js serves
// via app/icon.png and app/apple-icon.png. Run once after any change to
// public/icon.avif:
//
//   npm run gen:favicons
//
// Sharp is bundled with Next.js. Output:
//   app/icon.png       — 256×256 (Next emits <link rel="icon">)
//   app/apple-icon.png — 180×180 (iOS home-screen touch icon)

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SOURCE = resolve(ROOT, "public", "icon.avif");

async function generate(outPath: string, size: number) {
  // 1. trim() strips uniform edges (kills the source's letterboxing if any).
  // 2. resize with fit:contain to a slightly-inset target — ~88% of the final
  //    canvas — so the mark has visual breathing room on iOS home screens.
  // 3. extend back to the full square with a transparent background; browsers
  //    will paint whatever tab-bar colour shows through.
  const inner = Math.round(size * 0.88);
  const pad = Math.floor((size - inner) / 2);
  const buf = await sharp(SOURCE)
    .trim()
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: pad,
      bottom: size - inner - pad,
      left: pad,
      right: size - inner - pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(outPath, buf);
  console.log(
    `[favicons] wrote ${outPath} (${buf.length} bytes, ${size}×${size})`,
  );
}

async function main() {
  await generate(resolve(ROOT, "app", "icon.png"), 256);
  await generate(resolve(ROOT, "app", "apple-icon.png"), 180);
}

main().catch((err) => {
  console.error("[favicons] generation failed:", err);
  process.exit(1);
});
