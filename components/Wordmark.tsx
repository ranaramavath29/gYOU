import { LogoMark } from "@/components/LogoMark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isPlaceholder, SHOW_PLACEHOLDER_OUTLINE } from "@/lib/ph";

/**
 * gYOU logo: the brand icon (components/LogoMark.tsx) plus the "gYOU"
 * wordmark in Playfair Display SemiBold (lowercase g, uppercase YOU).
 * Size it with a text-[...] class; the icon scales with the font size.
 * If site.logo is ever set back to a placeholder, it is flagged with the
 * dev-only dashed outline.
 */
export function Wordmark({ className }: { className?: string }) {
  const pending = isPlaceholder(site.logo);
  return (
    <span
      className={cn(
        "group/logo inline-flex items-center gap-[0.36em] text-[1.375rem] leading-none",
        className,
      )}
      data-placeholder={SHOW_PLACEHOLDER_OUTLINE && pending ? "" : undefined}
      title={SHOW_PLACEHOLDER_OUTLINE && pending ? site.logo : undefined}
    >
      <LogoMark className="h-[1.15em] w-auto shrink-0 drop-shadow-[0_0_10px_rgb(180_253_16/0.25)] transition-[rotate,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:rotate-[18deg] group-hover/logo:drop-shadow-[0_0_14px_rgb(180_253_16/0.45)]" />
      <span className="font-display font-semibold tracking-[-0.03em] text-fg">{site.name}</span>
    </span>
  );
}
