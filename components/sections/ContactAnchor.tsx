import NextImage from "next/image";
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";

export function ContactAnchor() {
  return (
    <section
      id="contact"
      className="ol-contact"
      aria-label="Join our community"
    >
      <div className="ol-contact-ribbon" aria-hidden="true">
        <NextImage
          src="/icon.avif"
          alt=""
          width={800}
          height={800}
          unoptimized
        />
      </div>
      <Container>
        <div className="ol-contact-inner">
          <h2>JOIN OUR COMMUNITY</h2>
          <form
            className="ol-form"
            name="contact"
            method="post"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/contact-success"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don&rsquo;t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="ol-form-row">
              <div className="ol-field">
                <label htmlFor="contact-firstName">First Name *</label>
                <input
                  id="contact-firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="ol-field">
                <label htmlFor="contact-lastName">Last Name *</label>
                <input
                  id="contact-lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div className="ol-field">
              <label htmlFor="contact-email">Email *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="ol-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={4} />
            </div>
            <Button type="submit" variant="primary" size="lg">
              SEND
            </Button>
          </form>
          {/* Accessibility fallback: keep a mailto so the existing smoke test
              and assistive tech still find a contact link. */}
          <p
            style={{
              marginTop: "var(--space-6)",
              textAlign: "center",
              fontSize: "var(--text-meta)",
            }}
          >
            <a
              href="mailto:hello@0utlyer.com"
              className="ol-link-underline"
              data-testid="contact-anchor-mailto"
              style={{ color: "var(--color-fg-muted)", textDecoration: "none" }}
            >
              hello@0utlyer.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
