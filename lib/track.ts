/**
 * Typed dataLayer events (docs/BUILD_PROMPT.md → Phase 9). GTM reads these;
 * GA4, Meta Pixel and Google Ads tags are configured inside GTM.
 * Nothing is sent anywhere unless the visitor accepts cookies, because GTM
 * itself only loads after consent (components/analytics/Analytics.tsx).
 */
type EventMap = {
  cta_click: { label: string; location: string };
  whatsapp_click: { location: string };
  phone_click: { location: string };
  email_click: { location: string };
  form_start: { form: string };
  form_step: { form: string; step: number; step_name: string };
  /** Fires only on the /thank-you page after a confirmed submission. */
  form_submit_success: { form: string };
  consultation_request: { form: string };
  service_page_view: { service: string };
  case_study_view: { case_study: string };
};

export type TrackEvent = keyof EventMap;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track<E extends TrackEvent>(event: E, params: EventMap[E]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
