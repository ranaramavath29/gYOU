import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { Spotlight } from "@/components/sections/Spotlight";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowCircle, Button, Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { serviceHref, services } from "@/content/services";
import { serviceShared as shared, servicesOverview as overview } from "@/content/services/shared";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${overview.metaTitle} in ${site.primaryMarket}`,
  description: overview.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section
        aria-labelledby="services-hero"
        className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[680px] rounded-full bg-accent/10 blur-[140px]"
        />
        <Container className="relative">
          <Breadcrumb
            label={shared.breadcrumb.label}
            items={[{ label: shared.breadcrumb.home, href: "/" }]}
            current={shared.breadcrumb.services}
            currentHref="/services"
          />
          <Reveal className="mt-10 md:mt-14">
            <SectionHeading
              as="h1"
              id="services-hero"
              size="hero"
              {...overview.heading}
              headingClassName="max-w-[16ch]"
            />
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-[48ch] text-body text-fg-muted">{overview.supporting}</p>
              <Button
                href={shared.primaryCta.href}
                variant="solid"
                size="lg"
                icon={<ArrowUpRightIcon />}
                iconPosition="end"
              >
                {shared.primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="border-t border-line">
        <Spotlight id="services-spotlight" page="services" level={2} />
      </div>

      <Section aria-labelledby="services-list">
        <SectionHeader id="services-list" heading={overview.listHeading} />
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group flex h-full flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-line bg-bg-raised p-6 transition-colors hover:border-line-strong md:p-8"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-small text-fg-subtle tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowCircle />
                  </span>
                  <span className="flex flex-col gap-3">
                    <h4 className="font-display text-title font-semibold">{service.name}</h4>
                    <span className="text-small text-fg-muted">{service.summary}</span>
                    <span className="mt-2 text-small text-fg-subtle">
                      {service.highlights.join(" · ")}
                    </span>
                    <span className="sr-only">{overview.exploreLabel}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <ProcessSection
        id="services-process"
        heading={shared.processHeading}
        steps={shared.processSteps}
      />

      <EngagementSection id="services-engagement" />

      <FinalCta
        heading={overview.cta.heading}
        supporting={overview.cta.supporting}
        form="services-overview"
        page="/services"
      />
    </>
  );
}
