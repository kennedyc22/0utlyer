import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "../primitives/Heading";
import { Image } from "../primitives/Image";
import { Text } from "../primitives/Text";
import type { TeamMember } from "../../content/team";

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-3)",
};

const roleStyle: CSSProperties = {
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-meta)",
  lineHeight: "var(--leading-normal)",
  letterSpacing: "var(--tracking-wide)",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "var(--color-fg-muted)",
  margin: 0,
};

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  color: "var(--color-fg)",
  fontFamily: "var(--font-text)",
  fontSize: "var(--text-small)",
  textDecoration: "none",
  marginTop: "var(--space-2)",
};

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article style={cardStyle} aria-label={member.name}>
      <Image
        src={member.photo.src}
        alt={member.photo.alt}
        aspectRatio="3:4"
        sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 100vw"
      />
      <Heading as="h3" size="display-3">
        {member.name}
      </Heading>
      <p style={roleStyle}>{member.role}</p>
      {member.bio ? <Text variant="small">{member.bio}</Text> : null}
      {member.links?.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          className="ol-link-underline"
        >
          {l.label}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      ))}
    </article>
  );
}
