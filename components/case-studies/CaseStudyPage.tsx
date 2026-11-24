import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowCircle,
  Container,
  MediaFrame,
  Pill,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { caseStudyLabels as L } from "@/content/caseStudies";
import { industryName } from "@/content/industries";
import { serviceBySlug, serviceHref } from "@/content/services";
import { caseStudyHref, type CaseStudyMeta } from "@/lib/caseStudies";

type Props = {
  meta: CaseStudyMeta;
  Content: ComponentType;
  next?: CaseStudyMeta;
};

/**
 * Case study detail (docs/BUILD_PROMPT.md → Phase 5): client, industry,
 * objective, challenge, strategy, services, story (MDX), creative gallery,
 * results, testimonial and next-project link. Empty parts are not rendered.
 */
export function CaseStudyPage({ meta, Content, next }: Props) {
  const facts = [
    { label: L.client, value: meta.client },
    { label: L.industry, value: industryName(meta.industry) },
  ];

  return (
    <>
      {meta.draft ? (
        <p
          role="note"
          className="bg-accent px-5 py-2 text-center text-small font-semibold text-on-accent"
        >
          {L.draftBanner}
        </p>
      ) : null}

      {/* Hero */}
      <section aria-labelledby="cs-title" className="pt-6 pb-16 md:pt-10 md:pb-24">
        <Container>
          <Breadcrumb
            label={L.breadcrumbLabel}
            items={[
              { label: L.breadcrumbHome, href: "/" },
              { label: L.breadcrumbWork, href: "/our-work" },
            ]}
            current={meta.client}
            currentHref={caseStudyHref(meta.slug)}
          />
          <Reveal className="mt-10 flex flex-col gap-8 md:mt-14">
            <Pill dot variant="chip">
              {meta.client} · {industryName(meta.industry)}
            </Pill>
            <h1
              id="cs-title"
              className="max-w-[18ch] font-display text-h2 font-semibold text-balance"
            >
              {meta.title}
            </h1>
            <p className="max-w-[56ch] text-body text-fg-muted">{meta.summary}</p>
            <ul className="flex flex-wrap gap-2">
              {meta.services.map((slug) => (
                <li key={slug}>
                  <Link
                    href={serviceHref(slug)}
                    className="inline-flex min-h-9 items-center rounded-full border border-line px-4 text-small text-fg-muted hover:border-fg-subtle hover:text-fg"
                  >
                    {serviceBySlug(slug).name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <MediaFrame
              media={meta.cover ? { kind: "image", ...meta.cover } : undefined}
              placeholder={meta.title}
              tint="olive"
              aspect="21/9"
              priority
              sizes="100vw"
            >
              {meta.cover ? null : (
                <p className="mt-auto font-display text-title font-semibold">{meta.client}</p>
              )}
            </MediaFrame>
          </div>
        </Container>
      </section>

      {/* At a glance */}
      <Section aria-label={L.objective} className="border-t border-line">
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
          <dl className="flex flex-col gap-6">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 border-b border-line pb-5">
                <dt className="text-small text-fg-subtle">{f.label}</dt>
                <dd className="font-semibold">{f.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1 border-b border-line pb-5">
              <dt className="text-small text-fg-subtle">{L.services}</dt>
              <dd className="font-semibold">
                {meta.services.map((s) => serviceBySlug(s).name).join(", ")}
              </dd>
            </div>
          </dl>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              { label: L.objective, body: meta.objective },
              { label: L.challenge, body: meta.challenge },
              { label: L.strategy, body: meta.strategy },
            ].map((block) => (
              <div key={block.label} className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  {block.label}
                </h2>
                <p className="text-fg-muted">{block.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Story (MDX body) */}
      <Section aria-labelledby="cs-story">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
          <SectionHeading id="cs-story" {...L.storyHeading} />
          <div className="max-w-[70ch]">
            <Content />
          </div>
        </div>
      </Section>

      {/* Creative gallery */}
      {meta.gallery.length > 0 ? (
        <Section aria-labelledby="cs-gallery">
          <SectionHeader id="cs-gallery" heading={L.galleryHeading} />
          <ul className="grid gap-4 md:grid-cols-2">
            {meta.gallery.map((img) => (
              <li
                key={img.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Results (verified, with period and method) */}
      {meta.results.length > 0 ? (
        <Section tone="paper" aria-labelledby="cs-results">
          <SectionHeader id="cs-results" heading={L.resultsHeading} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {meta.results.map((r) => (
              <li
                key={r.label}
                className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-white p-6 md:p-8"
              >
                <span className="flex flex-col gap-2">
                  <span className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-semibold">
                    {r.value}
                  </span>
                  <span className="font-semibold">{r.label}</span>
                </span>
                <dl className="grid gap-1 text-small text-ink-muted">
                  <div>
                    <dt className="inline">{L.period}: </dt>
                    <dd className="inline">{r.period}</dd>
                  </div>
                  <div>
                    <dt className="inline">{L.measuredBy}: </dt>
                    <dd className="inline">{r.measuredBy}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          {meta.testimonial ? (
            <figure className="mt-16 flex flex-col gap-8">
              <blockquote className="max-w-[24ch] font-display text-h2 font-normal italic">
                “{meta.testimonial.quote}”
              </blockquote>
              <figcaption className="text-small text-ink-muted">
                <span className="font-semibold text-ink">{meta.testimonial.name}</span>,{" "}
                {meta.testimonial.designation}, {meta.testimonial.company}
              </figcaption>
            </figure>
          ) : null}
        </Section>
      ) : null}

      {/* Next project */}
      {next ? (
        <Section aria-label={L.next} spacing="none" className="border-t border-line py-12">
          <Link
            href={caseStudyHref(next.slug)}
            className="group flex items-center justify-between gap-6"
          >
            <span className="flex flex-col gap-1">
              <span className="text-small text-fg-subtle">{L.next}</span>
              <span className="font-display text-title font-semibold">
                {next.client} — {next.title}
              </span>
            </span>
            <ArrowCircle />
          </Link>
        </Section>
      ) : null}

      <FinalCta
        heading={L.cta.heading}
        supporting={L.cta.supporting}
        form={`case-study-${meta.slug}`}
        page={caseStudyHref(meta.slug)}
      />
    </>
  );
}
