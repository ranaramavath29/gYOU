"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { insightsCopy as copy } from "@/content/insights";
import { cn } from "@/lib/cn";
import { PostCard, type PostCardData } from "./PostCard";

type Props = {
  posts: readonly PostCardData[];
  categories: ReadonlyArray<{ value: string; label: string }>;
};

/** Insights index with a category filter kept in the URL (?category=…). */
export function InsightsGrid({ posts, categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const labelId = useId();
  const category = searchParams.get("category") ?? "";

  const select = (value: string) =>
    router.replace(value ? `${pathname}?category=${encodeURIComponent(value)}` : pathname, {
      scroll: false,
    });

  const filtered = posts.filter((p) => !category || p.category === category);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 border-y border-line py-6 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-labelledby={labelId}
          className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6"
        >
          <span id={labelId} className="text-small font-semibold text-fg-subtle">
            {copy.filterLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {[{ value: "", label: copy.all }, ...categories].map((option) => {
              const active = category === option.value;
              return (
                <button
                  key={option.value || "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(option.value)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                    active
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line bg-bg-raised-2 text-fg hover:border-fg-subtle",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <p aria-live="polite" className="text-small text-fg-subtle">
          {copy.results(filtered.length)}
        </p>
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <li key={post.slug}>
              <PostCard post={post} index={i} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-fg-muted">{copy.none}</p>
      )}
    </div>
  );
}
