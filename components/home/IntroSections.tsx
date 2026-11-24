import Image from "next/image";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { PlaceholderText } from "@/components/PlaceholderText";
import {
  ArrowLink,
  Container,
  Marquee,
  MediaFrame,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { formCopy } from "@/content/forms";
import { credibility, intro, marqueeLabel, type Credential } from "@/content/home";
import { services } from "@/content/services";

/** Quick callback bar directly under the hero ("Studio Daylight" layout). */
export function CallbackBar() {
  return (
    <section aria-labelledby="callback-heading" className="relative z-10">
      <Container>
        <Reveal className="rounded-[var(--radius-media)] border border-line bg-bg-raised p-5 shadow-[0_24px_50px_-34px_rgb(0_0_0/0.35)] md:p-7">
          <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
            <h2
              id="callback-heading"
              className="font-display text-2xl font-semibold tracking-[-0.02em]"
            >
              {formCopy.callback.heading}
            </h2>
            <p className="text-small text-fg-muted">{formCopy.callback.intro}</p>
          </div>
          <CallbackForm />
        </Reveal>
      </Container>
    </section>
  );
}

/** 3. Services marquee band. */
export function ServicesMarquee() {
  return (
    <Marquee
      items={services.map((s) => s.shortName)}
      label={marqueeLabel}
      tilted
      className="-my-6"
    />
  );
}

/** 4. Agency introduction: framed image left; heading, copy and verified facts right. */
export function AgencyIntro() {
  return (
    <Section aria-labelledby="intro-heading">
      <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <figure className="mx-auto w-full max-w-[540px] rounded-[32px] border border-line bg-bg-raised p-2.5 shadow-[0_30px_60px_-36px_rgb(29_27_24/0.35)] lg:mx-0">
          <MediaFrame
            media={intro.image}
            placeholder={intro.image.alt}
            aspect="1/1"
            flat
            sizes="(min-width: 1024px) 540px, 100vw"
            className="[--radius-media:24px]"
          />
        </figure>
        <div className="flex flex-col gap-8">
          <SectionHeading id="intro-heading" {...intro.heading} headingClassName="max-w-[16ch]" />
          <div className="flex flex-col gap-4 text-body text-fg-muted">
            {intro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {intro.stats.length > 0 ? (
            <dl className="grid grid-cols-2 gap-6 border-y border-line py-6">
              {intro.stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col-reverse gap-1">
                  <dt className="text-small text-fg-muted">{stat.label}</dt>
                  <dd>
                    <PlaceholderText
                      value={stat.value}
                      className="font-display text-title font-semibold [overflow-wrap:anywhere]"
                    />
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          <ArrowLink href={intro.cta.href}>{intro.cta.label}</ArrowLink>
        </div>
      </Reveal>
    </Section>
  );
}

function CredentialMark({ name, logo }: Credential) {
  return logo ? (
    <Image src={logo} alt={name} width={160} height={64} className="h-10 w-auto object-contain" />
  ) : (
    <span className="text-small text-fg-muted">{name}</span>
  );
}

/** 5. Client credibility: logo strip and badges. Hidden until real, permitted items exist. */
export function ClientCredibility() {
  if (credibility.logos.length === 0 && credibility.badges.length === 0) return null;
  return (
    <section aria-labelledby="credibility-heading" className="pt-16 md:pt-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-8">
          <h2
            id="credibility-heading"
            className="text-center font-display text-title font-semibold"
          >
            {credibility.label}
          </h2>
          {credibility.logos.length > 0 ? (
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {credibility.logos.map((logo) => (
                <li
                  key={logo.name}
                  className="grid min-h-24 place-items-center rounded-2xl border border-line bg-bg-raised px-4 py-5 text-center"
                >
                  <CredentialMark {...logo} />
                </li>
              ))}
            </ul>
          ) : null}
          {credibility.badges.length > 0 ? (
            <ul className="flex flex-wrap gap-3">
              {credibility.badges.map((badge) => (
                <li key={badge.name} className="rounded-full border border-line px-4 py-2">
                  <CredentialMark {...badge} />
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
