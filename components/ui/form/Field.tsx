import type { ReactNode } from "react";
import { AlertIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type FieldBaseProps = {
  label: string;
  hint?: string;
  error?: string;
  /** Shows "(optional)" after the label. */
  optional?: boolean;
};

export function fieldIds(id: string) {
  return { hint: `${id}-hint`, error: `${id}-error` };
}

export function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = fieldIds(id);
  const list = [hint ? ids.hint : null, error ? ids.error : null].filter(Boolean);
  return list.length ? list.join(" ") : undefined;
}

export const controlClasses = (hasError: boolean, shape: "rounded" | "pill" = "rounded") =>
  cn(
    "w-full border bg-bg-raised-2 px-4 text-base text-fg placeholder:text-fg-subtle",
    "transition-colors duration-150 hover:border-line-strong focus:border-fg-subtle",
    "disabled:cursor-not-allowed disabled:opacity-50",
    shape === "pill" ? "min-h-13 rounded-full px-6" : "min-h-12 rounded-2xl",
    hasError ? "border-danger" : "border-line",
  );

export function FieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-small font-semibold text-fg">
      {label}
      {optional ? <span className="font-normal text-fg-subtle"> (optional)</span> : null}
    </label>
  );
}

export function FieldMessages({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  const ids = fieldIds(id);
  return (
    <>
      {hint ? (
        <p id={ids.hint} className="text-small text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={ids.error} className="flex items-center gap-1.5 text-small font-medium text-danger">
          <AlertIcon size={15} />
          {error}
        </p>
      ) : null}
    </>
  );
}

export function FieldWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}
