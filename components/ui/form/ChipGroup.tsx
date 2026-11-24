"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { describedBy, FieldMessages } from "./Field";
import type { SelectOption } from "./SelectField";

type ChipGroupProps = {
  legend: string;
  name: string;
  options: readonly SelectOption[];
  value: readonly string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  /** true: checkboxes (multi-select). false: radios (single). */
  multiple?: boolean;
  hint?: string;
  error?: string;
  className?: string;
};

/**
 * Selectable pill chips. Real checkboxes/radios inside a fieldset, so
 * keyboard and screen-reader behaviour is native. Use with react-hook-form's
 * Controller (value/onChange/onBlur).
 */
export function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
  onBlur,
  multiple = true,
  hint,
  error,
  className,
}: ChipGroupProps) {
  const id = useId();

  const toggle = (optionValue: string, checked: boolean) => {
    if (!multiple) return onChange([optionValue]);
    onChange(checked ? [...value, optionValue] : value.filter((v) => v !== optionValue));
  };

  return (
    <fieldset
      aria-describedby={describedBy(id, hint, error)}
      className={cn("flex flex-col gap-3", className)}
    >
      <legend className="mb-3 text-small font-semibold text-fg">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label key={o.value} className="cursor-pointer">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) => toggle(o.value, e.target.checked)}
                onBlur={onBlur}
                aria-invalid={error ? true : undefined}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors duration-150",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[var(--focus-ring)]",
                  checked
                    ? "border-accent bg-accent text-on-accent"
                    : cn(
                        "bg-bg-raised-2 text-fg hover:border-fg-subtle",
                        error ? "border-danger" : "border-line",
                      ),
                )}
              >
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
      <FieldMessages id={id} hint={hint} error={error} />
    </fieldset>
  );
}
