import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isPlaceholder, SHOW_PLACEHOLDER_OUTLINE } from "@/lib/ph";

/**
 * Text wordmark ("gYOU" + accent asterisk, as in the mockup), approved
 * as gYOU's official logo. If site.logo is ever set back to a
 * placeholder, it is flagged with the dev-only dashed outline.
 */
export function Wordmark({ className }: { className?: string }) {
  const pending = isPlaceholder(site.logo);
  return (
    <span
      className={cn(
        "inline-flex font-display text-[1.375rem] leading-none font-semibold tracking-[-0.03em]",
        className,
      )}
      data-placeholder={SHOW_PLACEHOLDER_OUTLINE && pending ? "" : undefined}
      title={SHOW_PLACEHOLDER_OUTLINE && pending ? site.logo : undefined}
    >
      {site.name}
      <span aria-hidden className="-mt-0.5 ml-px text-[0.8em] text-accent">
        *
      </span>
    </span>
  );
}
