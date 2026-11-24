import { Reveal, Section } from "@/components/ui";
import type { Heading } from "@/content/home";
import { uiLabels } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./SectionHeader";

export type ProcessStep = { title: string; description: string };

type ProcessSectionProps = {
  id: string;
  heading: Heading;
  steps: readonly ProcessStep[];
};

/**
 * Process stepper on the paper section. Desktop: numbered nodes on one
 * horizontal track with white step cards below. Mobile: a vertical timeline.
 * The final step is highlighted in the accent blue (the outcome).
 */
export function ProcessSection({ id, heading, steps }: ProcessSectionProps) {
  return (
    <Section tone="paper" aria-labelledby={id}>
      <SectionHeader id={id} heading={heading} />
      <Reveal>
        <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
          {/* Track: horizontal on desktop, vertical on mobile. */}
          <span
            aria-hidden
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 rounded-full bg-gradient-to-r from-ink/15 via-ink/25 to-accent lg:block"
          />
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-7 w-0.5 rounded-full bg-gradient-to-b from-ink/15 via-ink/25 to-accent lg:hidden"
          />
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={step.title}
                className="group relative grid grid-cols-[3.5rem_1fr] gap-5 lg:flex lg:flex-col lg:items-center lg:gap-6"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 grid size-14 place-items-center rounded-full font-display text-lg font-semibold tabular-nums transition-[background-color,color,box-shadow,scale] duration-300 group-hover:scale-105",
                    last
                      ? "bg-accent text-on-accent shadow-[0_0_0_8px_rgb(31_95_209/0.12)]"
                      : "bg-bg-raised text-ink shadow-[0_0_0_8px_var(--paper)] ring-1 ring-ink/10 group-hover:bg-ink group-hover:text-bg",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "flex h-full flex-col gap-3 rounded-[24px] border p-6 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 lg:w-full lg:text-center",
                    last
                      ? "border-ink bg-ink text-bg shadow-[0_30px_60px_-30px_rgb(29_27_24/0.6)]"
                      : "border-line bg-bg-raised shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_36px_-24px_rgb(29_27_24/0.25)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
                      last ? "text-sky" : "text-accent",
                    )}
                  >
                    {uiLabels.processStep} {i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className={cn("text-small", last ? "text-[#d9d2c5]" : "text-ink-muted")}>
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}
