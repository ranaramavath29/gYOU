"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertIcon } from "@/components/icons";
import { Button, TextField } from "@/components/ui";
import { formCopy as c } from "@/content/forms";
import { auditSchema, markLeadSubmitted, thankYouHref } from "@/lib/forms";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/track";
import { Honeypot } from "./Honeypot";

const FORM = "audit";

/** Quick website / marketing audit request: website URL + email. */
export function AuditForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [sendError, setSendError] = useState(false);
  const started = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(auditSchema),
    mode: "onTouched",
    defaultValues: { website: "", email: "", hp: "" },
  });

  const onSubmit = handleSubmit(async ({ hp, ...fields }) => {
    setSendError(false);
    if (hp) return router.push(thankYouHref(FORM));
    const result = await submitLead({ form: FORM, fields, page: pathname });
    if (!result.ok) return setSendError(true);
    markLeadSubmitted(FORM);
    router.push(thankYouHref(FORM));
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("form_start", { form: FORM });
        }
      }}
      className="relative grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-start"
    >
      <Honeypot registration={register("hp")} />
      <TextField
        label={c.audit.website}
        type="url"
        inputMode="url"
        autoComplete="url"
        placeholder="https://"
        {...register("website")}
        error={errors.website?.message}
      />
      <TextField
        label={c.audit.email}
        type="email"
        inputMode="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Button type="submit" variant="accent" disabled={isSubmitting} className="sm:mt-7">
        {isSubmitting ? c.sending : c.audit.submit}
      </Button>
      {sendError ? (
        <p
          role="alert"
          className="flex items-center gap-2 text-small font-medium text-danger sm:col-span-3"
        >
          <AlertIcon size={16} />
          {c.error}
        </p>
      ) : null}
    </form>
  );
}
