import type { ReactNode } from "react";
import { Container, Pill, Reveal, SectionHeading } from "@/components/ui";
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
};

/** Inner-page hero: breadcrumb, optional eyebrow pill, h1, supporting copy, actions. */
export function PageHero({ id, heading, supporting, eyebrow, breadcrumb, actions }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      <Container className="relative">
        <Breadcrumb
          label={breadcrumb.label}
          items={breadcrumb.items}
          current={breadcrumb.current}
          currentHref={breadcrumb.currentHref}
        />
        <Reveal className="mt-10 md:mt-14">
          <SectionHeading
            as="h1"
            id={id}
            size="hero"
            eyebrow={eyebrow ? <Pill dot>{eyebrow}</Pill> : undefined}
            {...heading}
            className="gap-8"
            headingClassName="max-w-[16ch]"
            description={supporting}
          />
          {actions ? <div className="mt-10 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
