import Link from "next/link";
import { MediaFrame, type MediaTint } from "@/components/ui";

/** Serializable post card data, built by toPostCard() in lib/insights.ts. */
export type PostCardData = {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  date: string;
  isoDate: string;
  readingTime: string;
  cover?: { src: string; alt: string };
  draft: boolean;
};

const tints: readonly MediaTint[] = ["graphite", "olive", "navy", "rust"];

export function PostCard({
  post,
  index = 0,
  headingLevel: Heading = "h3",
}: {
  post: PostCardData;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article>
      <Link href={post.href} className="group flex flex-col gap-5">
        <MediaFrame
          media={post.cover ? { kind: "image", ...post.cover } : undefined}
          placeholder={post.title}
          tint={tints[index % tints.length]}
          aspect="16/9"
          zoomOnHover
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        >
          {post.cover ? null : (
            <p className="mt-auto text-small font-semibold tracking-[0.12em] text-fg-subtle uppercase">
              {post.categoryName}
            </p>
          )}
        </MediaFrame>
        <div className="flex flex-col gap-2">
          <p className="text-small text-fg-subtle">
            {post.categoryName} · <time dateTime={post.isoDate}>{post.date}</time> ·{" "}
            {post.readingTime}
            {post.draft ? " · Draft" : null}
          </p>
          <Heading className="font-display text-xl font-semibold">{post.title}</Heading>
          <p className="text-small text-fg-muted">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}
