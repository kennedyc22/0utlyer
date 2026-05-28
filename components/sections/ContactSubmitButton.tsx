"use client";

import { useEffect, useState } from "react";
import { Button } from "../primitives/Button";

/**
 * Strict captcha gate: SEND stays disabled until a reCAPTCHA token is present.
 */
export function ContactSubmitButton() {
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [captchaVisible, setCaptchaVisible] = useState(false);

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>(
      'form[name="contact"]',
    );
    if (!form) return;

    const sync = () => {
      const hasWidget = Boolean(form.querySelector('iframe[src*="recaptcha"]'));
      setCaptchaVisible(hasWidget);
      if (!hasWidget) {
        setSubmitEnabled(false);
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
    <>
      {!captchaVisible ? (
        <p className="ol-form-captcha-status" role="status" aria-live="polite">
          Loading captcha challenge...
        </p>
      ) : null}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!submitEnabled}
      >
        SEND
      </Button>
    </>
  );
}
