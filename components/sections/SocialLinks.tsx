import type { ComponentType } from "react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { uiLabels } from "@/content/navigation";
import { site, type SocialPlatform } from "@/content/site";
import { cn } from "@/lib/cn";
import { isPlaceholder } from "@/lib/ph";

const icons: Record<SocialPlatform, ComponentType<{ size?: number }>> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
};

type SocialLinksProps = {
  /** "light" for cream pages, "dark" for ink panels. */
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
};

/**
 * gYOU's social profiles (content/site.ts → socials) as round icon links.
 * Each link opens in a new tab and has a full screen-reader label.
 */
export function SocialLinks({ tone = "light", size = "md", className }: SocialLinksProps) {
  if (isPlaceholder(site.socials) || site.socials.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {site.socials.map((s) => {
        const Icon = icons[s.platform];
        return (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={uiLabels.socialLink(site.name, s.label)}
              title={s.label}
              className={cn(
                "grid place-items-center rounded-full border transition-[background-color,border-color,color,translate] duration-300 hover:-translate-y-0.5",
                size === "lg" ? "size-12" : "size-11",
                tone === "dark"
                  ? "border-bg/20 text-bg hover:border-accent hover:bg-accent hover:text-on-accent"
                  : "border-line bg-bg-raised text-ink hover:border-accent hover:bg-accent hover:text-on-accent",
              )}
            >
              <Icon size={size === "lg" ? 20 : 18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
