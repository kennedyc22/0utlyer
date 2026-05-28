import Link from "next/link";
import { Container } from "../../components/primitives/Container";
import { Section } from "../../components/primitives/Section";

export default function ThankYouPage() {
  return (
    <Section bg="paper" padding="xl">
      <Container>
        <div className="ol-contact-success" data-testid="contact-form-success">
          <p className="ol-contact-success-lead">Thanks. We received your message.</p>
          <p className="ol-contact-success-detail">
            A member of the 0UTLYER team will get back to you soon.
          </p>
          <p className="ol-contact-success-home">
            <Link href="/" className="ol-link-underline">
              Return to home
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
