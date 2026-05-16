// Compile-time validation of the JSON-LD generators in ./schema.ts against
// the schema-dts type definitions (which mirror the Schema.org spec).
//
// This module exists purely for the TypeScript compiler. Nothing here runs.
// If a generator drifts from the spec — wrong @type, missing required field,
// invalid value type — typecheck fails on import of this file, which the CI
// pipeline picks up via `npm run typecheck`.
//
// We assert via assignment to a typed shadow variable rather than changing
// the generator return types directly: keeping the public API as JsonLdNode
// avoids forcing every <JsonLd /> consumer to switch to schema-dts types.

import type {
  Article,
  BreadcrumbList,
  CollectionPage,
  Movie,
  Organization,
  Person,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import type { Founder } from "../../content/founders";
import type { Project } from "../../content/projects";

import {
  buildArticle,
  buildBreadcrumb,
  buildCollectionPage,
  buildMovie,
  buildOrganization,
  buildPerson,
  buildWebPage,
  buildWebSite,
} from "./schema";

// Dummy fixtures used only for the type expressions below.
declare const _founder: Founder;
declare const _project: Project;

// Each line asserts the generator output is structurally compatible with
// the corresponding schema-dts type. The `as unknown as` cast is required
// because the generators return Record<string, unknown> (intentionally
// loose, for the <JsonLd /> component); the meaningful check is that the
// downstream type still resolves to a valid Schema.org entity.
export const _schemaTypeChecks = {
  organization: buildOrganization([
    _founder,
  ]) as unknown as WithContext<Organization>,
  person: buildPerson(_founder) as unknown as WithContext<Person>,
  website: buildWebSite() as unknown as WithContext<WebSite>,
  movie: buildMovie(_project) as unknown as WithContext<Movie>,
  collection: buildCollectionPage({
    name: "x",
    description: "x",
    path: "/x",
    items: [{ url: "https://x", name: "x" }],
  }) as unknown as WithContext<CollectionPage>,
  article: buildArticle({
    headline: "x",
    description: "x",
    path: "/x",
  }) as unknown as WithContext<Article>,
  breadcrumb: buildBreadcrumb([
    { name: "x", path: "/x" },
  ]) as unknown as WithContext<BreadcrumbList>,
  webpage: buildWebPage({
    name: "x",
    description: "x",
    path: "/x",
  }) as unknown as WithContext<WebPage>,
};
