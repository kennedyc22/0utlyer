import type { TeamMember } from "../../content/team";
import { TeamCard } from "./TeamCard";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul className="ol-team-grid ol-team-layout" data-count={members.length}>
      {members.map((member, index) => (
        <li
          key={member.name}
          className="ol-team-layout__item"
          data-team-index={index + 1}
        >
          <TeamCard member={member} />
        </li>
      ))}
    </ul>
  );
}
