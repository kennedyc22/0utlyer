import { Container } from "../primitives/Container";
import { Section } from "../primitives/Section";
import { trainingRecruitmentHero } from "../../content/training-recruitment";

export function TrainingRecruitmentHero() {
  const { image, titleLines, body, tagline } = trainingRecruitmentHero;

  return (
    <>
      <section className="ol-training-hero-media-wrap" aria-label="0utShine">
        <figure className="ol-training-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            decoding="async"
          />
        </figure>
      </section>
      <Section
        bg="paper"
        padding="xl"
        as="header"
        className="ol-training-page-head"
      >
        <Container>
          <h1 className="ol-page-title ol-training-page-title">
            {titleLines.map((line) => (
              <span key={line} className="ol-training-page-title-line">
                {line}
              </span>
            ))}
          </h1>
        </Container>
      </Section>
      <div
        className="ol-production-banner ol-training-intro-banner"
        aria-label="0utShine introduction"
      >
        <Container>
          <p className="ol-production-banner-text">{body}</p>
          <p className="ol-training-tagline">{tagline}</p>
        </Container>
      </div>
    </>
  );
}
