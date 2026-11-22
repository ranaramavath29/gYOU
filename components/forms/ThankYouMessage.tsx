"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { thankYouCopy } from "@/content/forms";
import { LEAD_FLAG_KEY } from "@/lib/forms";
import { track } from "@/lib/track";

/**
 * Reads ?form= for the message. Fires form_submit_success (and
 * consultation_request for consultation forms) only when the form set the
 * session flag after a confirmed submission, and only once: reloading or
 * visiting /thank-you directly does not count as a lead.
 */
export function ThankYouMessage() {
  const form = useSearchParams().get("form") ?? "";

  useEffect(() => {
    let flagged: string | null = null;
    try {
      flagged = sessionStorage.getItem(LEAD_FLAG_KEY);
      sessionStorage.removeItem(LEAD_FLAG_KEY);
    } catch {
      return;
    }
    if (!flagged || flagged !== form) return;
    track("form_submit_success", { form });
    if (form === "consultation" || form === "enquiry") track("consultation_request", { form });
  }, [form]);

  return (
    <p className="max-w-[46ch] text-body text-fg-muted">
      {thankYouCopy.byForm[form] ?? thankYouCopy.default}
    </p>
  );
}
