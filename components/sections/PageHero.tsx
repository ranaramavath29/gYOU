import type { ReactNode } from "react";
import { AsteriskIcon } from "@/components/icons";
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

/** Hero backdrop: faint grid fading out from the top right, plus two soft glows. */
export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_80%_at_75%_20%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[680px] rounded-full bg-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-[-15%] h-[420px] w-[560px] rounded-full bg-accent/[0.05] blur-[120px]"
      />
    </>
  );
}

/** Inner-page hero: breadcrumb, optional eyebrow pill, h1, supporting copy, actions. */
export function PageHero({ id, heading, supporting, eyebrow, breadcrumb, actions }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      <HeroBackdrop />

      {/* Orbit ornament in the top-right corner (desktop): rings, two orbiting
          dots, brand asterisk. Sits partly off-canvas so it never meets the heading. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-150px] right-[-150px] hidden size-[400px] opacity-80 lg:block"
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-12 rounded-full border border-white/[0.08]" />
        <div className="absolute inset-24 rounded-full border border-accent/25 bg-accent/[0.03] shadow-[0_0_90px_-10px_rgb(214_255_92/0.3)]" />
        <div className="absolute inset-0 animate-spin-slow">
          <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_rgb(214_255_92/0.9)]" />
        </div>
        <div className="absolute inset-12 animate-spin-slower">
          <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-fg/70" />
        </div>
        <div className="absolute inset-0 grid place-items-center text-accent">
          <AsteriskIcon size={64} className="animate-spin-slow" />
        </div>
      </div>

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
