import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Spotlight } from "@/components/sections/Spotlight";
import { Button, Card, Reveal, Section, SectionHeading } from "@/components/ui";
import { about } from "@/content/about";
import { ctas, process } from "@/content/home";
import { uiLabels } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: about.metaTitle,
  description: about.metaDescription,
  path: "/about-us",
});

export default function AboutPage() {
  const { whoWeAre, values, team } = about;
  return (
    <>
      <PageHero
        id="about-title"
        eyebrow={about.eyebrow}
        heading={about.heading}
        supporting={about.supporting}
        breadcrumb={{
          label: uiLabels.breadcrumb,
          items: [{ label: uiLabels.home, href: "/" }],
          current: about.metaTitle,
          currentHref: "/about-us",
        }}
        actions={
          <>
            <Button href={ctas.primary.href} variant="solid" size="lg">
              {ctas.primary.label}
            </Button>
            <Button href={ctas.services.href} variant="outline" size="lg">
              {ctas.services.label}
            </Button>
          </>
        }
      />

      {/* Who we are */}
      <Section aria-labelledby="about-who" className="border-t border-line">
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeading id="about-who" {...whoWeAre.heading} />
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 text-body text-fg-muted">
              {whoWeAre.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-8">
              {whoWeAre.facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse gap-2">
                  <dt className="text-small text-fg-subtle">{f.label}</dt>
                  <dd className="font-display text-title font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      {/* What we do: websites + marketing */}
      <Spotlight id="about-what" />

      <ProcessSection id="about-approach" heading={about.approachHeading} steps={process.steps} />

      {/* Values */}
      <Section aria-labelledby="about-values">
        <SectionHeader id="about-values" heading={values.heading} />
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.items.map((v, i) => (
              <Card as="li" key={v.title} className="flex flex-col gap-6">
                <span aria-hidden className="font-display text-3xl leading-none text-accent italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {v.title}
                  </h3>
                  <span className="text-small text-fg-muted">{v.description}</span>
                </span>
              </Card>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Team: hidden until real, consenting team members are added */}
      {team.members.length > 0 ? (
        <Section aria-labelledby="about-team">
          <SectionHeader id="about-team" heading={team.heading} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.members.map((m) => (
              <li key={m.name} className="flex flex-col gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-bg-raised-2">
                  {m.photo ? (
                    <Image
                      src={m.photo.src}
                      alt={m.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <span className="flex flex-col">
                  <span className="font-semibold">{m.name}</span>
                  <span className="text-small text-fg-subtle">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <FinalCta
        heading={about.cta.heading}
        supporting={about.cta.supporting}
        form="about"
        page="/about-us"
      />
    </>
  );
}
