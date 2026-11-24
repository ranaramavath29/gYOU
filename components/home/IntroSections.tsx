import Image from "next/image";
import { PlaceholderText } from "@/components/PlaceholderText";
import { ArrowLink, Container, Marquee, Reveal, Section, SectionHeading } from "@/components/ui";
import { credibility, intro, marqueeLabel, type Credential } from "@/content/home";
import { services } from "@/content/services";

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

/** 4. Agency introduction with verified facts. */
export function AgencyIntro() {
  return (
    <Section aria-labelledby="intro-heading">
      <Reveal className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <SectionHeading id="intro-heading" {...intro.heading} headingClassName="max-w-[14ch]" />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 text-body text-fg-muted">
            {intro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {intro.stats.length > 0 ? (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8">
              {intro.stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col-reverse gap-2">
                  <dt className="text-small text-fg-subtle">{stat.label}</dt>
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
    <section aria-labelledby="credibility-heading" className="border-y border-line py-14 md:py-16">
      <Container>
        <Reveal className="flex flex-col gap-8">
          <h2
            id="credibility-heading"
            className="text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase"
          >
            {credibility.label}
          </h2>
          {credibility.logos.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {credibility.logos.map((logo) => (
                <li
                  key={logo.name}
                  className="grid min-h-24 place-items-center rounded-2xl border border-line px-4 py-5 text-center"
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
