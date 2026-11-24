import { ArrowUpRightIcon } from "@/components/icons";
import { Button, Container, MediaFrame, Pill, Reveal, SectionHeading } from "@/components/ui";
import { hero } from "@/content/home";

/**
 * 1. Hero: headline, copy and CTAs on the left; on the right one framed
 * showcase card (gYOU's studio video) with its statement underneath, so the
 * media is never covered by labels.
 */
export function Hero() {
  const { showcase } = hero;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24"
    >
      {/* Soft warm panel behind the showcase, for depth without noise. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 hidden h-[78%] w-[42%] rounded-bl-[160px] bg-paper lg:block"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24">
        <Reveal className="flex flex-col">
          <SectionHeading
            as="h1"
            id="hero-heading"
            size="split"
            eyebrow={
              <Pill dot variant="chip">
                {hero.eyebrow}
              </Pill>
            }
            {...hero.heading}
            className="gap-7"
            headingClassName="max-w-[15ch]"
          />
          <p className="mt-7 max-w-[46ch] text-body text-fg-muted">{hero.supporting}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="accent" size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              icon={<ArrowUpRightIcon />}
              iconPosition="end"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-10 flex items-center gap-3 text-small font-semibold text-fg">
            <span aria-hidden className="h-px w-10 bg-line-strong" />
            {hero.supportingLine}
          </p>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-[480px] lg:mr-0">
          <figure className="rounded-[36px] border border-line bg-bg-raised p-2.5 shadow-[0_40px_80px_-40px_rgb(29_27_24/0.45)]">
            <MediaFrame
              media={showcase.media}
              placeholder={showcase.statement}
              aspect="4/5"
              priority
              flat
              className="[--radius-media:28px]"
              overlay={
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-bg/90 px-3.5 py-1.5 text-[0.75rem] font-semibold text-ink backdrop-blur">
                  {showcase.tag}
                </span>
              }
            />
            <figcaption className="flex items-start gap-3 px-3 pt-4 pb-2.5">
              <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
              <span className="font-display text-[clamp(1.0625rem,0.9rem+0.6vw,1.375rem)] leading-snug font-semibold tracking-[-0.02em] text-balance">
                {showcase.statement}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
