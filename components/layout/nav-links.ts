export type NavLink = {
  label: string;
  href: string;
  /** Opens in a new tab; used for off-site pages (e.g. emmanuelkelly.com). */
  external?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export type NavItem =
  | { type: "link"; link: NavLink }
  | { type: "group"; group: NavGroup };

export const navItems: NavItem[] = [
  { type: "link", link: { label: "Home", href: "/" } },
  {
    type: "group",
    group: {
      label: "What We Do",
      items: [
        { label: "Our Productions", href: "/projects" },
        { label: "Production Services", href: "/production-services" },
        {
          label: "Training & Recruitment",
          href: "/training-recruitment",
        },
      ],
    },
  },
  {
    type: "group",
    group: {
      label: "About",
      items: [
        { label: "Team", href: "/team" },
        { label: "Partners", href: "/partners" },
        { label: "Legacy", href: "/legacy" },
      ],
    },
  },
  {
    type: "link",
    link: {
      label: "Emmanuel Kelly",
      href: "https://www.emmanuelkelly.com/",
      external: true,
    },
  },
];

/** Flat list of all destinations (footer, crawlers, etc.). */
export const navLinks: NavLink[] = navItems.flatMap((item) =>
  item.type === "link" ? [item.link] : item.group.items,
);
