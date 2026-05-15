// Phase 4c: Team page data.
// Founders are reused from content/founders.ts. The "broader team" array
// contains the operating team beyond the founders — Dan supplies real
// entries. The array starts empty; the section is hidden on /team until
// at least one entry is added.

import { founders, type Founder } from "./founders";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
  links?: Array<{ label: string; href: string }>;
};

// Founders re-exposed via the TeamMember shape for /team rendering.
export const founderTeamMembers: TeamMember[] = founders.map(
  (f: Founder): TeamMember => ({
    name: f.name,
    role: f.role,
    bio: f.bio,
    photo: f.photo,
    links: f.link ? [f.link] : undefined,
  }),
);

// TODO(content): team.broader — Dan to add the broader team here. Audit
// surfaced candidates (no bios attributed beyond role): Chris Kennedy (COO),
// Lisa Shaw (Development Executive & Production Manager), Matteo Ingrao
// (In-House Executive Producer), Susan Carey (Operations Manager), Chris
// Curry (Post Production Manager), Chairman Otana (Team Assistant), Rod
// Smith (VP of OUTSELL & Head of Sales and Distribution — bio captured in
// audit), Rich Aitken (VP OUTLOUD & Head of Sound Post — bio captured in
// audit). Each new member should match the TeamMember type.
export const broaderTeam: TeamMember[] = [];
