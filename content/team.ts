// Team page data. Founders are reused from content/founders.ts for the
// homepage Founders section but are NOT shown on /team — /team is the
// operating team only.

import { founders, type Founder } from "./founders";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string; objectPosition?: string };
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

// The operating team. Order matches /team desktop layout: 2, then 3, then 3.
export const broaderTeam: TeamMember[] = [
  {
    name: "Chris Kennedy",
    role: "COO",
    bio: "Chris is an entrepreneur and COO specialising in translating strategy into execution across startups, scaleups, and global organisations. He has led operational, financial, and delivery functions across both venture-backed businesses and investment banks.",
    photo: {
      src: "/headshots/Chris Kennedy.jpg",
      alt: "Portrait of Chris Kennedy, COO of 0UTLYER.",
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
    name: "Frances Knox",
    role: "Project Manager",
    bio: "",
    photo: {
      src: "/headshots/Frances Knox v2.png",
      alt: "Portrait of Frances Knox, Project Manager",
    },
  },
  {
    name: "Pat Kelly",
    role: "Brand Manager",
    bio: "",
    photo: {
      src: "/headshots/Pat Kelly.png",
      alt: "Portrait of Pat Kelly, Brand Manager.",
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

export const outlyerCircle: TeamMember[] = [
  {
    name: "Richard Baker MP",
    role: "Member of Parliament for Glenrothes and Mid Fife",
    bio: "",
    photo: {
      src: "/headshots/Richard Baker.png",
      alt: "Portrait of Richard Baker MP, Member of Parliament for Glenrothes and Mid Fife.",
    },
  },
  {
    name: "Lord Kevin Shinkwin",
    role: "Member of the House of Lords",
    bio: "",
    photo: {
      src: "/headshots/Lord Shinkwin.png",
      alt: "Portrait of Lord Kevin Shinkwin, Member of the House of Lords.",
    },
  },
  {
    name: "Emily Marr",
    role: "Senior Parliamentary Researcher",
    bio: "",
    photo: {
      src: "/headshots/Emily Marr.png",
      alt: "Portrait of Emily Marr, Senior Parliamentary Researcher.",
      objectPosition: "50% 35%",
    },
  },
  {
    name: "Prof. Kim Hoque",
    role: "Professor of Human Resource Management at King's Business School",
    bio: "",
    photo: {
      src: "/headshots/Kim Hoque.png",
      alt: "Portrait of Prof. Kim Hoque, Professor of Human Resource Management at King's Business School.",
    },
  },
  {
    name: "Sara Johnson",
    role: "Pioneering Access Coordinator & Industry Creative",
    bio: "",
    photo: {
      src: "/headshots/Sara Johnson.png",
      alt: "Portrait of Sara Johnson, Pioneering Access Coordinator & Industry Creative",
    },
  },
  {
    name: "Julie Fernandez",
    role: "Pioneering Access Coordinator / Film Maker & Actress",
    bio: "",
    photo: {
      src: "/headshots/Julie Fernandez.png",
      alt: "Portrait of Julie Fernandez, Pioneering Access Coordinator / Film Maker & Actress",
    },
  },
  {
    name: "David Forbes-Nixon OBE",
    role: "Founder and Chairman of DFN Charitable Foundation",
    bio: "",
    photo: {
      src: "/headshots/David Forbes-Nixon.png",
      alt: "Portrait of David Forbes-Nixon OBE, Founder and Chairman of DFN Charitable Foundation",
    },
  },
  {
    name: "Katie Reay",
    role: "Psychologist & Communication Coach",
    bio: "",
    photo: {
      src: "/headshots/Katie Reay.png",
      alt: "Portrait of Katie Reay, Psychologist & Communication Coach",
    },
  },
  {
    name: "Laurence Fishman FCA",
    role: "Partner at NLP - THE accountant for trailblazers & game changers",
    bio: "",
    photo: {
      src: "/headshots/Laurence Fishman.png",
      alt: "Portrait of Laurence Fishman FCA, Partner at NLP - THE accountant for trailblazers & game changers",
    },
  },
  {
    name: "David King TEP",
    role: "Partner at HCR Law - Head of Sport, Media, and Entertainment",
    bio: "",
    photo: {
      src: "/headshots/David King.png",
      alt: "Portrait of David King TEP, Partner at HCR Law - Head of Sport, Media, and Entertainment",
    },
  },
  {
    name: "Jon Geldart Hon DBA",
    role: "Director General, Institute of Directors",
    bio: "",
    photo: {
      src: "/headshots/Jon Geldart.png",
      alt: "Portrait of Jon Geldart Hon DBA, Director General, Institute of Directors",
    },
  },
  {
    name: "Lee Brooks",
    role: "Co-Founder & CEO of Production Park",
    bio: "",
    photo: {
      src: "/headshots/Lee Brooks.png",
      alt: "Lee Brooks, Co-Founder & CEO of Production Park",
    },
  },
];
