import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import type { NavLink } from "@/content/navigation";
import { breadcrumbLd } from "@/lib/jsonld";

type BreadcrumbProps = {
  label: string;
  /** Ancestors with links; the current page comes last without a link. */
  items: readonly NavLink[];
  current: string;
  /** Path of the current page. When given, BreadcrumbList JSON-LD is emitted. */
  currentHref?: string;
};

/** Breadcrumb trail with matching BreadcrumbList structured data. */
export function Breadcrumb({ label, items, current, currentHref }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      {currentHref ? (
        <JsonLd data={breadcrumbLd([...items, { label: current, href: currentHref }])} />
      ) : null}
      <ol className="flex flex-wrap items-center gap-x-2 text-small text-fg-subtle">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-fg">
              {item.label}
            </Link>
            <span aria-hidden>/</span>
          </li>
        ))}
        <li aria-current="page" className="text-fg-muted">
          {current}
        </li>
      </ol>
    </nav>
  );
}
