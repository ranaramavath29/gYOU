"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { ourWork } from "@/content/caseStudies";
import { cn } from "@/lib/cn";
import { CaseStudyCard, type CaseStudyCardData } from "./CaseStudyCard";

type Option = { value: string; label: string };

type Props = {
  items: readonly CaseStudyCardData[];
  industries: readonly Option[];
  services: readonly Option[];
};

/**
 * Portfolio grid with industry and service filters. Filter state lives in the
 * URL (?industry=…&service=…) so filtered views can be shared and survive
 * reloads. Filters are toggle buttons (aria-pressed); the result count is
 * announced politely to screen readers.
 */
export function OurWorkGrid({ items, industries, services }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const industry = searchParams.get("industry") ?? "";
  const service = searchParams.get("service") ?? "";

  const setFilter = (key: "industry" | "service", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filtered = items.filter(
    (item) =>
      (!industry || item.industry === industry) && (!service || item.services.includes(service)),
  );

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 border-y border-line py-6">
        <FilterGroup
          label={ourWork.filters.industry}
          options={industries}
          value={industry}
          onChange={(v) => setFilter("industry", v)}
        />
        <FilterGroup
          label={ourWork.filters.service}
          options={services}
          value={service}
          onChange={(v) => setFilter("service", v)}
        />
        <div className="flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-small text-fg-subtle">
            {ourWork.filters.results(filtered.length)}
          </p>
          {industry || service ? (
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="inline-flex min-h-11 items-center text-small font-semibold underline underline-offset-4"
            >
              {ourWork.filters.clear}
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <li key={item.slug}>
              <CaseStudyCard item={item} index={i} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-fg-muted">{ourWork.filters.none}</p>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const all: Option = { value: "", label: ourWork.filters.all };
  return (
    <div
      role="group"
      aria-labelledby={id}
      className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6"
    >
      <span id={id} className="w-20 shrink-0 text-small font-semibold text-fg-subtle">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {[all, ...options].map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                active
                  ? "border-accent bg-accent text-ink"
                  : "border-line bg-bg-raised-2 text-fg hover:border-fg-subtle",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
