export type Founder = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
  link?: { label: string; href: string };
  hideCta?: boolean;
};

export const founders: Founder[] = [
  {
    slug: "emmanuel-kelly",
    name: "Emmanuel Kelly",
    role: "CVO & Co - Founder",
    bio: "A globally recognised icon in the entertainment space, Emmanuel broke new ground as the first differently-abled artist to perform on a stadium tour.",
    photo: {
      src: "/headshots/Emmanuel Kelly.png",
      alt: "Portrait of Emmanuel Kelly, CVO and Co-Founder of Outlyer.",
    },
    link: {
      label: "emmanuelkelly.com",
      href: "https://www.emmanuelkelly.com/",
    },
  },
  {
    slug: "joanne-reay",
    name: "Joanne Reay",
    role: "CEO & Co - Founder",
    bio: "With over twenty-five years' experience in film and television, Joanne has headed up divisions in the BBC, Red Bull Media and The Discovery Channel.",
    photo: {
      src: "/headshots/Joanne Rey.jpg",
      alt: "Portrait of Joanne Reay, CEO and Co-Founder of Outlyer.",
    },
    hideCta: true,
  },
  {
    slug: "chris-martin",
    name: "Chris Martin",
    role: "Honorary Founder & President",
    bio: "",
    photo: {
      src: "/headshots/Chris Martin.avif",
      alt: "Portrait of Chris Martin, Honorary Founder and President of Outlyer.",
    },
  },
];
