/**
 * Single adapter for every lead form (docs/BUILD_PROMPT.md → Tech stack).
 * Posts JSON to NEXT_PUBLIC_LEAD_ENDPOINT. While that is unset it runs in
 * mock mode: logs the payload in development and reports success, so the
 * real success state can be reviewed. No secrets belong in client code.
 * Phase 7 adds the multi-step form, honeypot and /thank-you redirect.
 */
export type LeadPayload = {
  form: string;
  fields: Record<string, string | readonly string[] | boolean>;
  page?: string;
};

export type LeadResult = { ok: true; mock: boolean } | { ok: false; error: string };

// Defaults to the built-in email route (app/api/lead/route.ts).
const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true, mock: false } : { ok: false, error: `HTTP ${res.status}` };
  } catch {
    return { ok: false, error: "network" };
  }
}
