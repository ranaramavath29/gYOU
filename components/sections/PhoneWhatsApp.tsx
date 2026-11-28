import { ChatIcon, PhoneIcon } from "@/components/icons";
import { uiLabels } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isSameNumber, telHref, whatsappHref } from "@/lib/contact";

type Variant = "pills" | "buttons";

type Props = {
  /** "pills": compact chips, 44px tall (footer, CTA). "buttons": larger 48px buttons (contact page, menu). */
  variant?: Variant;
  /** Show the number above the actions. */
  showNumber?: boolean;
  /** Pre-filled WhatsApp message. */
  message?: string;
  className?: string;
  location?: string;
  /** Number and actions on one line (wraps on narrow screens). */
  inline?: boolean;
  /** Extra classes for the number (e.g. a smaller size in tight spaces). */
  numberClassName?: string;
};

const styles: Record<Variant, { call: string; wa: string }> = {
  pills: {
    call: "min-h-11 gap-1.5 border border-line-strong px-3.5 text-small font-semibold text-fg hover:border-fg hover:bg-ink/5",
    wa: "min-h-11 gap-1.5 bg-accent px-3.5 text-small font-semibold text-on-accent hover:bg-accent-hover",
  },
  buttons: {
    call: "min-h-12 gap-2 border border-line-strong px-5 text-sm font-semibold text-fg hover:border-fg hover:bg-ink/5",
    wa: "min-h-12 gap-2 bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-hover",
  },
};

/**
 * One block for the phone and WhatsApp number when they are the same:
 * the number once, with "Call" and "WhatsApp" actions side by side.
 * Returns null when the numbers differ (callers then show them separately)
 * or are still placeholders.
 */
export function PhoneWhatsApp({
  variant = "pills",
  showNumber = true,
  message,
  className,
  location,
  inline = false,
  numberClassName,
}: Props) {
  if (!isSameNumber(site.phone, site.whatsapp)) return null;
  const tel = telHref(site.phone);
  const wa = whatsappHref(site.whatsapp, message);
  if (!tel || !wa) return null;
  const s = styles[variant];
  const base =
    "inline-flex items-center justify-center rounded-full transition-colors active:scale-[0.97]";

  return (
    <div
      className={cn(
        inline ? "flex flex-wrap items-center gap-3" : "flex flex-col gap-3",
        className,
      )}
      data-track-location={location}
    >
      {showNumber ? (
        <a
          href={tel}
          className={cn(
            "inline-flex min-h-11 w-fit items-center font-semibold text-fg tabular-nums hover:text-fg-muted",
            numberClassName,
          )}
        >
          {site.phone}
        </a>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <a href={tel} className={cn(base, s.call)} aria-label={`${uiLabels.call} ${site.phone}`}>
          <PhoneIcon size={variant === "pills" ? 14 : 16} />
          {uiLabels.call}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(base, s.wa)}
          aria-label={`${uiLabels.whatsappShort} ${site.whatsapp}`}
        >
          <ChatIcon size={variant === "pills" ? 14 : 16} />
          {uiLabels.whatsappShort}
        </a>
      </div>
    </div>
  );
}
