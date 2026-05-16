import { HeroCarousel } from "../components/sections/HeroCarousel";
import { MissionBlock } from "../components/sections/MissionBlock";
import { FoundersGrid } from "../components/sections/FoundersGrid";
import { ContactAnchor } from "../components/sections/ContactAnchor";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MissionBlock />
      <FoundersGrid />
      <ContactAnchor />
    </>
  );
}
