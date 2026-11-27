import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import { Container } from "@/components/ui";
import { legalLabels, legalPages, type LegalPageKey } from "@/content/legal";
import { uiLabels } from "@/content/navigation";
import { site } from "@/content/site";
import { mailHref } from "@/lib/contact";
import { formatDate } from "@/lib/insights";
import { Breadcrumb } from "./Breadcrumb";

// Document sections sit under the page's one H2, so MDX ## renders as H3 and ### as H4.
const legalHeadings: MDXComponents = {
  h2: (props) => (
    <h3
      className="mt-14 mb-5 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em] first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h4 className="mt-10 mb-4 font-display text-2xl font-semibold tracking-[-0.02em]" {...props} />
  ),
};

/** Renders an adviser-supplied legal MDX document with a consistent layout. */
export function LegalPage({
  page,
  Content,
}: {
  page: LegalPageKey;
  Content: ComponentType<{ components?: MDXComponents }>;
}) {
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
            {meta.pending ? (
              // Approved text not supplied yet: show an honest notice, never the placeholder.
              <div
                role="status"
                className="rounded-[var(--radius-card)] border border-accent/30 bg-accent/[0.05] p-6 md:p-8"
              >
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  {legalLabels.pendingTitle}
                </h2>
                <p className="mt-3 text-fg-muted">{legalLabels.pendingBody}</p>
                <a
                  href={mailHref(site.email)}
                  className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {site.email}
                </a>
              </div>
            ) : (
              <>
                <h2 className="mb-10 font-display text-2xl font-semibold tracking-[-0.02em]">
                  {meta.summaryHeading}
                </h2>
                <Content components={legalHeadings} />
              </>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
