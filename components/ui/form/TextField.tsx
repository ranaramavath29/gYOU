"use client";

import { useId, type ComponentPropsWithRef } from "react";
import {
  controlClasses,
  describedBy,
  FieldLabel,
  FieldMessages,
  FieldWrapper,
  type FieldBaseProps,
} from "./Field";

type TextFieldProps = FieldBaseProps &
  Omit<ComponentPropsWithRef<"input">, "children"> & {
    shape?: "rounded" | "pill";
    wrapperClassName?: string;
  };

/** Labelled text input. Works with react-hook-form's register(). */
export function TextField({
  label,
  hint,
  error,
  optional,
  shape,
  id,
  className,
  wrapperClassName,
  type = "text",
  ...input
}: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldWrapper className={wrapperClassName}>
      <FieldLabel htmlFor={fieldId} label={label} optional={optional} />
      <input
        {...input}
        id={fieldId}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, hint, error)}
        className={[controlClasses(Boolean(error), shape), className].filter(Boolean).join(" ")}
      />
      <FieldMessages id={fieldId} hint={hint} error={error} />
    </FieldWrapper>
  );
}
