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

/** 7. Services list: six numbered rows. */
export function ServicesList() {
  return (
    <Section aria-labelledby="services-heading">
      <SectionHeader
        id="services-heading"
        heading={servicesSection.heading}
        intro={servicesSection.intro}
        cta={servicesSection.cta}
      />
      <Reveal>
        <ul className="border-t border-line">
          {services.map((service, i) => (
            <li key={service.slug} className="border-b border-line">
              <Link
                href={serviceHref(service.slug)}
                className="group relative -mx-4 flex items-center justify-between gap-6 overflow-hidden rounded-2xl px-4 py-6 transition-colors duration-500 hover:bg-ink/[0.04] md:-mx-6 md:px-6 md:py-7"
              >
                {/* Lime bar that grows in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 h-0 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-1/2"
                />
                <span className="flex items-baseline gap-4 md:gap-6">
                  <span className="w-8 font-display text-lg text-fg-subtle italic tabular-nums transition-colors duration-300 group-hover:text-fg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-title font-semibold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {service.name}
                  </span>
                </span>
                <span className="flex items-center gap-6">
                  <span className="hidden text-small text-fg-subtle md:inline">
                    {service.highlights.join(" · ")}
                  </span>
                  <ArrowCircle />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

/** 8. Process on the paper section. */
export function Process() {
  return <ProcessSection id="process-heading" heading={process.heading} steps={process.steps} />;
}

/** 9. Selected work: staggered grid of case-study cards. Hidden until real case studies exist. */
export function SelectedWork({ items }: { items: readonly WorkCard[] }) {
  const [first, ...rest] = items;
  if (!first) return null;
  return (
    <Section aria-labelledby="work-heading">
      <SectionHeader id="work-heading" heading={selectedWork.heading} cta={selectedWork.cta} />
      <Reveal className="flex flex-col gap-12 md:gap-16">
        <WorkCardView item={first} feature />
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {rest.map((item, i) => (
            <WorkCardView
              key={item.href}
              item={item}
              className={i === 1 ? "md:mt-28" : undefined}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function WorkCardView({
  item,
  feature = false,
  className,
}: {
  item: WorkCard;
  feature?: boolean;
  className?: string;
}) {
  return (
    <article className={className}>
      <Link href={item.href} className="group flex flex-col gap-5">
        <MediaFrame
          media={item.image ? { kind: "image", ...item.image } : undefined}
          placeholder={`${item.client}: ${item.title}`}
          tint={item.tint}
          aspect={feature ? "21/9" : "4/3"}
          zoomOnHover
          sizes={feature ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        />
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h3 className="flex flex-wrap gap-x-2 font-display text-xl font-semibold">
            <PlaceholderText value={item.client} />
            <span aria-hidden>—</span>
            <PlaceholderText value={item.title} />
          </h3>
          <PlaceholderText value={item.tags} className="text-small text-fg-subtle" />
        </div>
      </Link>
    </article>
  );
}
