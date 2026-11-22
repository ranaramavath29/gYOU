import { Card, Reveal, Section } from "@/components/ui";
import type { Heading } from "@/content/home";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./SectionHeader";

export type ProcessStep = { title: string; description: string };

type ProcessSectionProps = {
  id: string;
  heading: Heading;
  steps: readonly ProcessStep[];
};

/** Four-step process on the paper section, italic serif numerals; last card in ink. */
export function ProcessSection({ id, heading, steps }: ProcessSectionProps) {
  return (
    <Section tone="paper" aria-labelledby={id}>
      <SectionHeader id={id} heading={heading} />
      <Reveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <Card
                as="li"
                key={step.title}
                tone={last ? "ink" : "paper"}
                className="flex min-h-64 flex-col justify-between gap-10"
              >
                {/* Number + hairline that runs toward the next step. */}
                <span aria-hidden className="flex items-center gap-4">
                  <span className="font-display text-[3.25rem] leading-none text-[var(--heading-accent)] italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "h-px flex-1 bg-gradient-to-r to-transparent",
                      last ? "from-accent/60" : "from-ink/20",
                    )}
                  />
                </span>
                <span className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <span className={cn("text-small", last ? "text-fg-muted" : "text-ink-muted")}>
                    {step.description}
                  </span>
                </span>
              </Card>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
