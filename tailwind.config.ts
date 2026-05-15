import type { Config } from "tailwindcss";

/**
 * Tailwind v4 is CSS-first: design tokens live in styles/globals.css under
 * @theme. This config exists for tooling (prettier-plugin-tailwindcss, IDE
 * intellisense) and to scope content globs. Do not duplicate tokens here.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
};

export default config;
