"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Honeypot } from "@/components/forms/Honeypot";
import { AlertIcon } from "@/components/icons";
import { finalCta } from "@/content/home";
import { cn } from "@/lib/cn";
import { consultationSchema, markLeadSubmitted, thankYouHref } from "@/lib/forms";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/track";

const FORM = "consultation";

/**
 * Quick free-consultation form: a single pill email field used in every
 * closing CTA. `source` records where it was submitted from. On confirmed
 * success the visitor goes to /thank-you?form=consultation.
 */
export function EmailCapture({ form: source, page }: { form: string; page: string }) {
  const id = useId();
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const started = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(consultationSchema), defaultValues: { email: "", hp: "" } });

  const onSubmit = handleSubmit(async ({ email, hp }) => {
    setFailed(false);
    if (hp) return router.push(thankYouHref(FORM));
    const result = await submitLead({ form: FORM, fields: { email, source }, page });
    if (!result.ok) return setFailed(true);
    markLeadSubmitted(FORM);
    router.push(thankYouHref(FORM));
  });

  const errorId = `${id}-error`;
  const error = errors.email?.message;

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
      className="relative mx-auto flex w-full max-w-xl flex-col gap-3"
    >
      <Honeypot registration={register("hp")} />
      <label htmlFor={id} className="sr-only">
        {finalCta.emailLabel}
      </label>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-[28px] border bg-bg-raised-2 p-2 sm:flex-row sm:rounded-full",
          error ? "border-danger" : "border-line focus-within:border-fg-subtle",
        )}
      >
        <input
          id={id}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={finalCta.emailLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...register("email")}
          className="min-h-12 flex-1 rounded-full bg-transparent px-5 text-base text-fg placeholder:text-fg-subtle focus-visible:outline-offset-0"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-ink transition-colors hover:bg-[#c9f249] disabled:opacity-60"
        >
          {isSubmitting ? finalCta.sendingLabel : finalCta.submitLabel}
        </button>
      </div>
      {error ? (
        <p
          id={errorId}
          className="flex items-center justify-center gap-1.5 text-small font-medium text-danger"
        >
          <AlertIcon size={15} />
          {error}
        </p>
      ) : null}
      {failed ? (
        <p role="alert" className="text-center text-small text-danger">
          {finalCta.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
