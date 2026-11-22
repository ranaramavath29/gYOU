import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardTone = "raised" | "paper" | "ink";

type CardProps = {
  tone?: CardTone;
  as?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
};

const tones: Record<CardTone, string> = {
  /** Dark card on the dark page: soft top sheen, lime edge-light on hover. */
  raised: cn(
    "border border-white/[0.07] bg-bg-raised bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0)_60%)] text-fg",
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]",
    "hover:border-white/[0.14] hover:shadow-[0_28px_60px_-32px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.08)]",
    "before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/70 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
  ),
  /** White card on the paper section. */
  paper: cn(
    "bg-white text-ink ring-1 ring-ink/[0.06]",
    "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.25)]",
    "hover:shadow-[0_2px_4px_rgb(0_0_0/0.04),0_30px_60px_-28px_rgb(0_0_0/0.35)]",
  ),
  /** Dark highlight card on the paper section (accent words turn lime again). */
  ink: cn(
    "bg-ink text-fg [--heading-accent:var(--accent)] [--focus-ring:var(--accent)]",
    "shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]",
  ),
};

/** Rounded content card (24px radius) with a gentle lift on hover. */
export function Card({ tone = "raised", as: Tag = "div", className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-[var(--radius-card)] p-6 md:p-8",
        "transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
