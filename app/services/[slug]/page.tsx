import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/TrackView";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePage } from "@/components/services/ServicePage";
import { isServiceSlug, serviceBySlug, serviceHref, serviceSeoTitles } from "@/content/services";
import { servicePages } from "@/content/services/pages";
import { site } from "@/content/site";
import { getCaseStudies, toCardData } from "@/lib/caseStudies";
import { faqLd, serviceLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Only the four known services exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

function contentFor(slug: string) {
  return isServiceSlug(slug) ? servicePages[slug] : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = contentFor(slug);
  if (!content) return {};
  const service = serviceBySlug(content.slug);
  return buildMetadata({
    title: `${serviceSeoTitles[content.slug]} in ${site.primaryMarket}`,
    description: content.metaDescription,
    path: serviceHref(content.slug),
    ogEyebrow: `${service.name} · ${site.primaryMarket}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const content = contentFor(slug);
  if (!content) notFound();
  const service = serviceBySlug(content.slug);
  const related = (await getCaseStudies())
    .filter((cs) => !cs.draft && cs.services.includes(content.slug))
    .slice(0, 3)
    .map(toCardData);

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: service.name,
          description: service.summary,
          path: serviceHref(content.slug),
          deliverables: content.deliverables,
        })}
      />
      {/* FAQPage only because the FAQs are visible on this page. */}
      {content.faqs.length > 0 ? <JsonLd data={faqLd(content.faqs)} /> : null}
      <TrackView event="service_page_view" params={{ service: content.slug }} />
      <ServicePage content={content} related={related} />
    </>
  );
}
