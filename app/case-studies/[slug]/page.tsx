import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/TrackView";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { caseStudyHref, getCaseStudies, getCaseStudy } from "@/lib/caseStudies";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Only case studies that exist at build time are generated; others 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCaseStudies()).map((cs) => ({ slug: cs.slug }));
}

// Basic metadata now; canonical, Open Graph and JSON-LD come in Phase 8.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: `${cs.meta.client}: ${cs.meta.title}`,
    description: cs.meta.summary,
    path: caseStudyHref(slug),
    ogEyebrow: `Case study · ${cs.meta.client}`,
    noindex: cs.meta.draft,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) notFound();

  const all = await getCaseStudies();
  const i = all.findIndex((c) => c.slug === slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : undefined;

  return (
    <>
      <TrackView event="case_study_view" params={{ case_study: slug }} />
      <CaseStudyPage meta={cs.meta} Content={cs.Content} next={next} />
    </>
  );
}
