import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingSize = "hero" | "section" | "title";

type SectionHeadingProps = {
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  /** Text before the accent word(s). */
  lead?: string;
  /** Italic serif accent word(s). Lime on dark, ink on paper. */
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
  section: "text-h2",
  title: "text-title",
};

/**
 * Serif heading with an optional italic accent word:
 * <SectionHeading lead="What we" accent="do best" />
 */
export function SectionHeading({
  as: Tag = "h2",
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
