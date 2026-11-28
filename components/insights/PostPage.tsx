import Image from "next/image";
import type { ComponentType } from "react";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Container, Pill, Section } from "@/components/ui";
import { categoryName, insightsCopy as copy } from "@/content/insights";
import { uiLabels } from "@/content/navigation";
import { formatDate, postHref, type PostMeta } from "@/lib/insights";
import { absoluteUrl } from "@/lib/siteUrl";
import { PostCard, type PostCardData } from "./PostCard";

type Props = { meta: PostMeta; Content: ComponentType; related: readonly PostCardData[] };

function shareLinks(title: string, url: string) {
  const u = encodeURIComponent(url);
  return [
    {
      label: copy.share.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { label: copy.share.facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    {
      label: copy.share.whatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];
}

/** Insights post: category, title, author, date, reading time, body, share links, related posts. */
export function PostPage({ meta, Content, related }: Props) {
  const url = absoluteUrl(postHref(meta.slug));
  return (
    <>
      {meta.draft ? (
        <p
          role="note"
          className="bg-accent px-5 py-2 text-center text-small font-semibold text-on-accent"
        >
          {copy.draftBanner}
        </p>
      ) : null}

      <article aria-labelledby="post-title">
        <header className="pt-6 pb-10 md:pt-10 md:pb-12">
          <Container>
            <Breadcrumb
              label={uiLabels.breadcrumb}
              items={[
                { label: uiLabels.home, href: "/" },
                { label: copy.breadcrumbInsights, href: "/insights" },
              ]}
              current={meta.title}
              currentHref={postHref(meta.slug)}
            />
            <div className="mx-auto mt-10 flex max-w-[52rem] flex-col gap-6 md:mt-14">
              <Pill dot variant="chip">
                {categoryName(meta.category)}
              </Pill>
              <h1 id="post-title" className="font-display text-h2 font-semibold text-balance">
                {meta.title}
              </h1>
              <p className="text-body text-fg-muted">{meta.description}</p>
              <p className="text-small text-fg-subtle">
                {copy.by} {meta.author} · {copy.publishedOn}{" "}
                <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time> ·{" "}
                {copy.readingTime(meta.readingMinutes)}
              </p>
            </div>
            {meta.cover ? (
              <div className="relative mx-auto mt-12 aspect-[16/9] max-w-[64rem] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src={meta.cover.src}
                  alt={meta.cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </Container>
        </header>

        <Container className="border-t border-line py-12 md:py-16">
          <div className="mx-auto max-w-[44rem]">
            <Content />
            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8">
              <h2 className="text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                {copy.shareHeading}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {shareLinks(meta.title, url).map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold hover:border-fg-subtle"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <Section aria-labelledby="post-related" className="border-t border-line">
          <SectionHeader id="post-related" heading={copy.relatedHeading} />
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <li key={p.slug}>
                <PostCard post={p} index={i} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <FinalCta
        heading={copy.cta.heading}
        supporting={copy.cta.supporting}
        form={`insight-${meta.slug}`}
        page={postHref(meta.slug)}
      />
    </>
  );
}
