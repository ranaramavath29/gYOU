"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * One document-level click listener instead of handlers on every link:
 * - tel:      → phone_click
 * - mailto:   → email_click
 * - wa.me     → whatsapp_click
 * - /contact  → cta_click (primary CTA and nav CTA both lead there)
 * `location` comes from the nearest data-track-location, else the page path.
 */
export function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") ?? "";
      const location =
        link.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? pathname;

      if (href.startsWith("tel:")) track("phone_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (href.startsWith("https://wa.me/")) track("whatsapp_click", { location });
      else if (href.startsWith("/contact")) {
        track("cta_click", { label: link.textContent?.trim().slice(0, 80) ?? "", location });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  return null;
}
