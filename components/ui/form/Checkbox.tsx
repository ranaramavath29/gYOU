"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { describedBy, FieldMessages } from "./Field";

type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type" | "children"> & {
  label: ReactNode;
  error?: string;
};

/** Labelled checkbox (e.g. consent). Works with react-hook-form's register(). */
export function Checkbox({ label, error, id, className, ...input }: CheckboxProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="flex cursor-pointer items-start gap-3 text-small text-fg-muted"
      >
        <input
          {...input}
          id={fieldId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, undefined, error)}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--accent)]"
        />
        <span>{label}</span>
      </label>
      <div className="mt-2">
        <FieldMessages id={fieldId} error={error} />
      </div>
    </div>
  );
}
