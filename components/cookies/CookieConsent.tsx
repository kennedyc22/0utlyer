"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type ConsentCategory = "marketing" | "functional" | "analytics";

type Consent = {
  decided: boolean;
  essential: true;
  marketing: boolean;
  functional: boolean;
  analytics: boolean;
};

const STORAGE_KEY = "ol_cookie_consent";
const CONSENT_EVENT = "ol:cookie-consent";

const DEFAULT_CONSENT: Consent = {
  decided: false,
  essential: true,
  marketing: false,
  functional: false,
  analytics: false,
};

function readConsent(): Consent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return {
      decided: Boolean(parsed.decided),
      essential: true,
      marketing: Boolean(parsed.marketing),
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

function writeConsent(consent: Consent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch {
    /* localStorage unavailable; silently ignore. */
  }
}

// External-store subscription so React re-renders whenever consent changes
// in localStorage (this tab via dispatched event, other tabs via storage).
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function getSnapshot(): string {
  return JSON.stringify(readConsent());
}
function getServerSnapshot(): string {
  return JSON.stringify(DEFAULT_CONSENT);
}

export function CookieConsent() {
  const consentJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const persisted: Consent = JSON.parse(consentJson);

  // Modal draft state is only used while the dialog is open. Initialised
  // from the persisted consent each time the modal opens.
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<Consent>(persisted);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openSettings = () => {
    setDraft(persisted);
    setSettingsOpen(true);
  };

  // Focus trap for the settings dialog.
  useEffect(() => {
    if (!settingsOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const root = dialogRef.current;
    const firstFocusable = root?.querySelector<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        return;
      }
      if (e.key === "Tab" && root) {
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    };
  }, [settingsOpen]);

  const acceptAll = () => {
    writeConsent({
      decided: true,
      essential: true,
      marketing: true,
      functional: true,
      analytics: true,
    });
    setSettingsOpen(false);
  };

  const declineAll = () => {
    writeConsent({
      decided: true,
      essential: true,
      marketing: false,
      functional: false,
      analytics: false,
    });
    setSettingsOpen(false);
  };

  const toggleCategory = (cat: ConsentCategory) => {
    setDraft((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const saveSettings = () => {
    writeConsent({ ...draft, decided: true });
    setSettingsOpen(false);
  };

  return (
    <>
      {!persisted.decided ? (
        <div
          className="ol-cookie-banner"
          role="region"
          aria-label="Cookie consent"
        >
          <p className="ol-cookie-banner-text">
            Hello! We wanted to let you know that we use cookies on our website
            to see how you interact with it. By accepting, you agree to our use
            of such cookies.{" "}
            <Link href="/privacy" className="ol-cookie-banner-policy">
              Privacy Policy
            </Link>
          </p>
          <div className="ol-cookie-banner-actions">
            <button
              type="button"
              className="ol-cookie-btn ol-cookie-btn-text"
              onClick={openSettings}
            >
              Settings
            </button>
            <button
              type="button"
              className="ol-cookie-btn ol-cookie-btn-outline"
              onClick={declineAll}
            >
              Decline All
            </button>
            <button
              type="button"
              className="ol-cookie-btn ol-cookie-btn-solid"
              onClick={acceptAll}
            >
              Accept
            </button>
            <button
              type="button"
              className="ol-cookie-banner-close"
              aria-label="Close cookie banner"
              onClick={declineAll}
            >
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <div
          className="ol-cookie-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSettingsOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="ol-cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ol-cookie-modal-title"
          >
            <button
              type="button"
              className="ol-cookie-modal-close"
              aria-label="Close settings"
              onClick={() => setSettingsOpen(false)}
            >
              <X size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <h2 id="ol-cookie-modal-title" className="ol-cookie-modal-title">
              Advanced Cookie Settings
            </h2>

            <CookieRow
              label="Essential Cookies"
              description="These cookies enable core functionality such as security, verification of identity and network management. These cookies can't be disabled."
              checked
              disabled
              onChange={() => {}}
            />
            <CookieRow
              label="Enable Marketing Cookies"
              description="These cookies are used to track advertising effectiveness to provide a more relevant service and deliver better ads to suit your interests."
              checked={draft.marketing}
              onChange={() => toggleCategory("marketing")}
            />
            <CookieRow
              label="Enable Functional Cookies"
              description="These cookies collect data to remember choices users make to improve and give a more personalised experience."
              checked={draft.functional}
              onChange={() => toggleCategory("functional")}
            />
            <CookieRow
              label="Enable Analytics Cookies"
              description="These cookies help us to understand how visitors interact with our website, discover errors and provide a better overall analytics."
              checked={draft.analytics}
              onChange={() => toggleCategory("analytics")}
            />

            <div className="ol-cookie-modal-actions">
              <button
                type="button"
                className="ol-cookie-modal-save"
                onClick={saveSettings}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CookieRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <div className="ol-cookie-row">
      <div className="ol-cookie-row-text">
        <h3 className="ol-cookie-row-label">{label}</h3>
        <p className="ol-cookie-row-desc">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className="ol-cookie-toggle"
        data-checked={checked || undefined}
        data-disabled={disabled || undefined}
        disabled={disabled}
        onClick={disabled ? undefined : onChange}
      >
        <span className="ol-cookie-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
}
