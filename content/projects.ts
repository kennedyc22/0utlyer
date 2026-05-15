// Phase 4b: Project index + detail pages.
// Every placeholder field is marked with a structured TODO that Dan can grep:
//   TODO(content): project.<slug>.<field>
// Hero images live at /project-images/<slug>.avif (PRD §2.2), except
// dream-fever which is .png until re-encoded. wolf-who-chased-the-sun has
// no banner supplied yet — see TODO(asset).

export type ProjectStatus = "In Development" | "In Production" | "Released";

export type Project = {
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  synopsis: string;
  description: string;
  hero: { src: string; alt: string };
  credits: Array<{ role: string; name: string }>;
  ogImage: string;
};

export const projects: Project[] = [
  {
    slug: "dream-fever",
    title: "Dream Fever",
    // TODO(content): project.dream-fever.year — confirm real production year (2025 placeholder).
    year: 2025,
    // TODO(content): project.dream-fever.status — currently set to default placeholder.
    status: "In Development",
    // TODO(content): project.dream-fever.synopsis — replace placeholder with one-line synopsis.
    synopsis: "Documentary — one-line synopsis to be confirmed.",
    // TODO(content): project.dream-fever.description — 2–3 short paragraphs for detail page.
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.dream-fever.hero — confirm hero crop / replace placeholder.
      src: "/project-images/dream-fever.png",
      alt: "Dream Fever — hero still placeholder.",
    },
    // TODO(content): project.dream-fever.credits — supply role/name pairs.
    credits: [],
    // TODO(content): project.dream-fever.ogImage — supply bespoke 1200×630 OG image.
    ogImage: "/project-images/dream-fever.png",
  },
  {
    slug: "crewel-work",
    title: "Crewel Work",
    // TODO(content): project.crewel-work.year
    year: 2025,
    // TODO(content): project.crewel-work.status
    status: "In Development",
    // TODO(content): project.crewel-work.synopsis
    synopsis:
      "Interactive, murder mystery — one-line synopsis to be confirmed.",
    // TODO(content): project.crewel-work.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.crewel-work.hero
      src: "/project-images/crewel-work.avif",
      alt: "Crewel Work — hero still placeholder.",
    },
    // TODO(content): project.crewel-work.credits
    credits: [],
    // TODO(content): project.crewel-work.ogImage
    ogImage: "/project-images/crewel-work.avif",
  },
  {
    slug: "wolf-who-chased-the-sun",
    title: "Wolf Who Chased The Sun",
    // TODO(content): project.wolf-who-chased-the-sun.year
    year: 2025,
    // TODO(content): project.wolf-who-chased-the-sun.status
    status: "In Development",
    // TODO(content): project.wolf-who-chased-the-sun.synopsis
    synopsis: "Gothic, Western — one-line synopsis to be confirmed.",
    // TODO(content): project.wolf-who-chased-the-sun.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(asset): banner not yet supplied — see PRD §1 slug list.
      // TODO(content): project.wolf-who-chased-the-sun.hero
      src: "/project-images/wolf-who-chased-the-sun.avif",
      alt: "Wolf Who Chased The Sun — hero still placeholder.",
    },
    // TODO(content): project.wolf-who-chased-the-sun.credits
    credits: [],
    // TODO(content): project.wolf-who-chased-the-sun.ogImage
    ogImage: "/project-images/wolf-who-chased-the-sun.avif",
  },
  {
    slug: "slippery-beast",
    title: "Slippery Beast",
    // TODO(content): project.slippery-beast.year
    year: 2025,
    // TODO(content): project.slippery-beast.status
    status: "In Development",
    // TODO(content): project.slippery-beast.synopsis
    synopsis: "Crime, mystery, thriller — one-line synopsis to be confirmed.",
    // TODO(content): project.slippery-beast.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.slippery-beast.hero
      src: "/project-images/slippery-beast.avif",
      alt: "Slippery Beast — hero still placeholder.",
    },
    // TODO(content): project.slippery-beast.credits
    credits: [],
    // TODO(content): project.slippery-beast.ogImage
    ogImage: "/project-images/slippery-beast.avif",
  },
  {
    slug: "game-of-hearts",
    title: "Game of Hearts",
    // TODO(content): project.game-of-hearts.year
    year: 2025,
    // TODO(content): project.game-of-hearts.status
    status: "In Development",
    // TODO(content): project.game-of-hearts.synopsis
    synopsis:
      "Rom-com, musical, Christmas — one-line synopsis to be confirmed.",
    // TODO(content): project.game-of-hearts.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.game-of-hearts.hero
      src: "/project-images/game-of-hearts.avif",
      alt: "Game of Hearts — hero still placeholder.",
    },
    // TODO(content): project.game-of-hearts.credits
    credits: [],
    // TODO(content): project.game-of-hearts.ogImage
    ogImage: "/project-images/game-of-hearts.avif",
  },
  {
    slug: "the-widow-man",
    title: "The Widow Man",
    // TODO(content): project.the-widow-man.year
    year: 2025,
    // TODO(content): project.the-widow-man.status
    status: "In Development",
    // TODO(content): project.the-widow-man.synopsis
    synopsis:
      "Martial arts, Western, action — one-line synopsis to be confirmed.",
    // TODO(content): project.the-widow-man.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.the-widow-man.hero
      src: "/project-images/the-widow-man.avif",
      alt: "The Widow Man — hero still placeholder.",
    },
    // TODO(content): project.the-widow-man.credits
    credits: [],
    // TODO(content): project.the-widow-man.ogImage
    ogImage: "/project-images/the-widow-man.avif",
  },
  {
    slug: "mission-creep",
    title: "Mission Creep",
    // TODO(content): project.mission-creep.year
    year: 2025,
    // TODO(content): project.mission-creep.status
    status: "In Development",
    // TODO(content): project.mission-creep.synopsis
    synopsis: "Elevated, action — one-line synopsis to be confirmed.",
    // TODO(content): project.mission-creep.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.mission-creep.hero
      src: "/project-images/mission-creep.avif",
      alt: "Mission Creep — hero still placeholder.",
    },
    // TODO(content): project.mission-creep.credits
    credits: [],
    // TODO(content): project.mission-creep.ogImage
    ogImage: "/project-images/mission-creep.avif",
  },
  {
    slug: "an-orc-in-new-york",
    title: "An Orc In New York",
    // TODO(content): project.an-orc-in-new-york.year
    year: 2025,
    // TODO(content): project.an-orc-in-new-york.status
    status: "In Development",
    // TODO(content): project.an-orc-in-new-york.synopsis
    synopsis:
      "Christmas, family, animated — one-line synopsis to be confirmed.",
    // TODO(content): project.an-orc-in-new-york.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.an-orc-in-new-york.hero
      src: "/project-images/an-orc-in-new-york.avif",
      alt: "An Orc In New York — hero still placeholder.",
    },
    // TODO(content): project.an-orc-in-new-york.credits
    credits: [],
    // TODO(content): project.an-orc-in-new-york.ogImage
    ogImage: "/project-images/an-orc-in-new-york.avif",
  },
  {
    slug: "something-blue",
    title: "Something Blue",
    // TODO(content): project.something-blue.year
    year: 2025,
    // TODO(content): project.something-blue.status
    status: "In Development",
    // TODO(content): project.something-blue.synopsis
    synopsis:
      "Thriller, crime, murder mystery — one-line synopsis to be confirmed.",
    // TODO(content): project.something-blue.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.something-blue.hero
      src: "/project-images/something-blue.avif",
      alt: "Something Blue — hero still placeholder.",
    },
    // TODO(content): project.something-blue.credits
    credits: [],
    // TODO(content): project.something-blue.ogImage
    ogImage: "/project-images/something-blue.avif",
  },
  {
    slug: "high-power-williams",
    title: "High Power Williams",
    // TODO(content): project.high-power-williams.year
    year: 2025,
    // TODO(content): project.high-power-williams.status
    status: "In Development",
    // TODO(content): project.high-power-williams.synopsis
    synopsis:
      "Script available on request — one-line synopsis to be confirmed.",
    // TODO(content): project.high-power-williams.description
    description: "Description placeholder. Dan to supply 2–3 short paragraphs.",
    hero: {
      // TODO(content): project.high-power-williams.hero
      src: "/project-images/high-power-williams.avif",
      alt: "High Power Williams — hero still placeholder.",
    },
    // TODO(content): project.high-power-williams.credits
    credits: [],
    // TODO(content): project.high-power-williams.ogImage
    ogImage: "/project-images/high-power-williams.avif",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
