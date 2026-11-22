/**
 * Placeholder helper.
 *
 * Every business fact we do not have yet (client names, numbers, phone,
 * address, testimonials) is written as ph("Short description") inside
 * /content. It returns a clearly marked string so it can never pass for
 * real data, and `npm run check:placeholders` can find every one.
 */

export const PLACEHOLDER_PREFIX = "[PLACEHOLDER: ";

declare const placeholderBrand: unique symbol;

/** A string that is known to be a placeholder. */
export type Placeholder = string & { readonly [placeholderBrand]: true };

export function ph(description: string): Placeholder {
  return `${PLACEHOLDER_PREFIX}${description}]` as Placeholder;
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX);
}

/** True when placeholders should be visibly outlined (development only). */
export const SHOW_PLACEHOLDER_OUTLINE = process.env.NODE_ENV !== "production";
