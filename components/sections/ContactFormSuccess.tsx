import Link from "next/link";
import { Button } from "../primitives/Button";

/** Shown after Netlify redirects back with ?contact=sent#contact */
export function ContactFormSuccess() {
  return (
    <div
      className="ol-contact-success"
      role="status"
      aria-live="polite"
      tabIndex={-1}
      autoFocus
      data-testid="contact-form-success"
    >
      <p className="ol-contact-success-lead">
        Thanks. We&rsquo;ll be in touch.
      </p>
      <p className="ol-contact-success-detail">
        Your message was submitted successfully.
      </p>
      <Button as="a" href="/#contact" variant="secondary" size="lg">
        Send another message
      </Button>
      <p className="ol-contact-success-home">
        <Link href="/" className="ol-link-underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
