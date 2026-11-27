"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AlertIcon } from "@/components/icons";
import { Button, Checkbox, ChipGroup, SelectField, Textarea, TextField } from "@/components/ui";
import { budgetOptions, formCopy as c, industryOptions, serviceOptions } from "@/content/forms";
import { enquirySchema, enquirySteps, markLeadSubmitted, thankYouHref } from "@/lib/forms";
import { submitLead } from "@/lib/submitLead";
import { track } from "@/lib/track";
import { Honeypot } from "./Honeypot";

const FORM = "enquiry";
const TOTAL = enquirySteps.length;

/**
 * Main three-step enquiry form (Phase 7): services → business → contact.
 * Each step is validated before moving on; the step heading receives focus so
 * screen-reader and keyboard users know where they are. On confirmed success
 * the visitor is sent to /thank-you?form=enquiry (where the conversion fires).
 */
export function EnquiryForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [sendError, setSendError] = useState(false);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    control,
    trigger,
    subscribe,
    getFieldState,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      services: [] as string[],
      company: "",
      website: "",
      industry: "",
      budget: "",
      details: "",
      fullName: "",
      email: "",
      phone: "",
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

  // Re-check a field as soon as it changes if it is showing an error, so the
  // message clears while the visitor fixes it. Without this, the error only
  // clears on blur, the layout shifts as they click "Continue", and the click
  // misses the button.
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ name }) => {
          if (!name) return;
          const field = name.split(".")[0] as Parameters<typeof getFieldState>[0];
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
    const valid = await trigger([...enquirySteps[step]!]);
    if (!valid) return;
    const nextStep = step + 1;
    track("form_step", {
      form: FORM,
      step: nextStep + 1,
      step_name: c.enquiry.steps[nextStep] ?? "",
    });
    setStep(nextStep);
  };

  const onSubmit = handleSubmit(async (values) => {
    setSendError(false);
    const { hp, consent, ...fields } = values;
    // Bot filled the trap: pretend success, send nothing.
    if (hp) return router.push(thankYouHref(FORM));
    const result = await submitLead({ form: FORM, fields: { ...fields, consent }, page: pathname });
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
      className="relative flex flex-col gap-8"
    >
      <Honeypot registration={register("hp")} />

      {/* Progress */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-small text-fg-subtle">
          <span>{c.enquiry.progress(step + 1, TOTAL)}</span>
        </div>
        <div
          role="progressbar"
          aria-label={c.enquiry.progress(step + 1, TOTAL)}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-valuenow={step + 1}
          className="h-1.5 overflow-hidden rounded-full bg-bg-raised-2"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h4
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-title font-semibold focus:outline-none"
      >
        {c.enquiry.steps[step]}
      </h4>

      {/* Step 1: services */}
      <div hidden={step !== 0}>
        <Controller
          control={control}
          name="services"
          render={({ field, fieldState }) => (
            <ChipGroup
              legend={c.enquiry.servicesLegend}
              name={field.name}
              options={serviceOptions}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      {/* Step 2: business */}
      <div hidden={step !== 1} className="grid gap-6 md:grid-cols-2">
        <TextField
          label={c.enquiry.company}
          autoComplete="organization"
          {...register("company")}
          error={errors.company?.message}
        />
        <TextField
          label={c.enquiry.website}
          optional
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          {...register("website")}
          error={errors.website?.message}
        />
        <SelectField
          label={c.enquiry.industry}
          placeholderOption={c.enquiry.industryPlaceholder}
          options={industryOptions}
          {...register("industry")}
          error={errors.industry?.message}
        />
        <SelectField
          label={c.enquiry.budget}
          placeholderOption={c.enquiry.budgetPlaceholder}
          options={budgetOptions}
          {...register("budget")}
          error={errors.budget?.message}
        />
        <Textarea
          label={c.enquiry.details}
          hint={c.enquiry.detailsHint}
          wrapperClassName="md:col-span-2"
          {...register("details")}
          error={errors.details?.message}
        />
      </div>

      {/* Step 3: contact */}
      <div hidden={step !== 2} className="grid gap-6 md:grid-cols-2">
        <TextField
          label={c.enquiry.fullName}
          autoComplete="name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <TextField
          label={c.enquiry.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <TextField
          label={c.enquiry.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          wrapperClassName="md:col-span-2"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Checkbox
          className="md:col-span-2"
          label={
            <>
              {c.consent}{" "}
              <Link href="/privacy-policy" className="underline underline-offset-4">
                {c.privacyLink}
              </Link>
            </>
          }
          {...register("consent")}
          error={errors.consent?.message}
        />
      </div>

      {sendError ? (
        <p role="alert" className="flex items-center gap-2 text-small font-medium text-danger">
          <AlertIcon size={16} />
          {c.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 ? (
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting}>
            {c.enquiry.back}
          </Button>
        ) : null}
        {step < TOTAL - 1 ? (
          // Distinct keys so React never reuses the Continue button as the submit button
          // (otherwise the click that reaches the last step also submits it).
          <Button key="next" variant="accent" onClick={next}>
            {c.enquiry.next}
          </Button>
        ) : (
          <Button
            key="submit"
            type="submit"
            variant="accent"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? c.sending : c.enquiry.submit}
          </Button>
        )}
      </div>
    </form>
  );
}
