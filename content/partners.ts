// Phase 4d: Partners page data.
// The audit only mentions Garden Studios, Double Negative and Netflix by
// name and supplies no logos. Eight placeholder entries seeded for layout —
// Dan replaces each with real partners + logos before launch.

export type Partner = {
  name: string;
  logo: { src: string; alt: string };
  url?: string;
  blurb?: string;
};

// TODO(content): partners — replace all eight placeholders with real
// partners (name, logo, url, optional blurb). Logo files should be SVG
// monochrome at /partner-logos/<slug>.svg per design system §5.
export const partners: Partner[] = [
  {
    // TODO(content): partner.1
    name: "Partner 1",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 1 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.2
    name: "Partner 2",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 2 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.3
    name: "Partner 3",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 3 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.4
    name: "Partner 4",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 4 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.5
    name: "Partner 5",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 5 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.6
    name: "Partner 6",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 6 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.7
    name: "Partner 7",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 7 logo placeholder.",
    },
  },
  {
    // TODO(content): partner.8
    name: "Partner 8",
    logo: {
      src: "/partner-logos/placeholder.svg",
      alt: "Partner 8 logo placeholder.",
    },
  },
];
