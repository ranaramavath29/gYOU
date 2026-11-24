import { Hero } from "@/components/home/Hero";
import { AgencyIntro, CallbackBar, ClientCredibility } from "@/components/home/IntroSections";
import { Challenges, Process, SelectedWork, ServicesList } from "@/components/home/OfferSections";
import {
  Industries,
  LatestInsights,
  Testimonial,
  WhyChoose,
} from "@/components/home/ProofSections";
import { FinalCta } from "@/components/sections/FinalCta";
import { Spotlight } from "@/components/sections/Spotlight";
import type { MediaTint } from "@/components/ui";
import { selectedWork, type WorkCard } from "@/content/home";
import { serviceBySlug } from "@/content/services";
import { caseStudyHref, getCaseStudies } from "@/lib/caseStudies";
import { getPosts, toPostCard } from "@/lib/insights";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { localBusinessLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const tints: readonly MediaTint[] = ["olive", "rust", "navy"];

export const metadata = buildMetadata({
  title: `Digital Marketing Agency in ${site.primaryMarket} | ${site.name}`,
  absoluteTitle: true,
  description: `${site.name} helps businesses grow with digital marketing, Google Ads, Meta Ads, SEO, social media marketing and website development in ${site.primaryMarket}.`,
  path: "/",
});

// "Studio Daylight" layout (option J): hero, callback bar, facts, clients, then the
// brief's sections. Content: content/home.ts.
export default async function HomePage() {
  // Selected work comes from published case studies; hidden while there are none.
  const work: WorkCard[] = (await getCaseStudies())
    .filter((cs) => !cs.draft)
    .slice(0, selectedWork.limit)
    .map((cs, i) => ({
      client: cs.client,
      title: cs.title,
      tags: cs.services.map((s) => serviceBySlug(s).shortName).join(" · "),
      image: cs.cover,
      tint: tints[i % tints.length]!,
      href: caseStudyHref(cs.slug),
    }));

  const posts = (await getPosts()).filter((p) => !p.draft).map(toPostCard);
  const localBusiness = localBusinessLd();

  return (
    <>
      {localBusiness ? <JsonLd data={localBusiness} /> : null}
      <Hero />
      <CallbackBar />
      <ClientCredibility />
      <AgencyIntro />
      {/* Added at gYOU's request (PAUSE 4): highlights websites + marketing. */}
      <Spotlight id="spotlight-heading" />
      <Challenges />
      <ServicesList />
      <Process />
      <SelectedWork items={work} />
      <Industries />
      <WhyChoose />
      <Testimonial />
      <LatestInsights posts={posts} />
      <FinalCta form="home-final-cta" page="/" />
    </>
  );
}
