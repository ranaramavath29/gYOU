import { HeroAuditForm } from "@/components/forms/HeroAuditForm";
import { ArrowUpRightIcon, CheckIcon } from "@/components/icons";
import { Button, Container, SectionHeading } from "@/components/ui";
import { formCopy } from "@/content/forms";
import { hero } from "@/content/home";

/**
 * 1. Hero: an ink panel with the headline, checklist and CTAs on the left and
 * a light card holding the three-step free marketing audit form on the right
 * (stacked below on mobile). Copy: content/home.ts (hero) and
 * content/forms.ts (heroAudit).
 */
export function Hero() {
  const audit = formCopy.heroAudit;
  return (
    <section aria-labelledby="hero-heading" className="px-2 pt-2 pb-4 md:px-4 md:pb-6">
      <div className="tone-ink relative overflow-hidden rounded-[var(--radius-sheet)] bg-ink text-fg">
        {/* Soft accent glow for depth; decorative only. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full bg-accent/25 blur-[120px]"
        />

        <Container className="relative grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20 xl:gap-20">
          {/* Above the fold: rendered immediately (no reveal), so it can be the LCP. */}
          <div className="flex flex-col">
            <SectionHeading
              as="h1"
              id="hero-heading"
              size="split"
              eyebrow={
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[0.75rem] font-bold tracking-[0.08em] text-sky uppercase">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {hero.eyebrow}
                </span>
              }
              {...hero.heading}
              className="gap-6"
              headingClassName="max-w-[15ch]"
            />
            <p className="mt-6 max-w-[50ch] text-body text-fg-muted">{hero.supporting}</p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {hero.points.map((point) => (
                <li key={point} className="flex items-start gap-3 font-semibold">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-sky"
                  >
                    <CheckIcon size={13} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

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
                className="hover:border-fg! hover:bg-white/10!"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            <p className="mt-9 flex items-center gap-3 text-small font-semibold text-fg-muted">
              <span aria-hidden className="h-px w-10 bg-fg-subtle/60" />
              {hero.supportingLine}
            </p>
          </div>

          <div className="w-full lg:justify-self-end">
            <div
              id="free-audit"
              className="tone-light mx-auto w-full max-w-[560px] rounded-[32px] bg-bg-raised p-6 text-fg shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)] sm:p-9"
            >
              <span className="inline-flex rounded-full bg-sage px-3.5 py-1.5 text-[0.8125rem] font-bold text-white">
                {audit.badge}
              </span>
              <p className="mt-4 font-display text-[clamp(1.5rem,1.3rem+0.8vw,1.875rem)] leading-tight font-semibold tracking-[-0.025em]">
                {audit.heading}
              </p>
              <p className="mt-2 mb-6 text-small text-fg-muted">{audit.intro}</p>
              <HeroAuditForm />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
