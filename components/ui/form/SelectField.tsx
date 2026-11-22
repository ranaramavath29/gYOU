"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import {
  controlClasses,
  describedBy,
  FieldLabel,
  FieldMessages,
  FieldWrapper,
  type FieldBaseProps,
} from "./Field";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = FieldBaseProps &
  Omit<ComponentPropsWithRef<"select">, "children"> & {
    options: readonly SelectOption[];
    /** Empty first option, e.g. "Select an industry". */
    placeholderOption?: string;
    wrapperClassName?: string;
  };

/** Native <select> styled as a field. Works with react-hook-form's register(). */
export function SelectField({
  label,
  hint,
  error,
  optional,
  options,
  placeholderOption,
  id,
  className,
  wrapperClassName,
  ...rest
}: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldWrapper className={wrapperClassName}>
      <FieldLabel htmlFor={fieldId} label={label} optional={optional} />
      <div className="relative">
        <select
          {...rest}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cn(
            controlClasses(Boolean(error)),
            "appearance-none pr-11 [&>option]:bg-bg-raised-2",
            className,
          )}
        >
          {placeholderOption !== undefined ? <option value="">{placeholderOption}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-fg-subtle"
        />
      </div>
      <FieldMessages id={fieldId} hint={hint} error={error} />
    </FieldWrapper>
  );
}
