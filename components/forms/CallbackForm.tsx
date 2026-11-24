"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertIcon } from "@/components/icons";
import { Button, Checkbox, SelectField, TextField } from "@/components/ui";
import { formCopy as c, serviceOptions } from "@/content/forms";
import { callbackSchema, markLeadSubmitted, thankYouHref } from "@/lib/forms";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/track";
import { Honeypot } from "./Honeypot";

const FORM = "callback";

/**
 * Quick callback bar under the homepage hero: name, email, phone and the
 * service needed, plus the same consent as the main enquiry form.
 */
export function CallbackForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [sendError, setSendError] = useState(false);
  const started = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(callbackSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "", service: "", consent: false, hp: "" },
  });

  const onSubmit = handleSubmit(async ({ hp, consent, ...fields }) => {
    setSendError(false);
    if (hp) return router.push(thankYouHref(FORM));
    const result = await submitLead({ form: FORM, fields: { ...fields, consent }, page: pathname });
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
      className="relative flex flex-col gap-5"
    >
      <Honeypot registration={register("hp")} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
        <TextField
          label={c.callback.fullName}
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label={c.callback.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <TextField
          label={c.callback.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <SelectField
          label={c.callback.service}
          options={serviceOptions}
          placeholderOption={c.callback.servicePlaceholder}
          {...register("service")}
          error={errors.service?.message}
        />
        <Button type="submit" variant="solid" disabled={isSubmitting} className="lg:mb-0.5">
          {isSubmitting ? c.sending : c.callback.submit}
        </Button>
      </div>
      <Checkbox
        label={
          <>
            {c.consent}{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
          </>
        }
        {...register("consent")}
        error={errors.consent?.message}
      />
      {sendError ? (
        <p role="alert" className="flex items-center gap-1.5 text-small text-danger">
          <AlertIcon size={15} />
          {c.error}
        </p>
      ) : null}
    </form>
  );
}
