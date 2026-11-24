import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = {
  variant?: "outline" | "raised" | "accent" | "chip";
  /** Small accent dot before the label (as in the hero eyebrow). */
  dot?: boolean;
  className?: string;
  children: ReactNode;
};

const variants = {
  outline: "border border-line text-fg-subtle",
  raised: "bg-bg-raised-2 text-fg",
  accent: "bg-accent text-on-accent",
  /** Soft blue chip with an accent dot: page eyebrows (option J). */
  chip: "bg-[#e3ecfb] font-semibold text-[#1c3f80]",
} as const;

/** Non-interactive label pill: eyebrows, tags, categories. */
export function Pill({ variant = "outline", dot = false, className, children }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-small font-medium",
        variants[variant],
        className,
      )}
    >
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
      {children}
    </span>
  );
}
