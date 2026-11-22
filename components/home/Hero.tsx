import { ArrowUpRightIcon, AsteriskIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { Button, Container, MediaFrame, Pill, Reveal, SectionHeading } from "@/components/ui";
import { hero } from "@/content/home";

// Offsets the three floats so the tiles drift out of step.
const tileLayout = [
  { tilt: -5, aspect: "4/5", wrapper: "translate-y-6 md:translate-y-10", delay: undefined },
  { tilt: undefined, aspect: "4/3", wrapper: "z-10", delay: "[animation-delay:-2.3s]" },
  {
    tilt: 5,
    aspect: "4/5",
    wrapper: "translate-y-10 md:translate-y-16",
    delay: "[animation-delay:-4.6s]",
  },
] as const;

/** 1. Hero and 2. floating work tiles / showreel. */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-8 pb-24 md:pt-14 md:pb-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-accent/10 blur-[140px]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            as="h1"
            id="hero-heading"
            size="hero"
            eyebrow={<Pill dot>{hero.eyebrow}</Pill>}
            {...hero.heading}
            className="gap-8"
            headingClassName="max-w-[17ch]"
          />
          <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[46ch] text-body text-fg-muted">{hero.supporting}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} variant="solid" size="lg">
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
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-[1fr_1.5fr_1fr] items-center gap-3 md:mt-24 md:gap-8">
          {hero.tiles.map((tile, i) => {
            const layout = tileLayout[i]!;
            return (
              <div key={tile.title} className={layout.wrapper}>
                <MediaFrame
                  placeholder={tile.title}
                  tint={tile.tint}
                  aspect={layout.aspect}
                  tilt={layout.tilt}
                  float
                  className={layout.delay}
                >
                  <div
                    className={cn(
                      "items-start justify-between gap-2 text-[clamp(0.5rem,0.35rem+0.6vw,0.8125rem)] text-fg-subtle",
                      // The centre tile is short on phones; give its tagline the room.
                      i === 1 ? "hidden sm:flex" : "flex",
                    )}
                  >
                    <span>{tile.detail}</span>
                    <AsteriskIcon size={14} className="hidden shrink-0 text-accent sm:block" />
                  </div>
                  <p
                    className={cn(
                      "mt-auto font-display font-semibold tracking-[-0.03em] text-balance",
                      i === 1
                        ? "text-[clamp(0.6875rem,0.1rem+2.4vw,2.5rem)] leading-[1.05]"
                        : "text-[clamp(0.8rem,0.4rem+1.6vw,1.75rem)] leading-none",
                    )}
                  >
                    {tile.title}
                  </p>
                </MediaFrame>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
