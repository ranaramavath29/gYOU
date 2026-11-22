"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ChipGroup, SelectField, Textarea, TextField } from "@/components/ui";

// Demo-only options. Real form options come from /content in Phase 7.
const chipOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
  { value: "d", label: "Option D" },
] as const;

const selectOptions = [
  { value: "one", label: "First choice" },
  { value: "two", label: "Second choice" },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters."),
  email: z.email("Enter a valid email address."),
  choice: z.string().min(1, "Choose an option."),
  chips: z.array(z.string()).min(1, "Pick at least one option."),
  details: z.string().trim().min(10, "Add a few more words (10+ characters)."),
});

/** Live react-hook-form + zod demo: submit empty to see every error state. */
export function FormDemo() {
  const [sent, setSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", choice: "", chips: [], details: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await new Promise((r) => setTimeout(r, 600));
        setSent(true);
      })}
      className="grid gap-6 md:grid-cols-2"
    >
      <TextField
        label="Full name"
        autoComplete="off"
        {...register("name")}
        error={errors.name?.message}
      />
      <TextField
        label="Email"
        type="email"
        autoComplete="off"
        {...register("email")}
        error={errors.email?.message}
      />
      <SelectField
        label="Select"
        placeholderOption="Choose one"
        options={selectOptions}
        {...register("choice")}
        error={errors.choice?.message}
      />
      <Controller
        control={control}
        name="chips"
        render={({ field, fieldState }) => (
          <ChipGroup
            legend="Chips (multi-select)"
            name={field.name}
            options={chipOptions}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <Textarea
        label="Details"
        wrapperClassName="md:col-span-2"
        {...register("details")}
        error={errors.details?.message}
      />
      <div className="flex items-center gap-4 md:col-span-2">
        <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Submit demo"}
        </Button>
        <p role="status" className="text-small text-fg-muted">
          {sent ? "Demo submitted. Nothing was sent anywhere." : ""}
        </p>
      </div>
    </form>
  );
}
