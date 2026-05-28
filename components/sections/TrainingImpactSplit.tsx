import { trainingImpact } from "../../content/training-recruitment";

export function TrainingImpactSplit() {
  const {
    image,
    heading,
    paragraphs,
    stats,
    paragraphsAfterStats,
    event,
  } = trainingImpact;

  return (
    <section
      className="ol-training-impact"
      aria-labelledby="training-impact-heading"
    >
      <div className="ol-training-impact-grid">
        <figure className="ol-training-impact-media">
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
        <div className="ol-training-impact-copy">
          <h2 id="training-impact-heading" className="ol-training-impact-heading">
            {heading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="ol-training-impact-body">
              {paragraph}
            </p>
          ))}
          <dl className="ol-training-impact-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="ol-training-impact-stat">
                <dt className="ol-training-impact-stat-value">{stat.value}</dt>
                <dd className="ol-training-impact-stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
          {paragraphsAfterStats.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="ol-training-impact-body">
              {paragraph}
            </p>
          ))}
          <div className="ol-training-impact-event">
            <p className="ol-training-impact-event-label">{event.label}</p>
            <p className="ol-training-impact-event-detail">
              {event.date} <span aria-hidden="true">•</span> {event.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
