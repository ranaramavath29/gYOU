import * as z from "zod/mini";
import { budgetOptions, formCopy as c, industryOptions, serviceOptions } from "@/content/forms";

/**
 * Validation for every lead form (Phase 7). The honeypot field must stay empty;
 * bots that fill it are silently dropped (the visitor still sees success).
 *
 * Uses zod/mini (same rules and messages as full zod, a fraction of the
 * client bundle): checks run in order, so z.trim() always comes first.
 */

const oneOf = (options: ReadonlyArray<{ value: string }>, message: string) =>
  z.string().check(z.refine((v) => options.some((o) => o.value === v), { message }));

const trimmed = (min: number, message: string) =>
  z.string().check(z.trim(), z.minLength(min, message));

/**
 * A real website address: http(s), no spaces, and a host with a dot and an
 * extension (example.com, sub.example.co.in, xn-- IDNs). Checked explicitly
 * because browsers' URL parsers accept junk such as "https://not a url".
 */
export function isWebsite(value: string) {
  if (/\s/.test(value)) return false;
  try {
    const { protocol, hostname } = new URL(value);
    return (
      (protocol === "https:" || protocol === "http:") &&
      /^([a-z0-9-]+\.)+([a-z]{2,}|xn--[a-z0-9-]+)$/i.test(hostname)
    );
  } catch {
    return false;
  }
}

const optionalUrl = z
  .pipe(
    z.string().check(z.trim()),
    z.transform<string, string>((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v)),
  )
  .check(z.refine((v) => v === "" || isWebsite(v), { message: c.invalidUrl }));

const requiredUrl = optionalUrl.check(z.refine((v) => v !== "", { message: c.required }));

// 8–15 digits, optional leading + and spaces/dashes/brackets.
const phone = z.string().check(
  z.trim(),
  z.refine(
    (v) =>
      /^\+?[\d\s()-]{8,20}$/.test(v) &&
      v.replace(/\D/g, "").length >= 8 &&
      v.replace(/\D/g, "").length <= 15,
    { message: c.invalidPhone },
  ),
);

const consent = z.boolean().check(z.refine((v) => v, { message: c.consentRequired }));

export const honeypot = z.optional(z.string().check(z.maxLength(0)));

export const enquirySchema = z.object({
  services: z
    .array(oneOf(serviceOptions, c.enquiry.servicesError))
    .check(z.minLength(1, c.enquiry.servicesError)),
  company: trimmed(1, c.required),
  website: optionalUrl,
  industry: oneOf(industryOptions, c.required),
  budget: oneOf(budgetOptions, c.required),
  details: trimmed(20, c.enquiry.detailsError),
  fullName: trimmed(2, c.required),
  email: z.email(c.invalidEmail),
  phone,
  consent,
  hp: honeypot,
});

/** Fields validated on each step before moving on. */
export const enquirySteps = [
  ["services"],
  ["company", "website", "industry", "budget", "details"],
  ["fullName", "email", "phone", "consent"],
] as const;

export const heroAuditSchema = z.object({
  need: oneOf(c.heroAudit.needs, c.heroAudit.needError),
  budget: oneOf(budgetOptions, c.required),
  company: trimmed(1, c.required),
  website: optionalUrl,
  industry: oneOf(industryOptions, c.required),
  fullName: trimmed(2, c.required),
  phone,
  email: z.email(c.invalidEmail),
  consent,
  hp: honeypot,
});

/** Fields validated on each hero audit step before moving on. */
export const heroAuditSteps = [
  ["need", "budget"],
  ["company", "website", "industry"],
  ["fullName", "phone", "email", "consent"],
] as const;

export const auditSchema = z.object({
  website: requiredUrl,
  email: z.email(c.invalidEmail),
  hp: honeypot,
});

export const callbackSchema = z.object({
  fullName: trimmed(2, c.required),
  email: z.email(c.invalidEmail),
  phone,
  service: oneOf(serviceOptions, c.required),
  consent,
  hp: honeypot,
});

export const consultationSchema = z.object({
  email: z.email(c.invalidEmail),
  hp: honeypot,
});

/** Marks a confirmed submission so /thank-you fires the conversion event once. */
export const LEAD_FLAG_KEY = "gyou:lead-submitted";

export function markLeadSubmitted(form: string) {
  try {
    sessionStorage.setItem(LEAD_FLAG_KEY, form);
  } catch {
    // Storage unavailable (private mode): the thank-you page simply won't track.
  }
}

export const thankYouHref = (form: string) => `/thank-you?form=${encodeURIComponent(form)}`;
