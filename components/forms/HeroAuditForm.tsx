"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AlertIcon, LockIcon, CheckIcon } from "@/components/icons";
import { Button, Checkbox, SelectField, TextField } from "@/components/ui";
import { describedBy, FieldMessages } from "@/components/ui/form/Field";
import { budgetOptions, formCopy, industryOptions } from "@/content/forms";
import { heroAuditSchema, heroAuditSteps, markLeadSubmitted, thankYouHref } from "@/lib/forms";
import { cn } from "@/lib/cn";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/track";
import { Honeypot } from "./Honeypot";

const FORM = "marketing-audit";
const TOTAL = heroAuditSteps.length;
const c = formCopy.heroAudit;

/**
 * Homepage hero card: three-step free marketing audit request.
 * Step 1 need + budget → step 2 business → step 3 contact. Each step is
 * validated before moving on; the step heading takes focus so keyboard and
 * screen-reader users know where they are. Confirmed success → /thank-you.
 */
export function HeroAuditForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [sendError, setSendError] = useState(false);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const needId = useId();

  const {
    register,
    control,
    trigger,
    subscribe,
    getFieldState,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(heroAuditSchema),
    mode: "onTouched",
    defaultValues: {
      need: "",
      budget: "",
      company: "",
      website: "",
      industry: "",
      fullName: "",
      phone: "",
      email: "",
      consent: false,
      hp: "",
    },
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  // Clear an error as soon as the field is fixed (not only on blur).
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ name }) => {
          if (!name) return;
          const field = name as Parameters<typeof getFieldState>[0];
          if (getFieldState(field).error) void trigger(field);
        },
      }),
    [subscribe, trigger, getFieldState],
  );

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: FORM });
  };

  const next = async () => {
    const valid = await trigger([...heroAuditSteps[step]!]);
    if (!valid) return;
    const nextStep = step + 1;
    track("form_step", { form: FORM, step: nextStep + 1, step_name: c.steps[nextStep] ?? "" });
    setStep(nextStep);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSendError(false);
    const { hp, ...fields } = values;
    if (hp) return router.push(thankYouHref(FORM));
    const result = await submitLead({ form: FORM, fields, page: pathname });
    if (!result.ok) return setSendError(true);
    markLeadSubmitted(FORM);
    router.push(thankYouHref(FORM));
  });

  const progress = ((step + 1) / TOTAL) * 100;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocusCapture={markStarted}
      className="relative flex flex-col gap-6"
    >
      <Honeypot registration={register("hp")} />

      {/* Progress */}
      <div className="flex flex-col gap-2.5">
        <div
          role="progressbar"
          aria-label={c.progress(step + 1, TOTAL)}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step + 1}
          className="h-1.5 overflow-hidden rounded-full bg-paper"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#7fa5ec] transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-small font-semibold text-fg-subtle">{c.progress(step + 1, TOTAL)}</p>
      </div>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="-mb-1 font-display text-[1.25rem] leading-tight font-semibold tracking-[-0.02em] focus:outline-none"
      >
        {c.steps[step]}
      </h3>

      {/* Step 1: need + budget */}
      <div hidden={step !== 0} className="flex flex-col gap-5">
        <Controller
          control={control}
          name="need"
          render={({ field, fieldState }) => (
            <fieldset
              aria-describedby={describedBy(needId, undefined, fieldState.error?.message)}
              className="flex flex-col gap-2"
            >
              <legend className="sr-only">{c.needLegend}</legend>
              <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                {c.needs.map((o, i) => {
                  const checked = field.value === o.value;
                  // An odd last option spans the full row instead of leaving a gap.
                  const spanLast = i === c.needs.length - 1 && c.needs.length % 2 === 1;
                  return (
                    <label
                      key={o.value}
                      className={cn("cursor-pointer", spanLast && "min-[420px]:col-span-2")}
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={o.value}
                        checked={checked}
                        onChange={() => field.onChange(o.value)}
                        onBlur={field.onBlur}
                        className="peer sr-only"
                      />
                      <span
                        className={cn(
                          "flex min-h-13 items-center gap-3 rounded-2xl border px-4 text-[0.9375rem] font-semibold text-fg transition-colors duration-150",
                          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--focus-ring)]",
                          checked
                            ? "border-accent bg-[#eef3fd]"
                            : fieldState.error
                              ? "border-danger"
                              : "border-line hover:border-line-strong",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border-2",
                            checked ? "border-accent" : "border-line-strong",
                          )}
                        >
                          {checked ? <span className="size-2.5 rounded-full bg-accent" /> : null}
                        </span>
                        {o.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              <FieldMessages id={needId} error={fieldState.error?.message} />
            </fieldset>
          )}
        />
        <SelectField
          label={c.budget}
          placeholderOption={c.budgetPlaceholder}
          options={budgetOptions}
          {...register("budget")}
          error={errors.budget?.message}
        />
      </div>

      {/* Step 2: business */}
      <div hidden={step !== 1} className="flex flex-col gap-4">
        <TextField
          label={c.company}
          autoComplete="organization"
          {...register("company")}
          error={errors.company?.message}
        />
        <TextField
          label={c.website}
          optional
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder={c.websitePlaceholder}
          {...register("website")}
          error={errors.website?.message}
        />
        <SelectField
          label={c.industry}
          placeholderOption={c.industryPlaceholder}
          options={industryOptions}
          {...register("industry")}
          error={errors.industry?.message}
        />
      </div>

      {/* Step 3: contact */}
      <div hidden={step !== 2} className="flex flex-col gap-4">
        <TextField
          label={c.fullName}
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label={c.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <TextField
          label={c.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Checkbox
          label={
            <>
              {c.consent}{" "}
              <Link href="/privacy-policy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </>
          }
          {...register("consent")}
          error={errors.consent?.message}
        />
      </div>

      {sendError ? (
        <p role="alert" className="flex items-center gap-2 text-small font-medium text-danger">
          <AlertIcon size={16} />
          {formCopy.error}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        {step > 0 ? (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep(step - 1)}
            disabled={isSubmitting}
            className="px-5"
          >
            ← {c.back}
          </Button>
        ) : null}
        {step < TOTAL - 1 ? (
          // Distinct keys so React never reuses the Continue button as the submit button.
          <Button key="next" variant="accent" size="lg" onClick={next} className="flex-1">
            {c.next} →
          </Button>
        ) : (
          <Button
            key="submit"
            type="submit"
            variant="accent"
            size="lg"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? formCopy.sending : `${c.submit} →`}
          </Button>
        )}
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-small text-fg-subtle">
        {c.trust.map((t, i) => (
          <li key={t} className="flex items-center gap-1.5">
            {i === 0 ? <LockIcon size={14} /> : <CheckIcon size={14} />}
            {t}
          </li>
        ))}
      </ul>
    </form>
  );
}
