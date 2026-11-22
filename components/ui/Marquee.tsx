import { AsteriskIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  /** Accessible name for the list, e.g. "Our services". */
  label: string;
  /** Slight rotation, as in the mockup's services band. */
  tilted?: boolean;
  className?: string;
};

function Row({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-[clamp(1.25rem,2.5vw,2.5rem)] pr-[clamp(1.25rem,2.5vw,2.5rem)]"
        >
          <span className="font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-semibold tracking-[-0.03em] whitespace-nowrap">
            {item}
          </span>
          <AsteriskIcon size={22} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Accent-colour band that scrolls its items (30s linear loop).
 * Pauses on hover; static under prefers-reduced-motion.
 * The duplicate row is aria-hidden so screen readers hear the list once.
 */
export function Marquee({ items, label, tilted = false, className }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden py-6", className)}>
      <div
        role="region"
        aria-label={label}
        className={cn("marquee bg-accent py-4 text-ink", tilted && "-mx-[5%] w-[110%] -rotate-2")}
      >
        <div className="marquee-track flex w-max animate-marquee">
          <Row items={items} />
          <Row items={items} hidden />
        </div>
      </div>
    </div>
  );
}
