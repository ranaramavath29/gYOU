import type { Metadata } from "next";
import Link from "next/link";
import { AsteriskIcon } from "@/components/icons";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { Container, MediaFrame, Reveal } from "@/components/ui";
import { industriesPage as copy, industryList } from "@/content/industries";
import { industryMedia } from "@/content/media";
import { uiLabels } from "@/content/navigation";
import { serviceBySlug, serviceHref } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${copy.metaTitle} We Serve`,
  description: copy.metaDescription,
  path: "/industries",
});

/**
 * Industries overview with one block per industry (anchor: #<slug>).
 * Separate /industries/[slug] pages can follow once there is enough
 * sector-specific content and examples (PAUSE 6).
 */
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        id="industries-title"
        heading={copy.heading}
        supporting={copy.supporting}
        breadcrumb={{
          label: uiLabels.breadcrumb,
          items: [{ label: uiLabels.home, href: "/" }],
          current: copy.metaTitle,
          currentHref: "/industries",
        }}
      />

      {/* Jump links */}
      <Container>
        <nav aria-label={copy.metaTitle} className="border-y border-line py-5">
          <ul className="flex flex-wrap gap-2">
            {industryList.map((industry) => (
              <li key={industry.slug}>
                <a
                  href={`#${industry.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-bg-raised-2 px-4 text-sm font-semibold hover:border-fg-subtle"
                >
                  {industry.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="py-[clamp(3rem,2rem+4vw,6rem)]">
        <ol className="flex flex-col">
          {industryList.map((industry, i) => {
            const image = industryMedia[industry.slug as keyof typeof industryMedia];
            return (
              <li
                key={industry.slug}
                id={industry.slug}
                className="scroll-mt-28 border-b border-line py-12 first:pt-0 md:py-16"
              >
                <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <span
                        aria-hidden
                        className="text-small font-semibold text-accent tabular-nums"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-title font-semibold">{industry.name}</h2>
                    </div>
                    {image ? (
                      <figure className="rounded-[28px] border border-line bg-bg-raised p-2 shadow-[0_24px_50px_-34px_rgb(29_27_24/0.4)]">
                        <MediaFrame
                          media={image}
                          placeholder={image.alt}
                          aspect="4/3"
                          flat
                          // 4:3 frame; wider photos fill it by height (up to ~680px for 2:1).
                          sizes="(min-width: 1024px) 680px, 150vw"
                          className="[--radius-media:22px]"
                        />
                      </figure>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-8">
                    <p className="text-body text-fg-muted">{industry.description}</p>
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                          {copy.focusLabel}
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                          {industry.focus.map((f) => (
                            <li key={f} className="flex items-center gap-3">
                              <AsteriskIcon size={14} className="shrink-0 text-ink" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3 text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                          {copy.servicesLabel}
                        </h3>
                        <ul className="flex flex-col">
                          {industry.services.map((slug) => (
                            <li key={slug}>
                              <Link
                                href={serviceHref(slug)}
                                className="inline-flex min-h-9 items-center underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                              >
                                {serviceBySlug(slug).name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>

      <FinalCta
        heading={copy.cta.heading}
        supporting={copy.cta.supporting}
        form="industries"
        page="/industries"
      />
    </>
  );
}
