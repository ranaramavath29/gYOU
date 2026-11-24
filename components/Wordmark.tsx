import Image from "next/image";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isPlaceholder, SHOW_PLACEHOLDER_OUTLINE } from "@/lib/ph";

/**
 * The supplied full logo is used when configured; the SVG mark and text
 * remain available for the wordmark setting and placeholder previews.
 */
export function Wordmark({ className }: { className?: string }) {
  const pending = isPlaceholder(site.logo);
  const imageSrc = site.logo !== "wordmark" && !pending ? site.logo : undefined;
  return (
    <span
      className={cn(
        "group/logo inline-flex items-center gap-[0.36em] text-[1.375rem] leading-none",
        className,
      )}
      data-placeholder={SHOW_PLACEHOLDER_OUTLINE && pending ? "" : undefined}
      title={SHOW_PLACEHOLDER_OUTLINE && pending ? site.logo : undefined}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={381}
          height={101}
          loading="eager"
          className="h-[1.65em] w-auto shrink-0 object-contain transition-opacity duration-200 group-hover/logo:opacity-85"
        />
      ) : (
        <>
          <LogoMark className="h-[1.15em] w-auto shrink-0 drop-shadow-[0_0_10px_rgb(180_253_16/0.25)] transition-[rotate,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:rotate-[18deg] group-hover/logo:drop-shadow-[0_0_14px_rgb(180_253_16/0.45)]" />
          <span className="font-display font-semibold tracking-[-0.03em] text-fg">{site.name}</span>
        </>
      )}
    </span>
  );
}
