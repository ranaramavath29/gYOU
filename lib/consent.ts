/**
 * Consent state + Google Consent Mode v2 helpers (Phase 9).
 * Model: simple accept / reject. GTM is only loaded after "accept", so no
 * analytics or marketing tag (GA4, Meta Pixel, Google Ads) can fire before
 * consent. Consent Mode signals are still sent so Google tags behave correctly.
 */
export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "gyou-consent-v1";
export const OPEN_CONSENT_EVENT = "gyou:open-consent";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
}

/** gtag() as Google expects it: pushes the `arguments` object onto the dataLayer. */
// The parameter only types the call sites; Google's tag reads `arguments`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

export function setConsentDefault() {
  gtag("consent", "default", { ...DENIED, wait_for_update: 500 });
}

export function updateConsent(choice: ConsentChoice) {
  gtag("consent", "update", choice === "granted" ? GRANTED : DENIED);
}

let gtmLoaded = false;

/** Injects the GTM container script once. Call only after consent is granted. */
export function loadGtm() {
  if (gtmLoaded || !GTM_ID) return;
  gtmLoaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}
