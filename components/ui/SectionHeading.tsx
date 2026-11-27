import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingSize = "hero" | "split" | "section" | "title";

type SectionHeadingProps = {
  /** Section headings are H3 by default; each page sets exactly one heading to H2. */
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  /** Text before the accent word(s). */
  lead?: string;
  /** Accent word(s): plain on light, sky-blue text on ink cards. */
  accent?: string;
  /** Text after the accent word(s). */
  trail?: string;
  eyebrow?: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  id?: string;
  /** Classes for the wrapper (layout, gap). */
  className?: string;
  /** Classes for the heading itself. Put max-w-[..ch] here so ch is measured at heading size. */
  headingClassName?: string;
};

const sizeClasses: Record<HeadingSize, string> = {
  hero: "text-hero",
  // Hero headline beside the stage in the two-column homepage hero.
  split: "text-[clamp(2.75rem,1.6rem+3.9vw,5rem)] leading-[1.02] tracking-[-0.035em]",
  section: "text-h2",
  title: "text-title",
};

/**
 * Display heading with an optional highlighted accent word:
 * <SectionHeading lead="What we" accent="do best" />
 */
export function SectionHeading({
  as: Tag = "h3",
  size = "section",
  lead,
  accent,
  trail,
  eyebrow,
  description,
  align = "start",
  id,
  className,
  headingClassName,
}: SectionHeadingProps) {
  const parts: ReactNode[] = [];
  if (lead) parts.push(lead);
  if (accent)
    parts.push(
      <em key="accent" className="accent-word">
        {accent}
      </em>,
    );
  if (trail) parts.push(trail);

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow}
      <Tag
        id={id}
        className={cn(
          "font-display font-semibold text-balance",
          sizeClasses[size],
          headingClassName,
        )}
      >
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 ? " " : null}
            {part}
          </span>
        ))}
      </Tag>
      {description ? (
        <div className="max-w-[46ch] text-body text-fg-muted [.tone-paper_&]:text-ink-muted">
          {description}
        </div>
      ) : null}
    </div>
  );
}
