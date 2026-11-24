import { CaseStudyCard, type CaseStudyCardData } from "@/components/case-studies/CaseStudyCard";
import { AuditForm } from "@/components/forms/AuditForm";
import { ArrowUpRightIcon, AsteriskIcon } from "@/components/icons";
import { formCopy } from "@/content/forms";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import {
  Accordion,
  Button,
  Card,
  Container,
  Pill,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { serviceBySlug, serviceHref } from "@/content/services";
import { serviceShared as shared } from "@/content/services/shared";
import type { ServicePageContent } from "@/content/services/types";

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Reusable service page template (docs/BUILD_PROMPT.md → Phase 4):
 * hero, introduction, challenges, solutions, deliverables, process,
 * related case studies, FAQs and closing enquiry CTA.
 * Sections without real content (case studies, FAQs) are not rendered.
 */
export function ServicePage({
  content,
  related = [],
}: {
  content: ServicePageContent;
  /** Published case studies that used this service (max 3). */
  related?: readonly CaseStudyCardData[];
}) {
  const service = serviceBySlug(content.slug);
  const path = serviceHref(content.slug);

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="service-hero"
        className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28"
      >
        <Container className="relative">
          <Breadcrumb
            label={shared.breadcrumb.label}
            items={[
              { label: shared.breadcrumb.home, href: "/" },
              { label: shared.breadcrumb.services, href: "/services" },
            ]}
            current={service.name}
            currentHref={path}
          />
          <Reveal className="mt-10 md:mt-14">
            <SectionHeading
              as="h1"
              id="service-hero"
              size="hero"
              eyebrow={
                <Pill dot>
                  {service.name} · {shared.eyebrowSuffix}
                </Pill>
              }
              {...content.hero.heading}
              className="gap-8"
              headingClassName="max-w-[16ch]"
            />
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[48ch] text-body text-fg-muted">{content.hero.supporting}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={shared.primaryCta.href} variant="solid" size="lg">
                  {shared.primaryCta.label}
                </Button>
                <Button
                  href={shared.secondaryCta.href}
                  variant="outline"
                  size="lg"
                  icon={<ArrowUpRightIcon />}
                  iconPosition="end"
                >
                  {shared.secondaryCta.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Introduction */}
      <Section aria-labelledby="service-intro" className="border-t border-line">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="service-intro"
            {...content.intro.heading}
            headingClassName="max-w-[12ch]"
          />
          <div className="flex flex-col gap-6 text-body text-fg-muted">
            {content.intro.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Business challenges */}
      <Section aria-labelledby="service-challenges">
        <SectionHeader id="service-challenges" heading={shared.challengesHeading} />
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-3">
            {content.challenges.map((item, i) => (
              <Card as="li" key={item.title} className="flex flex-col gap-8">
                <span className="text-small text-fg-subtle tabular-nums">{pad(i)}</span>
                <span className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <span className="text-small text-fg-muted">{item.description}</span>
                </span>
              </Card>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Solutions */}
      <Section aria-labelledby="service-solutions">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="service-solutions" {...shared.solutionsHeading} />
          </Reveal>
          <Reveal>
            <ol className="border-t border-line">
              {content.solutions.map((item, i) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7"
                >
                  <span aria-hidden className="font-display text-3xl leading-none text-ink italic">
                    {pad(i)}
                  </span>
                  <span className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <span className="text-fg-muted">{item.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Deliverables */}
      <Section aria-labelledby="service-deliverables">
        <SectionHeader id="service-deliverables" heading={shared.deliverablesHeading} />
        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.deliverables.map((item) => (
              <li
                key={item}
                className="group flex min-h-24 items-center gap-4 rounded-[var(--radius-card)] border border-line bg-bg-raised px-6 py-5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.16)] transition-[border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink transition-colors duration-300 group-hover:bg-accent">
                  <AsteriskIcon
                    size={16}
                    className="transition-transform duration-700 group-hover:rotate-90"
                  />
                </span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <ProcessSection
        id="service-process"
        heading={shared.processHeading}
        steps={shared.processSteps}
      />

      {content.auditForm ? (
        <Section aria-labelledby="service-audit">
          <div className="rounded-[var(--radius-media)] border border-line bg-bg-raised p-6 md:p-10">
            <SectionHeading
              id="service-audit"
              size="title"
              {...formCopy.audit.heading}
              description={formCopy.audit.intro}
            />
            <div className="mt-8">
              <AuditForm />
            </div>
          </div>
        </Section>
      ) : null}

      <EngagementSection id="service-engagement" />

      {/* Related case studies: published projects that used this service. */}
      {related.length > 0 ? (
        <Section aria-labelledby="service-related">
          <SectionHeader id="service-related" heading={shared.relatedHeading} />
          <Reveal>
            <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <CaseStudyCard item={item} index={i} />
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      ) : null}

      {content.faqs.length > 0 ? (
        <Section aria-labelledby="service-faqs">
          <SectionHeader id="service-faqs" heading={shared.faqHeading} />
          <Reveal>
            <Accordion items={content.faqs} />
          </Reveal>
        </Section>
      ) : null}

      <FinalCta
        heading={content.cta.heading}
        supporting={content.cta.supporting}
        form={`service-${content.slug}`}
        page={path}
      />
    </>
  );
}
