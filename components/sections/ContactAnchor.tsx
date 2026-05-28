import NextImage from "next/image";
import { Container } from "../primitives/Container";
import { BrandLockup } from "./BrandLockup";
import { ContactIntroBlock } from "./ContactIntroBlock";
import { ContactFormSuccess } from "./ContactFormSuccess";
import { ContactSubmitButton } from "./ContactSubmitButton";

type ContactAnchorProps = {
  /** Set when Netlify redirects back with ?contact=sent#contact after a successful POST */
  submitted?: boolean;
  /** Netlify post-submit destination. */
  redirectPath?: string;
  heading?: string;
  ariaLabel?: string;
  showRibbon?: boolean;
  /** Centre the form (used on Production Services; home keeps default layout). */
  centered?: boolean;
  /** Home: carousel brand lockup left, form right. */
  layout?: "default" | "split";
  /** Optional intro copy shown below the heading and above the form. */
  body?: string;
  className?: string;
};

function ContactFormFields({
  submitted,
  redirectPath,
  heading,
  showHeading,
}: {
  submitted: boolean;
  redirectPath: string;
  heading: string;
  showHeading: boolean;
}) {
  return (
    <>
      {showHeading ? <h2>{heading}</h2> : null}
      {submitted ? (
        <ContactFormSuccess />
      ) : (
        <form
          className="ol-form"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
          encType="application/x-www-form-urlencoded"
          action={redirectPath}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don&rsquo;t fill this out: <input name="bot-field" />
            </label>
          </p>
          <div className="ol-form-row">
            <div className="ol-field">
              <label htmlFor="contact-firstName">
                First Name <span aria-hidden="true">*</span>{" "}
                <span className="ol-required-text">(required)</span>
              </label>
              <input
                id="contact-firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
              />
            </div>
            <div className="ol-field">
              <label htmlFor="contact-lastName">
                Last Name <span aria-hidden="true">*</span>{" "}
                <span className="ol-required-text">(required)</span>
              </label>
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
            <label htmlFor="contact-email">
              Email <span aria-hidden="true">*</span>{" "}
              <span className="ol-required-text">(required)</span>
            </label>
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
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              autoComplete="off"
            />
          </div>
          <div
            className="ol-form-recaptcha"
            data-netlify-recaptcha="true"
            aria-label="Spam protection challenge"
          />
          <ContactSubmitButton />
        </form>
      )}
      <p
        style={{
          marginTop: "var(--space-6)",
          textAlign: "center",
          fontSize: "var(--text-meta)",
        }}
      >
        <a
          href="mailto:info@0utlyer.com"
          className="ol-link-underline"
          data-testid="contact-anchor-mailto"
          style={{ color: "var(--color-fg-muted)", textDecoration: "none" }}
        >
          info@0utlyer.com
        </a>
      </p>
    </>
  );
}

export function ContactAnchor({
  submitted = false,
  redirectPath = "/thank-you",
  heading = "Contact Us",
  ariaLabel = "Contact us",
  showRibbon = true,
  centered = false,
  layout = "default",
  body,
  className = "",
}: ContactAnchorProps) {
  const isSplit = layout === "split";
  const sectionClass = [
    "ol-contact",
    centered ? "ol-contact--centered" : "",
    isSplit ? "ol-contact--split" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id="contact" className={sectionClass} aria-label={ariaLabel}>
      {showRibbon && !isSplit ? (
        <div className="ol-contact-ribbon" aria-hidden="true">
          <NextImage
            src="/icon.avif"
            alt=""
            width={800}
            height={800}
            unoptimized
          />
        </div>
      ) : null}
      <Container>
        {isSplit ? (
          <div className="ol-contact-split">
            <div className="ol-contact-brand" aria-hidden="true">
              <BrandLockup variant="contact" />
            </div>
            <div className="ol-contact-inner">
              <ContactFormFields
                submitted={submitted}
                redirectPath={redirectPath}
                heading={heading}
                showHeading
              />
            </div>
          </div>
        ) : (
          <>
            {body ? <ContactIntroBlock heading={heading} body={body} /> : null}
            <div className="ol-contact-inner">
              <ContactFormFields
                submitted={submitted}
                redirectPath={redirectPath}
                heading={heading}
                showHeading={!body}
              />
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
