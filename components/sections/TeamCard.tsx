import NextImage from "next/image";
import type { TeamMember } from "../../content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  const hasBio = member.bio.trim().length > 0;
  return (
    <article className="ol-team-card" aria-label={member.name}>
      <div className="ol-team-portrait">
        <NextImage
          src={member.photo.src}
          alt={member.photo.alt}
          width={400}
          height={400}
          sizes="200px"
        />
      </div>
      <h3 className="ol-team-name">{member.name}</h3>
      <p className="ol-team-role">{member.role}</p>
      {hasBio ? (
        <div className="ol-team-overlay" aria-hidden="true">
          <p className="ol-team-bio">{member.bio}</p>
          <div className="ol-team-overlay-meta">
            <span className="ol-team-overlay-name">{member.name}</span>
            <span className="ol-team-overlay-role">{member.role}</span>
          </div>
        </div>
      ) : null}
    </article>
  );
}
