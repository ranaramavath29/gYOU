import type { ReactNode } from "react";
import { Container, MediaFrame, Pill, SectionHeading, type MediaSource } from "@/components/ui";
import type { Heading } from "@/content/home";
import type { NavLink } from "@/content/navigation";
import { Breadcrumb } from "./Breadcrumb";

type PageHeroProps = {
  id: string;
  heading: Heading;
  supporting?: ReactNode;
  eyebrow?: string;
  breadcrumb: { label: string; items: readonly NavLink[]; current: string; currentHref?: string };
  /** Buttons or other actions under the supporting copy. */
  actions?: ReactNode;
  /** Wide rounded image or video banner under the heading (option J / image-led hero). */
  media?: MediaSource;
};

/** Inner-page hero: breadcrumb, optional eyebrow pill, h1, supporting copy, actions. */
export function PageHero({
  id,
  heading,
  supporting,
  eyebrow,
  breadcrumb,
  actions,
  media,
}: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16">
      <Container className="relative">
        <Breadcrumb
          label={breadcrumb.label}
          items={breadcrumb.items}
          current={breadcrumb.current}
          currentHref={breadcrumb.currentHref}
        />
        {/* Above the fold: no reveal animation, so the h1 paints immediately (LCP). */}
        <div className="mt-10 md:mt-14">
          <SectionHeading
            as="h1"
            id={id}
            size="hero"
            eyebrow={
              eyebrow ? (
                <Pill dot variant="chip">
                  {eyebrow}
                </Pill>
              ) : undefined
            }
            {...heading}
            className="gap-8"
            headingClassName="max-w-[16ch]"
            description={supporting}
          />
          {actions ? <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {media ? (
          <div className="mt-10 md:mt-12">
            <figure className="rounded-[36px] border border-line bg-bg-raised p-2.5 shadow-[0_40px_80px_-48px_rgb(29_27_24/0.45)]">
              <MediaFrame
                media={media}
                placeholder={media.kind === "image" ? media.alt : media.label}
                aspect="21/9"
                priority
                flat
                sizes="(min-width: 1320px) 1256px, 100vw"
                className="[--radius-media:28px]"
              />
            </figure>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
