import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Circular arrow button visual. Reacts to hover on a parent with the `group` class. */
export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-200",
        "group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent",
        "[.tone-paper_&]:border-ink/25 [.tone-paper_&]:group-hover:border-ink [.tone-paper_&]:group-hover:bg-ink [.tone-paper_&]:group-hover:text-paper",
        className,
      )}
    >
      <ArrowUpRightIcon
        size={16}
        className="transition-transform duration-200 group-hover:rotate-45"
      />
    </span>
  );
}

type ArrowLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
  /** "circle": label + round arrow button. "text": underlined label with a small arrow. */
  variant?: "circle" | "text";
  children: ReactNode;
};

export function ArrowLink({ variant = "circle", className, children, ...rest }: ArrowLinkProps) {
  if (variant === "text") {
    return (
      <Link
        {...rest}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 text-small font-semibold underline decoration-1 underline-offset-4 hover:decoration-2",
          className,
        )}
      >
        {children}
        <ArrowUpRightIcon size={14} />
      </Link>
    );
  }
  return (
    <Link {...rest} className={cn("group inline-flex items-center gap-4 font-semibold", className)}>
      <span>{children}</span>
      <ArrowCircle />
    </Link>
  );
}
