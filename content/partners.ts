// Partners page data.

export type Partner = {
  name: string;
  logo: { src: string; alt: string };
  url?: string;
  blurb?: string;
};

export const partners: Partner[] = [
  {
    name: "Garden Studios",
    logo: {
      src: "/partner-logos/garden-studios.avif",
      alt: "Garden Studios — virtual production stage partner.",
    },
  },
  {
    name: "Double Negative",
    logo: {
      src: "/partner-logos/double-negative.avif",
      alt: "Double Negative — visual effects partner.",
    },
  },
  {
    name: "Netflix",
    logo: {
      src: "/partner-logos/Netlfix.avif",
      alt: "Netflix — distribution partner.",
    },
  },
];
