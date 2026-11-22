import type { ReactNode } from "react";
import { ArrowLink, Reveal, SectionHeading } from "@/components/ui";
import type { Cta, Heading } from "@/content/home";

type SectionHeaderProps = {
  id: string;
  heading: Heading;
  intro?: ReactNode;
  cta?: Cta;
};

/** Heading on the left, intro or link on the right (as in the mockup). */
export function SectionHeader({ id, heading, intro, cta }: SectionHeaderProps) {
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
