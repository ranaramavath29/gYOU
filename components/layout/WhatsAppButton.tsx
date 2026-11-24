"use client";

import { usePathname } from "next/navigation";
import { ChatIcon } from "@/components/icons";
import { whatsappMessages } from "@/content/forms";
import { uiLabels } from "@/content/navigation";
import { isServiceSlug, serviceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/contact";
import { SHOW_PLACEHOLDER_OUTLINE } from "@/lib/ph";

const classes =
  "fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-accent text-ink shadow-[0_12px_30px_-8px_rgb(0_0_0/0.2)] transition-transform hover:scale-105 md:right-8 md:bottom-8";

/** Pre-filled message for the current page (service pages name the service). */
function messageFor(pathname: string): string {
  const match = /^\/services\/([^/]+)/.exec(pathname);
  if (match?.[1] && isServiceSlug(match[1])) {
    return whatsappMessages.service(serviceBySlug(match[1]).name);
  }
  if (pathname.startsWith("/contact")) return whatsappMessages.contact;
  return whatsappMessages.default;
}

/**
 * Floating WhatsApp button with a page-specific pre-filled message.
 * Clicks are tracked by the global click listener (wa.me links).
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const href = whatsappHref(site.whatsapp, messageFor(pathname));

  if (!href) {
    return (
      <span
        role="img"
        aria-label={`${uiLabels.whatsapp}: ${site.whatsapp}`}
        title={site.whatsapp}
        data-placeholder={SHOW_PLACEHOLDER_OUTLINE ? "" : undefined}
        className={cn(classes, "cursor-not-allowed")}
      >
        <ChatIcon size={26} />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={uiLabels.whatsapp}
      data-track-location="floating-button"
      className={classes}
    >
      <ChatIcon size={26} />
    </a>
  );
}
