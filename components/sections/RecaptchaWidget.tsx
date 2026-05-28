"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
    };
  }
}

export function RecaptchaWidget({ siteKey }: { siteKey: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    let attempts = 0;

    const tryRender = () => {
      if (disposed) return true;
      const host = hostRef.current;
      const grecaptcha = window.grecaptcha;
      if (!host || !grecaptcha?.render) return false;
      if (host.hasChildNodes()) return true;
      try {
        grecaptcha.render(host, { sitekey: siteKey });
        return true;
      } catch {
        return false;
      }
    };

    if (tryRender()) return;

    const interval = window.setInterval(() => {
      attempts += 1;
      if (tryRender()) {
        window.clearInterval(interval);
        return;
      }
      // ~10s fallback to avoid infinite spinner when script is blocked.
      if (attempts > 50) {
        setError(true);
        window.clearInterval(interval);
      }
    }, 200);

    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [siteKey]);

  return (
    <>
      <div ref={hostRef} />
      {error ? (
        <p className="ol-form-captcha-status" role="status" aria-live="polite">
          Captcha failed to load. Please refresh and try again.
        </p>
      ) : null}
    </>
  );
}
