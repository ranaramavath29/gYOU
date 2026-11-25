import Link from "next/link";
import { ArrowUpRightIcon, AsteriskIcon } from "@/components/icons";
import { ArrowCircle, Button, Reveal, Section } from "@/components/ui";
import { spotlight } from "@/content/home";
import { serviceBySlug, serviceHref } from "@/content/services";
import { SectionHeader } from "./SectionHeader";

/** Marketing + website spotlight: gYOU's two lead offers side by side (marketing first). */
export function Spotlight({ id }: { id: string }) {
  const { website, marketing } = spotlight;
  return (
    <Section aria-labelledby={id}>
      <SectionHeader id={id} heading={spotlight.heading} intro={spotlight.intro} />
      {/* grid-cols-1 (minmax(0,1fr)) lets the cards shrink on very small phones. */}
      <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Marketing: raised card listing the marketing services */}
        <article className="flex min-w-0 flex-col justify-between gap-10 rounded-[var(--radius-media)] border border-line bg-bg-raised p-7 md:p-10">
          <div className="flex flex-col gap-5">
            <span className="text-small font-semibold tracking-[0.12em] text-fg-muted uppercase">
              {marketing.label}
            </span>
            <h3 className="font-display text-title font-semibold">{marketing.title}</h3>
            <p className="max-w-[44ch] text-fg-muted">{marketing.description}</p>
            <ul className="mt-2 border-t border-line">
              {marketing.services.map((slug) => {
                const service = serviceBySlug(slug);
                return (
                  <li key={slug} className="border-b border-line">
                    <Link
                      href={serviceHref(slug)}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex flex-col">
                        <span className="font-semibold">{service.name}</span>
                        <span className="text-small text-fg-subtle">
                          {service.highlights.join(" · ")}
                        </span>
                      </span>
                      <ArrowCircle />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <Button
              href={marketing.cta.href}
              variant="outline"
              icon={<ArrowUpRightIcon />}
              iconPosition="end"
            >
              {marketing.cta.label}
            </Button>
          </div>
        </article>

        {/* Website: same raised card style as marketing */}
        <article className="flex min-w-0 flex-col justify-between gap-10 rounded-[var(--radius-media)] border border-line bg-bg-raised p-7 md:p-10">
          <div className="flex flex-col gap-5">
            <span className="text-small font-semibold tracking-[0.12em] text-fg-muted uppercase">
              {website.label}
            </span>
            <h3 className="font-display text-title font-semibold">{website.title}</h3>
            <p className="max-w-[44ch] text-fg-muted">{website.description}</p>
            <ul className="mt-2 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
              {website.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-small font-semibold">
                  <AsteriskIcon size={16} className="shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button
              href={website.cta.href}
              variant="outline"
              icon={<ArrowUpRightIcon />}
              iconPosition="end"
            >
              {website.cta.label}
            </Button>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
