import { trainingOpportunities } from "../../content/training-recruitment";

export function TrainingOpportunitiesSplit() {
  const { image, heading, paragraphs, ribbon } = trainingOpportunities;

  return (
    <section
      className="ol-training-opportunities"
      aria-labelledby="training-opportunities-heading"
    >
      <div className="ol-training-opportunities-grid">
        <figure className="ol-training-opportunities-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="ol-training-opportunities-copy">
          <h2
            id="training-opportunities-heading"
            className="ol-training-opportunities-heading"
          >
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="ol-training-opportunities-body"
            >
              {paragraph}
            </p>
          ))}
          <p className="ol-training-opportunities-ribbon">{ribbon}</p>
        </div>
      </div>
    </section>
  );
}
