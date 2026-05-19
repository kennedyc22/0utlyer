import type { Metadata } from "next";
import { HeroCarousel } from "../components/sections/HeroCarousel";
import { MissionBlock } from "../components/sections/MissionBlock";
import { FoundersGrid } from "../components/sections/FoundersGrid";
import { ContactAnchor } from "../components/sections/ContactAnchor";
import { JsonLd } from "../components/seo/JsonLd";
import { buildMetadata } from "../lib/seo/build-metadata";
import { SITE_TAGLINE } from "../lib/seo/constants";
import {
  buildOrganization,
  buildPerson,
  buildWebSite,
  buildWebPage,
} from "../lib/seo/schema";
import { founders } from "../content/founders";

// Home: bypass the layout's "%s — OUTLYER" title template so the headline
// reads as a single sentence rather than "OUTLYER — Inclusive… — OUTLYER".
const HOME_TITLE = "OUTLYER | Inclusive Film & TV Production";
export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: SITE_TAGLINE,
    path: "/",
  }),
  title: { absolute: HOME_TITLE },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildOrganization(founders)} />
      <JsonLd data={buildWebSite()} />
      <JsonLd
        data={buildWebPage({
          name: "OUTLYER — Inclusive Film & TV Production",
          description: SITE_TAGLINE,
          path: "/",
        })}
      />
      {founders.map((f) => (
        <JsonLd key={f.slug} data={buildPerson(f)} />
      ))}
      <HeroCarousel />
      <MissionBlock />
      <FoundersGrid />
      <ContactAnchor />
    </>
  );
}
