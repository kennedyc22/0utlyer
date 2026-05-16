// Phase 6: typed JSON-LD generators. Schema.org best-practice 2026: each
// entity carries a stable @id, and cross-references use { "@id": ... } refs
// rather than duplicating the entity body. Multiple JSON-LD blocks per page
// are supported by Google and are encouraged for graph cohesion.

import {
  BRAND_DESCRIPTION,
  ORG_ID,
  SITE_LANGUAGE,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from "./constants";
import type { Founder } from "../../content/founders";
import type { Project } from "../../content/projects";

type JsonLdNode = Record<string, unknown> & { "@context"?: string };

const CONTEXT = "https://schema.org";

function absolute(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function personId(slug: string): string {
  return `${SITE_URL}/#person-${slug}`;
}

// Organization. Singular site-wide entity. Other nodes reference it by @id.
// TODO(seo): once Dan supplies sameAs URLs (IMDb company page, Wikipedia,
// Companies House, social), foundingDate, and the official postal address /
// telephone (audit/meta/schema.json shows the live Wix site exposed 27 Old
// Gloucester St, London WC1N 3AX, tel 07548387592), populate the relevant
// fields below and remove the TODO.
export function buildOrganization(founders: Founder[]): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "OUTLYER Entertainment",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absolute("/logo.avif"),
      // TODO(asset): real intrinsic dimensions of logo.avif. Placeholder values
      // are typical for a wordmark and are valid schema.org ImageObject sizes.
      width: 800,
      height: 184,
    },
    description: BRAND_DESCRIPTION,
    founder: founders.map((f) => ({ "@id": personId(f.slug) })),
    // TODO(seo): populate when Dan supplies external profile links (IMDb,
    // Wikipedia, Companies House, social handles).
    sameAs: [],
    // TODO(seo): foundingDate ISO YYYY-MM-DD once confirmed.
    knowsAbout: [
      "inclusive film production",
      "differently-abled talent",
      "neurodivergent representation",
      "film and television production",
    ],
  };
}

export function buildPerson(founder: Founder): JsonLdNode {
  const external =
    founder.link && /^https?:\/\//.test(founder.link.href)
      ? [founder.link.href]
      : [];
  return {
    "@context": CONTEXT,
    "@type": "Person",
    "@id": personId(founder.slug),
    name: founder.name,
    jobTitle: founder.role,
    ...(founder.bio && { description: founder.bio }),
    image: absolute(founder.photo.src),
    url: `${SITE_URL}/#founder-${founder.slug}`,
    worksFor: { "@id": ORG_ID },
    ...(external.length > 0 && { sameAs: external }),
  };
}

export function buildWebSite(): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: BRAND_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: { "@id": ORG_ID },
  };
}

const STATUS_TO_PRODUCTION: Record<Project["status"], string> = {
  "In Development": "PreProduction",
  "In Production": "InProduction",
  Released: "Released",
};

// TODO(content): the Project shape has no `format` field, so every project is
// schema-typed as Movie. Several projects in content/projects.ts are likely
// TVSeries or interactive (e.g. Crewel Work). Add an optional
// `format: 'film' | 'series' | 'interactive'` field to Project and switch
// the @type below to TVSeries / CreativeWork as appropriate.
export function buildMovie(project: Project): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "Movie",
    "@id": `${SITE_URL}/projects/${project.slug}#movie`,
    name: project.title,
    description: project.description.split("\n\n")[0] || project.synopsis,
    image: absolute(project.hero.src),
    url: `${SITE_URL}/projects/${project.slug}`,
    productionCompany: { "@id": ORG_ID },
    dateCreated: `${project.year}-01-01`,
    inLanguage: "en",
    countryOfOrigin: { "@type": "Country", name: "United Kingdom" },
    productionStatus: STATUS_TO_PRODUCTION[project.status],
  };
}

export function buildCollectionPage(args: {
  name: string;
  description: string;
  path: string;
  items: Array<{ url: string; name: string; image?: string }>;
}): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${args.path}#collection`,
    url: `${SITE_URL}${args.path}`,
    name: args.name,
    description: args.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: SITE_LANGUAGE,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: args.items.length,
      itemListElement: args.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: it.url,
        name: it.name,
        ...(it.image && { image: absolute(it.image) }),
      })),
    },
  };
}

export function buildArticle(args: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdNode {
  const url = `${SITE_URL}${args.path}`;
  return {
    "@context": CONTEXT,
    "@type": "Article",
    "@id": `${url}#article`,
    headline: args.headline,
    description: args.description,
    url,
    image: args.image ? absolute(args.image) : undefined,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: SITE_LANGUAGE,
    // TODO(seo): datePublished — Dan to confirm. Falling back to ISO if absent.
    ...(args.datePublished && { datePublished: args.datePublished }),
    ...(args.dateModified && { dateModified: args.dateModified }),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function buildBreadcrumb(
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function buildWebPage(args: {
  name: string;
  description: string;
  path: string;
}): JsonLdNode {
  const url = `${SITE_URL}${args.path}`;
  return {
    "@context": CONTEXT,
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: SITE_LANGUAGE,
    about: { "@id": ORG_ID },
  };
}
