"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { consentCopy as copy } from "@/content/consent";
import {
  GTM_ID,
  loadGtm,
  OPEN_CONSENT_EVENT,
  readConsent,
  setConsentDefault,
  storeConsent,
  updateConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { ClickTracker } from "./ClickTracker";

/**
 * Consent banner + GTM loader. Renders nothing when NEXT_PUBLIC_GTM_ID is not
 * set (no tags, so nothing to consent to). With an ID:
 * - Consent Mode v2 default = denied
 * - banner until the visitor chooses; the choice is remembered
 * - GTM loads only after "Accept"; "Reject" after accepting reloads the page
 *   so the already-loaded tags are removed
 */
export function Analytics() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GTM_ID) return;
    setConsentDefault();
    const stored = readConsent();
    if (stored === "granted") {
      updateConsent("granted");
      loadGtm();
    }
    // Defer the state update so it doesn't run synchronously inside the effect.
    const id = window.setTimeout(() => setOpen(stored === null), 0);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  if (!GTM_ID) return <ClickTracker />;

  const choose = (choice: ConsentChoice) => {
    const previous = readConsent();
    storeConsent(choice);
    updateConsent(choice);
    setOpen(false);
    if (choice === "granted") loadGtm();
    else if (previous === "granted") window.location.reload();
  };

  return (
    <>
      <ClickTracker />
      {open ? (
        <section
          role="region"
          aria-label={copy.label}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[var(--radius-card)] border border-line bg-bg-raised p-5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.16)] md:inset-x-6 md:bottom-6 md:p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p className="text-small text-fg-muted">
              <strong className="text-fg">{copy.heading}. </strong>
              {copy.body}{" "}
              <Link href="/cookie-policy" className="underline underline-offset-4">
                {copy.policyLink}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              {/* Equal prominence for both choices. */}
              <button
                type="button"
                onClick={() => choose("denied")}
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-sm font-semibold hover:border-fg-subtle"
              >
                {copy.reject}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="inline-flex min-h-11 items-center rounded-full bg-fg px-5 text-sm font-semibold text-bg hover:bg-fg-muted"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Footer link that reopens the banner (only shown when analytics is configured). */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GTM_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {copy.settings}
    </button>
  );
}
