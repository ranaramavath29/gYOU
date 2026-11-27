import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { OurWorkGrid } from "@/components/case-studies/OurWorkGrid";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button, Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { caseStudyLabels as L, ourWork } from "@/content/caseStudies";
import { industryList } from "@/content/industries";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudies, toCardData } from "@/lib/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  const hasWork = (await getCaseStudies()).length > 0;
  return {
    ...buildMetadata({
      title: ourWork.metaTitle,
      description: ourWork.metaDescription,
      path: "/our-work",
    }),
    // Keep the empty page out of search until a case study is published.
    ...(hasWork ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function OurWorkPage() {
  const items = (await getCaseStudies()).map(toCardData);
  // Only offer filters that match at least one project.
  const industries = industryList
    .filter((i) => items.some((c) => c.industry === i.slug))
    .map((i) => ({ value: i.slug, label: i.name }));
  const serviceOptions = services
    .filter((s) => items.some((c) => c.services.includes(s.slug)))
    .map((s) => ({ value: s.slug, label: s.shortName }));

  return (
    <>
      <section aria-labelledby="work-title" className="pt-6 pb-12 md:pt-10 md:pb-16">
        <Container>
          <Breadcrumb
            label={L.breadcrumbLabel}
            items={[{ label: L.breadcrumbHome, href: "/" }]}
            current={L.breadcrumbWork}
            currentHref="/our-work"
          />
          <Reveal className="mt-10 md:mt-14">
            {items.length > 0 ? (
              <SectionHeading
                as="h1"
                id="work-title"
                size="hero"
                {...ourWork.heading}
                description={ourWork.supporting}
              />
            ) : (
              <SectionHeading
                as="h1"
                id="work-title"
                size="hero"
                {...ourWork.empty.heading}
                headingClassName="max-w-[14ch]"
                description={ourWork.empty.body}
              />
            )}
          </Reveal>
          {items.length === 0 ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={ourWork.empty.primary.href} variant="solid" size="lg">
                {ourWork.empty.primary.label}
              </Button>
              <Button
                href={ourWork.empty.secondary.href}
                variant="outline"
                size="lg"
                icon={<ArrowUpRightIcon />}
                iconPosition="end"
              >
                {ourWork.empty.secondary.label}
              </Button>
            </div>
          ) : null}
        </Container>
      </section>

      {items.length > 0 ? (
        <Section
          aria-label={ourWork.metaTitle}
          spacing="none"
          className="pb-[clamp(4.5rem,2.9rem+5vw,8.5rem)]"
        >
          {/* useSearchParams needs a Suspense boundary on a static page. The
              fallback is the full, unfiltered grid, so the server HTML (and
              search engines, and no-JS visitors) still get every project. */}
          <Suspense
            fallback={
              <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <li key={item.slug}>
                    <CaseStudyCard item={item} index={i} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            }
          >
            <OurWorkGrid items={items} industries={industries} services={serviceOptions} />
          </Suspense>
        </Section>
      ) : null}

      <FinalCta form="our-work" page="/our-work" as="h2" />
    </>
  );
}
