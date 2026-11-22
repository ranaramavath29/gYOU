import Link from "next/link";
import { MediaFrame, type MediaTint } from "@/components/ui";

/** Serializable card data, built by toCardData() in lib/caseStudies.ts. */
export type CaseStudyCardData = {
  slug: string;
  href: string;
  title: string;
  client: string;
  summary: string;
  industry: string;
  industryName: string;
  services: readonly string[];
  serviceNames: readonly string[];
  cover?: { src: string; alt: string };
  draft: boolean;
};

const tints: readonly MediaTint[] = ["olive", "rust", "navy", "graphite"];

/** Case study card for grids (Our Work, related work). */
export function CaseStudyCard({
  item,
  index = 0,
  headingLevel: Heading = "h3",
}: {
  item: CaseStudyCardData;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article>
      <Link href={item.href} className="group flex flex-col gap-5">
        <MediaFrame
          media={item.cover ? { kind: "image", ...item.cover } : undefined}
          placeholder={item.title}
          tint={tints[index % tints.length]}
          aspect="4/3"
          zoomOnHover
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        >
          {item.cover ? null : (
            <p className="mt-auto font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-tight font-semibold">
              {item.client}
            </p>
          )}
        </MediaFrame>
        <div className="flex flex-col gap-2">
          <p className="text-small text-fg-subtle">
            {item.industryName} · {item.serviceNames.join(" · ")}
            {item.draft ? " · Draft" : null}
          </p>
          <Heading className="font-display text-xl font-semibold">
            {item.client} — {item.title}
          </Heading>
          <p className="text-small text-fg-muted">{item.summary}</p>
        </div>
      </Link>
    </article>
  );
}
