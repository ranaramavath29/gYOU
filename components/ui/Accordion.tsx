import { PlusIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type AccordionItem = { question: string; answer: string };

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
};

/**
 * FAQ accordion built on native <details>/<summary>: keyboard operable
 * (Enter/Space), announced as expandable by screen readers, works without
 * JavaScript, and in-page search can open a closed answer.
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="smooth group border-b border-line">
          <summary
            className={cn(
              "flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5",
              "font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl",
              "transition-colors duration-300 group-open:text-accent hover:text-accent",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <span>{item.question}</span>
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-[rotate,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-ink group-hover:border-accent"
            >
              <PlusIcon size={16} />
            </span>
          </summary>
          <div className="max-w-[70ch] pr-14 pb-7 text-body text-fg-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
