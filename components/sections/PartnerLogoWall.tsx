import type { CSSProperties } from "react";
import NextImage from "next/image";
import type { Partner } from "../../content/partners";

const tileStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: "3 / 2",
  background: "var(--color-paper)",
  border: "1px solid var(--color-border)",
  padding: "var(--space-6)",
};

const imgStyle: CSSProperties = {
  objectFit: "contain",
  width: "auto",
  height: "auto",
  maxWidth: "70%",
  maxHeight: "60%",
};

function Tile({ partner }: { partner: Partner }) {
  const inner = (
    <span className="ol-partner-logo" style={{ display: "contents" }}>
      <NextImage
        src={partner.logo.src}
        alt={partner.logo.alt}
        width={200}
        height={80}
        style={imgStyle}
      />
    </span>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        style={tileStyle}
        aria-label={partner.name}
      >
        {inner}
      </a>
    );
  }
  return (
    <div style={tileStyle} role="img" aria-label={partner.name}>
      {inner}
    </div>
  );
}

export function PartnerLogoWall({ partners }: { partners: Partner[] }) {
  return (
    <div className="ol-partner-wall" data-count={partners.length}>
      {partners.map((p, i) => (
        <Tile key={`${p.name}-${i}`} partner={p} />
      ))}
    </div>
  );
}
