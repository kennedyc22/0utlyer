import NextImage from "next/image";
import { Container } from "../primitives/Container";
import { mission } from "../../content/mission";

export function MissionBlock() {
  return (
    <section id="mission" aria-label="Our mission" className="ol-mission">
      <div className="ol-mission-bg" aria-hidden="true">
        <NextImage
          src="/Mission-Banner.avif"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="ol-mission-red">
        <Container>
          <h2>{mission.heading}</h2>
          <p>{mission.lead}</p>
        </Container>
      </div>
      <div className="ol-mission-dark">
        <Container>
          <ul className="ol-mission-stanza" aria-label="Who Outlyer is for">
            {mission.stanza.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="ol-mission-emphasis">{mission.emphasis}</p>
        </Container>
      </div>
    </section>
  );
}
