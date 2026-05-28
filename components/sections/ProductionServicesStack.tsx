import { Container } from "../primitives/Container";
import type { ProductionService } from "../../content/production-services";

export function ProductionServicesStack({
  services,
}: {
  services: ProductionService[];
}) {
  return (
    <section className="ol-production-stack" aria-label="Production services">
      <Container>
        <ul className="ol-production-list">
          {services.map((service) => (
            <li key={service.id}>
              <figure className="ol-production-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  className="ol-production-image-media"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
