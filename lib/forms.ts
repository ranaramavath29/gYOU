import { z } from "zod";
import { budgetOptions, formCopy as c, industryOptions, serviceOptions } from "@/content/forms";

/**
 * Validation for every lead form (Phase 7). The honeypot field must stay empty;
 * bots that fill it are silently dropped (the visitor still sees success).
 */

const oneOf = (options: ReadonlyArray<{ value: string }>, message: string) =>
  z.string().refine((v) => options.some((o) => o.value === v), { message });

const optionalUrl = z
  .string()
  .trim()
  .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
  .refine((v) => v === "" || z.url().safeParse(v).success, { message: c.invalidUrl });

const requiredUrl = optionalUrl.refine((v) => v !== "", { message: c.required });

// 8–15 digits, optional leading + and spaces/dashes/brackets.
const phone = z
  .string()
  .trim()
  .refine(
    (v) =>
      /^\+?[\d\s()-]{8,20}$/.test(v) &&
      v.replace(/\D/g, "").length >= 8 &&
      v.replace(/\D/g, "").length <= 15,
    {
      message: c.invalidPhone,
    },
  );

export const honeypot = z.string().max(0).optional();

export const enquirySchema = z.object({
  services: z.array(oneOf(serviceOptions, c.enquiry.servicesError)).min(1, c.enquiry.servicesError),
  company: z.string().trim().min(1, c.required),
  website: optionalUrl,
  industry: oneOf(industryOptions, c.required),
  budget: oneOf(budgetOptions, c.required),
  details: z.string().trim().min(20, c.enquiry.detailsError),
  fullName: z.string().trim().min(2, c.required),
  email: z.email(c.invalidEmail),
  phone,
  consent: z.boolean().refine((v) => v, { message: c.consentRequired }),
  hp: honeypot,
});

/** Fields validated on each step before moving on. */
export const enquirySteps = [
  ["services"],
  ["company", "website", "industry", "budget", "details"],
  ["fullName", "email", "phone", "consent"],
] as const;

export const auditSchema = z.object({
  website: requiredUrl,
  email: z.email(c.invalidEmail),
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
