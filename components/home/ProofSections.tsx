import Link from "next/link";
import { PlaceholderText } from "@/components/PlaceholderText";
import { PostCard, type PostCardData } from "@/components/insights/PostCard";
import { ArrowUpRightIcon } from "@/components/icons";
import { MediaFrame, Reveal, Section, SectionHeading } from "@/components/ui";
import { industries, insights, testimonial, whyChoose } from "@/content/home";
import { industryList } from "@/content/industries";
import { industryMedia } from "@/content/media";
import { SectionHeader } from "@/components/sections/SectionHeader";

/** 10. Industries we serve: photo cards linking to each industry on /industries. */
export function Industries() {
  return (
    <Section aria-labelledby="industries-heading">
      <SectionHeader
        id="industries-heading"
        heading={industries.heading}
        intro={industries.intro}
      />
      <Reveal>
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {industryList.map((industry, i) => {
            const image = industryMedia[industry.slug as keyof typeof industryMedia];
            return (
              <li key={industry.slug}>
                <Link
                  href={`${industries.cta.href}#${industry.slug}`}
                  className="group relative block overflow-hidden rounded-[24px] shadow-[0_24px_50px_-34px_rgb(29_27_24/0.5)] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_34px_60px_-30px_rgb(29_27_24/0.55)]"
                >
                  <MediaFrame
                    media={image}
                    placeholder={industry.name}
                    aspect="4/5"
                    flat
                    zoomOnHover
                    // Landscape photos fill a portrait card by height, so they render
                    // ~2.5x the card width (up to ~760px for 2:1). Ask for that much.
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="[--radius-media:24px]"
                    overlay={
                      <span className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-[linear-gradient(to_top,rgb(29_27_24/0.78)_0%,rgb(29_27_24/0.35)_32%,transparent_58%)] p-4 text-bg md:p-5">
                        <span className="flex items-center justify-between">
                          <span className="rounded-full bg-bg/90 px-2.5 py-1 text-[0.75rem] font-semibold text-ink tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="grid size-9 place-items-center rounded-full bg-bg/95 text-ink shadow-[0_6px_16px_-8px_rgb(0_0_0/0.5)] transition-[background-color,color,rotate] duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-on-accent">
                            <ArrowUpRightIcon size={15} />
                          </span>
                        </span>
                        <span className="font-display text-[clamp(1rem,0.8rem+0.8vw,1.375rem)] leading-tight font-semibold tracking-[-0.02em] text-balance">
                          {industry.name}
                        </span>
                      </span>
                    }
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={industries.cta.href}
              className="group flex aspect-[4/5] h-full flex-col justify-between rounded-[24px] bg-accent p-4 text-on-accent shadow-[0_24px_50px_-34px_rgb(15_94_122/0.7)] transition-[translate,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-accent-hover md:p-5"
            >
              <span className="grid size-11 place-items-center rounded-full bg-on-accent text-accent transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRightIcon size={16} />
              </span>
              <span className="flex flex-col gap-2">
                <span className="font-display text-[clamp(1.125rem,0.9rem+0.9vw,1.625rem)] leading-tight font-semibold tracking-[-0.02em]">
                  {industries.cta.label}
                </span>
                <span className="text-small opacity-90">{industries.ctaHint}</span>
              </span>
            </Link>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}

/** 11. Why choose gYOU. */
export function WhyChoose() {
  return (
    <Section aria-labelledby="why-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="why-heading" {...whyChoose.heading} headingClassName="max-w-[14ch]" />
          <figure className="hidden max-w-[400px] rounded-[32px] border border-line bg-bg-raised p-2.5 shadow-[0_30px_60px_-36px_rgb(29_27_24/0.35)] lg:block">
            <MediaFrame
              media={whyChoose.image}
              placeholder={whyChoose.image.alt}
              aspect="4/5"
              flat
              sizes="400px"
              className="[--radius-media:24px]"
            />
          </figure>
        </Reveal>
        <Reveal>
          <ol className="border-t border-line">
            {whyChoose.points.map((point, i) => (
              <li
                key={point.title}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6"
              >
                <span className="pt-0.5 font-display text-2xl leading-none text-ink/60 italic tabular-nums transition-colors duration-300 group-hover:text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                  <h4 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {point.title}
                  </h4>
                  <span className="text-small text-fg-muted">{point.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/** 12. Testimonial (verified only), large italic serif on paper. Hidden until one exists. */
export function Testimonial() {
  const item = testimonial.item;
  if (!item) return null;
  return (
    <Section tone="paper" aria-labelledby="testimonial-heading">
      <h3 id="testimonial-heading" className="sr-only">
        {testimonial.heading}
      </h3>
      <Reveal>
        <figure className="flex flex-col gap-10">
          <blockquote className="max-w-[24ch] font-display text-h2 font-normal italic">
            “<PlaceholderText value={item.quote} />”
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <span aria-hidden className="size-11 shrink-0 rounded-full bg-ink/10" />
            <span className="flex flex-wrap gap-x-2 text-small text-ink-muted">
              <PlaceholderText value={item.name} className="font-semibold text-ink" />
              <PlaceholderText value={item.designation} />
              <PlaceholderText value={item.company} />
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

/** 13. Latest insights (up to three posts). Hidden until posts exist. */
export function LatestInsights({ posts }: { posts: readonly PostCardData[] }) {
  if (posts.length === 0) return null;
  return (
    <Section aria-labelledby="insights-heading">
      <SectionHeader id="insights-heading" heading={insights.heading} cta={insights.cta} />
      <Reveal>
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <li key={post.slug}>
              <PostCard post={post} index={i} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
