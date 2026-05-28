"use client";

import { useEffect, useState } from "react";
import { Button } from "../primitives/Button";

/**
 * Disables SEND until Netlify's reCAPTCHA challenge is completed when the
 * widget is present (production on Netlify). Local dev has no widget — submit
 * stays enabled so the form layout can still be tested.
 */
export function ContactSubmitButton() {
  const [submitEnabled, setSubmitEnabled] = useState(
    process.env.NODE_ENV === "development",
  );

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('form[name="contact"]');
    if (!form) return;

    const sync = () => {
      const hasWidget = Boolean(
        form.querySelector('iframe[src*="recaptcha"], .g-recaptcha'),
      );
      if (!hasWidget) {
        setSubmitEnabled(process.env.NODE_ENV === "development");
        return;
      }
      const response = form.querySelector<HTMLTextAreaElement>(
        'textarea[name="g-recaptcha-response"]',
      );
      setSubmitEnabled(Boolean(response?.value));
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(form, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value"],
    });
    const interval = window.setInterval(sync, 400);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return (
    <Button type="submit" variant="primary" size="lg" disabled={!submitEnabled}>
      SEND
    </Button>
  );
}
