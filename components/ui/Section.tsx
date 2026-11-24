import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "default" | "paper";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  /** "none" removes vertical padding (e.g. for full-bleed bands). */
  spacing?: "default" | "none";
  /** Wrap children in a Container. Default true. */
  contained?: boolean;
};

const tones: Record<SectionTone, string> = {
  default: "bg-bg text-fg",
  // Warm paper section with 40px top corners.
  paper: "tone-paper bg-paper text-ink rounded-t-[var(--radius-sheet)]",
};

/** Page section: 120–140px vertical padding on desktop, 72–88px on mobile. */
export function Section({
  tone = "default",
  spacing = "default",
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={cn(
        tones[tone],
        spacing === "default" && "py-[clamp(4.5rem,2.9rem+5vw,8.5rem)]",
        className,
      )}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
