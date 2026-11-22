import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/insights/PostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryName } from "@/content/insights";
import { getPost, getPosts, postHref, toPostCard } from "@/lib/insights";
import { articleLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

// Basic metadata now; canonical, Open Graph and Article JSON-LD come in Phase 8.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: postHref(slug),
    type: "article",
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt,
    ogEyebrow: `Insights · ${categoryName(post.meta.category)}`,
    noindex: post.meta.draft,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Related: same category first, then the newest others; max 3.
  const others = (await getPosts()).filter((p) => p.slug !== slug);
  const related = [
    ...others.filter((p) => p.category === post.meta.category),
    ...others.filter((p) => p.category !== post.meta.category),
  ]
    .slice(0, 3)
    .map(toPostCard);

  return (
    <>
      <JsonLd
        data={articleLd({
          title: post.meta.title,
          description: post.meta.description,
          path: postHref(slug),
          author: post.meta.author,
          publishedAt: post.meta.publishedAt,
          updatedAt: post.meta.updatedAt,
          image: post.meta.cover?.src,
        })}
      />
      <PostPage meta={post.meta} Content={post.Content} related={related} />
    </>
  );
}
