import type { ReactNode } from "react";
import { ArrowLink, Reveal, SectionHeading } from "@/components/ui";
import type { Cta, Heading } from "@/content/home";

type SectionHeaderProps = {
  id: string;
  heading: Heading;
  intro?: ReactNode;
  cta?: Cta;
  /** "split": heading left, intro/link right. "center": stacked and centred (Studio Daylight). */
  align?: "split" | "center";
};

/** Section heading with an optional intro and link. */
export function SectionHeader({ id, heading, intro, cta, align = "split" }: SectionHeaderProps) {
  if (align === "center") {
    return (
      <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-16">
        <SectionHeading id={id} {...heading} align="center" headingClassName="max-w-[20ch]" />
        {intro ? (
          <p className="max-w-[56ch] text-body text-fg-muted [.tone-paper_&]:text-ink-muted">
            {intro}
          </p>
        ) : null}
        {cta ? (
          <ArrowLink href={cta.href} variant="text">
            {cta.label}
          </ArrowLink>
        ) : null}
      </Reveal>
    );
  }

  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <SectionHeading id={id} {...heading} headingClassName="max-w-[18ch]" />
      {intro || cta ? (
        <div className="flex flex-col items-start gap-4 md:max-w-[34ch] md:items-end md:text-right">
          {intro ? (
            <p className="text-small text-fg-muted [.tone-paper_&]:text-ink-muted">{intro}</p>
          ) : null}
          {cta ? (
            <ArrowLink href={cta.href} variant="text">
              {cta.label}
            </ArrowLink>
          ) : null}
        </div>
      ) : null}
    </Reveal>
  );
}
