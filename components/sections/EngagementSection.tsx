import { Card, Reveal, Section } from "@/components/ui";
import { serviceShared } from "@/content/services/shared";
import { SectionHeader } from "./SectionHeader";

/** Engagement models (retainer, project, campaign). No prices are shown. */
export function EngagementSection({ id }: { id: string }) {
  const { heading, intro, models } = serviceShared.engagement;
  return (
    <Section aria-labelledby={id}>
      <SectionHeader id={id} heading={heading} intro={intro} />
      <Reveal>
        <ul className="grid gap-4 md:grid-cols-3">
          {models.map((model, i) => (
            <Card as="li" key={model.title} className="flex flex-col gap-8">
              <span aria-hidden className="font-display text-3xl leading-none text-ink italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-3">
                <h4 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  {model.title}
                </h4>
                <span className="text-small text-fg-muted">{model.description}</span>
              </span>
            </Card>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
