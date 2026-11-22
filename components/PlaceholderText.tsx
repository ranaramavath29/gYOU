import { isPlaceholder, SHOW_PLACEHOLDER_OUTLINE } from "@/lib/ph";

type Props = {
  value: string;
  as?: "span" | "p" | "strong";
  className?: string;
};

/**
 * Renders a content string. If it is a placeholder, it gets a
 * data-placeholder attribute in development, which globals.css draws
 * as a dashed outline so missing data is easy to spot.
 */
export function PlaceholderText({ value, as: Tag = "span", className }: Props) {
  const flagged = SHOW_PLACEHOLDER_OUTLINE && isPlaceholder(value);
  return (
    <Tag className={className} data-placeholder={flagged ? "" : undefined}>
      {value}
    </Tag>
  );
}
