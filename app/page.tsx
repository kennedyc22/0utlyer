import { Hero } from "../components/sections/Hero";
import { MissionBlock } from "../components/sections/MissionBlock";
import { FoundersGrid } from "../components/sections/FoundersGrid";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { ContactAnchor } from "../components/sections/ContactAnchor";

export default function Home() {
  return (
    <>
      <Hero
        heading="A Film and TV production company with a powerful inclusion mission."
        sub="Founded by Coldplay's Chris Martin and Emmanuel Kelly."
        primaryCta={{ label: "Projects", href: "/projects" }}
        secondaryCta={{ label: "Contact", href: "/#contact" }}
      />
      <MissionBlock />
      <FoundersGrid />
      <FeaturedProjects />
      <ContactAnchor />
    </>
  );
}
