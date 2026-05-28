"use client";

import { useEffect, useState } from "react";
import { Button } from "../primitives/Button";

/**
 * Netlify-native captcha gate:
 * - if Netlify injects a captcha widget, SEND requires a token
 * - if no widget is injected, keep SEND enabled to avoid dead-lock
 */
export function ContactSubmitButton() {
  const [submitEnabled, setSubmitEnabled] = useState(true);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(
      'form[name="contact"]',
    );
    if (!form) return;

    const sync = () => {
      const hasWidget = Boolean(
        form.querySelector('iframe[src*="recaptcha"], .g-recaptcha'),
      );
      if (!hasWidget) {
        setSubmitEnabled(true);
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
