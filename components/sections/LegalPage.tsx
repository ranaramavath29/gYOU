import type { ComponentType } from "react";
import { Container } from "@/components/ui";
import { legalLabels, legalPages, type LegalPageKey } from "@/content/legal";
import { uiLabels } from "@/content/navigation";
import { formatDate } from "@/lib/insights";
import { Breadcrumb } from "./Breadcrumb";

/** Renders an adviser-supplied legal MDX document with a consistent layout. */
export function LegalPage({ page, Content }: { page: LegalPageKey; Content: ComponentType }) {
  const meta = legalPages[page];
  return (
    <article aria-labelledby="legal-title" className="pt-6 pb-24 md:pt-10">
      <Container>
        <Breadcrumb
          label={uiLabels.breadcrumb}
          items={[{ label: uiLabels.home, href: "/" }]}
          current={meta.title}
          currentHref={`/${page}`}
        />
        <div className="mx-auto mt-10 max-w-[44rem] md:mt-14">
          <h1 id="legal-title" className="font-display text-h2 font-semibold">
            {meta.title}
          </h1>
          {meta.lastUpdated ? (
            <p className="mt-4 text-small text-fg-subtle">
              {legalLabels.lastUpdated}:{" "}
              <time dateTime={meta.lastUpdated}>{formatDate(meta.lastUpdated)}</time>
            </p>
          ) : null}
          <div className="mt-12 border-t border-line pt-10">
            <Content />
          </div>
        </div>
      </Container>
    </article>
  );
}
