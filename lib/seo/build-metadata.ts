// Phase 6: shared metadata builder. Every route imports this so that title,
// description, canonical, OG, and Twitter blocks stay consistent.

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_LOCALE } from "./constants";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string; // route-relative, e.g. '/projects' or '/'
  image?: string; // route-relative or absolute; if omitted, the Next.js
  // file-based opengraph-image for this route is used.
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  // When no explicit image is supplied, defer to Next.js' file-based OG image
  // resolution: a colocated opengraph-image.tsx at the same route prefix
  // produces /opengraph-image and the framework adds an absolute og:image tag
  // for us. Passing an explicit relative path here would short-circuit that
  // resolution — so omit images entirely in that case and let Next merge.
  const explicitImages = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    }),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: SITE_LOCALE,
      ...(explicitImages && { images: explicitImages }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}
