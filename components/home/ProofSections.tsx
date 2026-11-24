import Link from "next/link";
import { PlaceholderText } from "@/components/PlaceholderText";
import { PostCard, type PostCardData } from "@/components/insights/PostCard";
import { AsteriskIcon } from "@/components/icons";
import { ArrowCircle, Reveal, Section, SectionHeading } from "@/components/ui";
import { industries, insights, testimonial, whyChoose } from "@/content/home";
import { SectionHeader } from "@/components/sections/SectionHeader";

/** 10. Industries we serve. */
export function Industries() {
  return (
    <Section aria-labelledby="industries-heading">
      <SectionHeader
        id="industries-heading"
        heading={industries.heading}
        intro={industries.intro}
      />
      <Reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.items.map((name, i) => (
            <li
              key={name}
              className="group relative flex min-h-40 flex-col justify-between gap-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg-raised p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_30px_-18px_rgb(0_0_0/0.16)] transition-[border-color,translate,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-line-strong"
            >
              {/* Soft lime glow that rises from the bottom on hover. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative flex items-center justify-between">
                <span className="font-display text-lg text-fg-subtle italic tabular-nums transition-colors duration-300 group-hover:text-fg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <AsteriskIcon
                  size={16}
                  className="text-fg-subtle/60 transition-[rotate,color] duration-700 group-hover:rotate-90 group-hover:text-fg"
                />
              </span>
              <span className="relative font-display text-2xl font-semibold tracking-[-0.02em]">
                {name}
              </span>
            </li>
          ))}
          <li>
            <Link
              href={industries.cta.href}
              className="group flex h-full min-h-40 flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-accent/25 bg-accent/[0.06] p-6 transition-[background-color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/[0.1]"
            >
              <ArrowCircle />
              <span className="font-semibold">{industries.cta.label}</span>
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
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="why-heading" {...whyChoose.heading} headingClassName="max-w-[14ch]" />
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
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {point.title}
                  </h3>
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
      <h2 id="testimonial-heading" className="sr-only">
        {testimonial.heading}
      </h2>
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
