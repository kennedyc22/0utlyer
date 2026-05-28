import type { Metadata } from "next";
import { ContactAnchor } from "../../components/sections/ContactAnchor";
import { TrainingRecruitmentHero } from "../../components/sections/TrainingRecruitmentHero";
import { TrainingImpactSplit } from "../../components/sections/TrainingImpactSplit";
import { TrainingOpportunitiesSplit } from "../../components/sections/TrainingOpportunitiesSplit";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildBreadcrumb, buildWebPage } from "../../lib/seo/schema";
import {
  trainingRecruitmentHero,
  trainingSupportCta,
} from "../../content/training-recruitment";

const DESCRIPTION = `${trainingRecruitmentHero.body} ${trainingRecruitmentHero.tagline}.`;

export const metadata: Metadata = buildMetadata({
  title: "Training & Recruitment",
  description: DESCRIPTION,
  path: "/training-recruitment",
});

export default async function TrainingRecruitmentPage({
  searchParams,
}: {
  searchParams: Promise<{ contact?: string }>;
}) {
  const { contact } = await searchParams;
  const contactSubmitted = contact === "sent";

  return (
    <>
      <JsonLd
        data={buildWebPage({
          name: "Training & Recruitment — 0UTLYER",
          description: DESCRIPTION,
          path: "/training-recruitment",
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          {
            name: "Training & Recruitment",
            path: "/training-recruitment",
          },
        ])}
      />
      <TrainingRecruitmentHero />
      <TrainingOpportunitiesSplit />
      <TrainingImpactSplit />
      <ContactAnchor
        submitted={contactSubmitted}
        redirectPath="/thank-you"
        heading={trainingSupportCta.heading}
        body={trainingSupportCta.body}
        ariaLabel="Support the mission"
        showRibbon={false}
        centered
        className="ol-training-contact"
      />
    </>
  );
}
