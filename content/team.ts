// Team page data. Founders are reused from content/founders.ts for the
// homepage Founders section but are NOT shown on /team — /team is the
// operating team only.

import { founders, type Founder } from "./founders";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
  links?: Array<{ label: string; href: string }>;
};

// Re-exposed for any callers that still want the founders in TeamMember shape.
export const founderTeamMembers: TeamMember[] = founders.map(
  (f: Founder): TeamMember => ({
    name: f.name,
    role: f.role,
    bio: f.bio,
    photo: f.photo,
    links: f.link ? [f.link] : undefined,
  }),
);

// The operating team. Order matches the /team layout reference (two rows
// of two at desktop, then the remaining members below).
export const broaderTeam: TeamMember[] = [
  {
    name: "Chris Kennedy",
    role: "COO",
    bio: "Chris is an entrepreneur and COO specialising in translating strategy into execution across startups, scaleups, and global organisations. He has led operational, financial, and delivery functions across both venture-backed businesses and investment banks.",
    photo: {
      src: "/headshots/Chris Kennedy.jpg",
      alt: "Portrait of Chris Kennedy, COO of Outlyer.",
    },
  },
  {
    name: "Rod Smith",
    role: "VP of OUTSELL & Head of Sales and Distribution",
    bio: "Rod Smith is a film and TV executive with 25+ years' experience in acquisitions and distribution across UK and global markets. He's known for driving growth, leading M&A, and launching award-winning content at companies like Starz and Anchor Bay where he was the Head of global acquisition.",
    photo: {
      src: "/headshots/rod smith.jpg",
      alt: "Portrait of Rod Smith, VP of OUTSELL and Head of Sales and Distribution.",
    },
  },
  {
    name: "Rich Aitken",
    role: "VP OUTLOUD & Head of Sound Post",
    bio: "A score mixer and producer, he specialises in delivering AAA-standard, world-class mixes for leading composers across film, TV, and games. His credits include Ivor Novello, Emmy, BAFTA, and MASA-winning and nominated scores such as Killzone, 24, How We Invented the World, Clumsy Ninja, The Forgiven, Horizon Zero Dawn and The Reliant.",
    photo: {
      src: "/headshots/Rich Aitken.jpg",
      alt: "Portrait of Rich Aitken, VP OUTLOUD and Head of Sound Post.",
    },
  },
  {
    name: "Sue Carey",
    role: "Operations Manager",
    bio: "",
    photo: {
      src: "/headshots/Sue.avif",
      alt: "Portrait of Sue Carey, Operations Manager.",
    },
  },
  {
    name: "Matteo Ingrao",
    role: "In-House Executive Producer",
    bio: "",
    photo: {
      src: "/headshots/Matteo Ingrao.jpg",
      alt: "Portrait of Matteo Ingrao, In-House Executive Producer.",
    },
  },
  {
    name: "Chris Curry",
    role: "Post Production Manager",
    bio: "",
    photo: {
      src: "/headshots/Chris Curry.avif",
      alt: "Portrait of Chris Curry, Post Production Manager.",
    },
  },
];
