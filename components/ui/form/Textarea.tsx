"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";
import {
  controlClasses,
  describedBy,
  FieldLabel,
  FieldMessages,
  FieldWrapper,
  type FieldBaseProps,
} from "./Field";

type TextareaProps = FieldBaseProps &
  Omit<ComponentPropsWithRef<"textarea">, "children"> & { wrapperClassName?: string };

/** Labelled multi-line input. Works with react-hook-form's register(). */
export function Textarea({
  label,
  hint,
  error,
  optional,
  id,
  className,
  wrapperClassName,
  rows = 5,
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldWrapper className={wrapperClassName}>
      <FieldLabel htmlFor={fieldId} label={label} optional={optional} />
      <textarea
        {...rest}
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, hint, error)}
        className={cn(controlClasses(Boolean(error)), "resize-y py-3", className)}
      />
      <FieldMessages id={fieldId} hint={hint} error={error} />
    </FieldWrapper>
  );
}
