import type { Metadata } from "next";
import { Suspense } from "react";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { PostCard } from "@/components/insights/PostCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { Button, Section } from "@/components/ui";
import { insightCategories, insightsCopy as copy } from "@/content/insights";
import { uiLabels } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPosts, toPostCard } from "@/lib/insights";

export async function generateMetadata(): Promise<Metadata> {
  const hasPosts = (await getPosts()).length > 0;
  return {
    ...buildMetadata({
      title: copy.metaTitle,
      description: copy.metaDescription,
      path: "/insights",
    }),
    // Keep the empty page out of search until a post is published.
    ...(hasPosts ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function InsightsPage() {
  const posts = (await getPosts()).map(toPostCard);
  const categories = insightCategories
    .filter((c) => posts.some((p) => p.category === c.slug))
    .map((c) => ({ value: c.slug, label: c.name }));
  const empty = posts.length === 0;

  return (
    <>
      <PageHero
        id="insights-title"
        heading={empty ? copy.empty.heading : copy.heading}
        supporting={empty ? copy.empty.body : copy.supporting}
        breadcrumb={{
          label: uiLabels.breadcrumb,
          items: [{ label: uiLabels.home, href: "/" }],
          current: copy.metaTitle,
          currentHref: "/insights",
        }}
        actions={
          empty ? (
            <>
              <Button href={copy.empty.primary.href} variant="solid" size="lg">
                {copy.empty.primary.label}
              </Button>
              <Button href={copy.empty.secondary.href} variant="outline" size="lg">
                {copy.empty.secondary.label}
              </Button>
            </>
          ) : undefined
        }
      />

      {empty ? null : (
        <Section
          aria-label={copy.metaTitle}
          spacing="none"
          className="pb-[clamp(4.5rem,2.9rem+5vw,8.5rem)]"
        >
          {/* Fallback = full list, so server HTML and no-JS visitors get every post. */}
          <Suspense
            fallback={
              <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                  <li key={p.slug}>
                    <PostCard post={p} index={i} headingLevel="h2" />
                  </li>
                ))}
              </ul>
            }
          >
            <InsightsGrid posts={posts} categories={categories} />
          </Suspense>
        </Section>
      )}

      <FinalCta form="insights" page="/insights" />
    </>
  );
}
