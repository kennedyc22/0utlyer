// Partners page data.

export type Partner = {
  name: string;
  logo: { src: string; alt: string };
  url?: string;
  blurb?: string;
};

export const partners: Partner[] = [
  {
    name: "Production Park",
    logo: {
      src: "/partner-logos/Production Park.avif",
      alt: "Production Park — where global tours are staged.",
    },
    url: "https://www.productionpark.co.uk/",
  },
  {
    name: "Double Negative",
    logo: {
      src: "/partner-logos/double-negative.avif",
      alt: "Double Negative — visual effects partner.",
    },
    url: "https://www.dneg.com/",
  },
  {
    name: "Disney",
    logo: {
      src: "/partner-logos/Disney.avif",
      alt: "Disney — distribution partner.",
    },
    url: "https://www.disney.com/",
  },
];
