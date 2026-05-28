import type { Metadata } from "next";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";
import { ContactAnchor } from "../../components/sections/ContactAnchor";
import { ProductionServicesStack } from "../../components/sections/ProductionServicesStack";
import { JsonLd } from "../../components/seo/JsonLd";
import { buildMetadata } from "../../lib/seo/build-metadata";
import { buildBreadcrumb, buildWebPage } from "../../lib/seo/schema";
import {
  productionServices,
  productionServicesCta,
  productionServicesIntro,
} from "../../content/production-services";

const DESCRIPTION =
  "0UTLYER production services — 0utLoud, 0utGun, and 0utRageous. Full vendor post-production, sound, picture, and animation. Get in touch for a quote.";

export const metadata: Metadata = buildMetadata({
  title: "Production Services",
  description: DESCRIPTION,
  path: "/production-services",
});

export default async function ProductionServicesPage({
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
          name: "Production Services — 0UTLYER",
          description: DESCRIPTION,
          path: "/production-services",
        })}
      />
      <JsonLd
        data={buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Production Services", path: "/production-services" },
        ])}
      />
      <Section
        bg="paper"
        padding="xl"
        as="header"
        className="ol-production-page-head"
      >
        <Container>
          <h1 className="ol-page-title ol-production-page-title">
            {productionServicesIntro.title}
          </h1>
        </Container>
      </Section>
      <div className="ol-production-banner">
        <Container>
          <p className="ol-production-banner-text">
            {productionServicesIntro.body}
          </p>
        </Container>
      </div>
      <ProductionServicesStack services={productionServices} />
      <div className="ol-production-banner" aria-label="Get in touch">
        <Container>
          <p className="ol-production-banner-text">{productionServicesCta}</p>
        </Container>
      </div>
      <ContactAnchor
        submitted={contactSubmitted}
        redirectPath="/production-services?contact=sent#contact"
        heading="Contact Us"
        ariaLabel="Contact us"
        showRibbon={false}
        centered
      />
    </>
  );
}
