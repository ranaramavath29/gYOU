import Link from "next/link";
import { PlaceholderText } from "@/components/PlaceholderText";
import { ArrowCircle, ArrowLink, Card, MediaFrame, Reveal, Section } from "@/components/ui";
import { challenges, process, selectedWork, servicesSection, type WorkCard } from "@/content/home";
import { serviceBySlug, serviceHref, services } from "@/content/services";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeader } from "@/components/sections/SectionHeader";

/** 6. Business challenges → matching service. */
export function Challenges() {
  return (
    <Section aria-labelledby="challenges-heading">
      <SectionHeader
        id="challenges-heading"
        heading={challenges.heading}
        intro={challenges.intro}
        cta={challenges.cta}
        align="center"
      />
      <Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.items.map((item) => {
            const service = serviceBySlug(item.service);
            return (
              <Card as="li" key={item.challenge} className="flex flex-col justify-between gap-10">
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {item.challenge}
                  </h3>
                  <p className="text-small text-fg-muted">{item.description}</p>
                  <p className="text-small">
                    <span className="font-semibold">Our approach: </span>
                    <span className="text-fg-muted">{item.approach}</span>
                  </p>
                </div>
                <ArrowLink href={serviceHref(service.slug)} variant="text" className="text-ink">
                  {service.name}
                </ArrowLink>
              </Card>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}

/** 7. Services: photo cards. The image sits inside the card's padding with its own radius. */
export function ServicesList() {
  return (
    <Section aria-labelledby="services-heading">
      <SectionHeader
        id="services-heading"
        heading={servicesSection.heading}
        intro={servicesSection.intro}
        cta={servicesSection.cta}
        align="center"
      />
      <Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {services.map((service, i) => {
            const image = servicesSection.media[service.slug];
            return (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group flex h-full flex-col rounded-[28px] border border-line bg-bg-raised p-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.16)] transition-[border-color,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_2px_4px_rgb(0_0_0/0.04),0_30px_60px_-28px_rgb(0_0_0/0.22)]"
                >
                  <MediaFrame
                    media={image}
                    placeholder={image.alt}
                    aspect="16/10"
                    flat
                    zoomOnHover
                    sizes="(min-width: 1320px) 620px, (min-width: 640px) 50vw, 100vw"
                    className="[--radius-media:20px]"
                  />
                  <span className="flex flex-1 flex-col gap-6 px-4 pt-6 pb-4 md:px-6 md:pb-6">
                    <span className="flex items-start justify-between gap-4">
                      <span className="flex flex-col gap-2">
                        <span className="text-small font-semibold text-accent tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-title font-semibold">
                          {service.name}
                        </span>
                      </span>
                      <ArrowCircle />
                    </span>
                    <span className="text-small text-fg-muted">{service.summary}</span>
                    <span className="mt-auto flex flex-wrap gap-2">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-paper px-3 py-1 text-small text-ink-muted"
                        >
                          {h}
                        </span>
                      ))}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}

/** 8. Process on the paper section. */
export function Process() {
  return <ProcessSection id="process-heading" heading={process.heading} steps={process.steps} />;
}

/** Card colours for selected work, cycled in order. */
const workTones = [
  "bg-accent text-on-accent tone-ink",
  "bg-sage text-on-accent tone-ink",
  "bg-[#f1dcc4] text-[#3a2d22]",
] as const;

/** 9. Selected work: colour cards with the cover image. Hidden until real case studies exist. */
export function SelectedWork({ items }: { items: readonly WorkCard[] }) {
  if (items.length === 0) return null;
  return (
    <Section aria-labelledby="work-heading">
      <SectionHeader
        id="work-heading"
        heading={selectedWork.heading}
        cta={selectedWork.cta}
        align="center"
      />
      <Reveal>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.href}>
              <WorkCardView item={item} tone={workTones[i % workTones.length]!} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function WorkCardView({ item, tone }: { item: WorkCard; tone: string }) {
  return (
    <article className={`h-full overflow-hidden rounded-[var(--radius-media)] ${tone}`}>
      <Link href={item.href} className="group flex h-full flex-col gap-6 p-3 pb-6">
        <MediaFrame
          media={item.image ? { kind: "image", ...item.image } : undefined}
          placeholder={`${item.client}: ${item.title}`}
          tint={item.tint}
          aspect="4/3"
          zoomOnHover
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="flex flex-col gap-2 px-3">
          <PlaceholderText value={item.tags} className="text-small opacity-80" />
          <h3 className="flex flex-wrap gap-x-2 font-display text-xl font-semibold">
            <PlaceholderText value={item.client} />
            <span aria-hidden>—</span>
            <PlaceholderText value={item.title} />
          </h3>
        </div>
      </Link>
    </article>
  );
}
