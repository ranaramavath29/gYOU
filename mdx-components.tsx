import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Global MDX element styles (case study stories, Insights posts, legal pages).
 * Headings inside MDX start at h2: the page template owns the h1.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-14 mb-5 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em] first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-10 mb-4 font-display text-2xl font-semibold tracking-[-0.02em]"
        {...props}
      />
    ),
    p: (props) => <p className="mb-5 text-body text-fg-muted" {...props} />,
    ul: (props) => (
      <ul
        className="mb-6 list-disc space-y-2 pl-6 text-body text-fg-muted marker:text-accent"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-6 list-decimal space-y-2 pl-6 text-body text-fg-muted marker:text-fg-subtle"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-10 border-l-2 border-accent pl-6 font-display text-2xl text-fg italic"
        {...props}
      />
    ),
    code: (props) => (
      <code className="rounded bg-bg-raised-2 px-1.5 py-0.5 text-[0.9em]" {...props} />
    ),
    a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) =>
      href.startsWith("/") ? (
        <Link
          href={href}
          className="text-fg underline decoration-accent underline-offset-4"
          {...props}
        />
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg underline decoration-accent underline-offset-4"
          {...props}
        />
      ),
    ...components,
  };
}
