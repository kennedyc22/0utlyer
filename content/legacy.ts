// Phase 4e: Legacy page content.
// Source-of-truth is content/legacy.mdx (verbatim from audit/content/copy.md
// Legacy section). This TypeScript mirror lets app/legacy/page.tsx render
// the content immediately without requiring @next/mdx to be installed.
//
// TODO(infra): once `npm install @next/mdx @mdx-js/loader @mdx-js/react
// @types/mdx` has been run and next.config wires MDX, switch the page to
// import the .mdx file directly and delete this mirror.

export type LegacyFrontmatter = {
  title: string;
  eyebrow: string;
  lead: string;
  images: Array<{ src: string; alt: string; caption?: string }>;
};

export const legacyFrontmatter: LegacyFrontmatter = {
  title: "The Kingdom of O",
  eyebrow: "Legacy",
  lead: "A world-changing partnership between Cambridge University and 0UTLYER.",
  images: [],
};

export const legacyParagraphs: string[] = [
  "As part of 0UTLYER's focus on live experience entertainment, we will create the world's first “successible” (environmentally sustainable and accessible) theme park.",
  "The Kingdom Of O, based on a story-world and characters created and wholly owned by 0UTLYER, will be an experience park (X-Park) where every ride is accessible, and all transportation and hospitality will be fully inclusive. Building The Kingdom Of O creates the blueprint for an entire city, with technological solutions that can be applied across the world.",
  "The Department of Engineering at Cambridge University is led by Professor John Clarkson, a passionate advocate of what he terms “universal design”. If we apply creative rigour to solve issues of design that exclude the 0UTLYER community, the end result will be design that is better for everyone.",
  "Together, 0UTLYER and Cambridge University Department of Engineering are pulling the sword from the stone. They are creating the 0UTLYER CENTRE FOR INCLUSIVE DESIGN (OCID), a world-leading centre of excellence that will break new ground in understanding the needs of the 0UTLYER community, innovate solution and create a depth of data that will allow future generations of designers and engineers to effortlessly build an inclusive world. The focal project will be The Kingdom Of O.",
  "The OCID will inform and inspire brands to engage with a vast consumer base and further, humanity will fully harness the untapped potential of over 2 Billion people.",
  "In February 2025, Trinity Hall, Cambridge hosted an inaugural symposium sponsored by 0UTLYER. Attended by leading academics in the field of inclusive design and global brands such as Unilever, Hitachi Rail and Jaguar Land Rover, the symposium successfully defined the road map by which we can build the 0UTLYER Centre of Inclusive Design as an integral faculty within Cambridge University's Engineering Department.",
  "We are looking for brand partners to support this venture. The massive commercial gain from engaging with the 0UTLYER community is self-evident, but this enterprise goes further.",
  "Technological solutions devised by the OCID will be marketable assets with potential valuations in the billions. The Kingdom Of O will be a profit generator.",
  "Beyond that, the world-changing mission of this global centre of excellence makes this a uniquely prestigious legacy project.",
];
