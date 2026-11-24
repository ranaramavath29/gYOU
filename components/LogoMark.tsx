/**
 * gYOU brand icon, traced from the supplied artwork (pixel-sampled and
 * overlay-checked): a lime ">" with a stem from the top, a lime arrow rising
 * from below, and a white "<" chevron. Colours sampled from the artwork.
 * Decorative: the wordmark text next to it carries the name.
 */
export const LOGO_LIME = "#B4FD10";
export const LOGO_WHITE = "#0C0C0B";

/** Shared geometry, also used by app/icon.svg and app/apple-icon.tsx. */
export const LOGO_VIEWBOX = "33 75 368 340";
export const LOGO_PATHS = {
  lime: [
    "M83 152 L229 212 L62 303", // ">" arms
    "M249 104 L229 210", // stem from the top
    "M229 386 L243 293 L298 320", // arrow rising from below
  ],
  white: "M370 167 L291 236 L362 301", // "<" chevron
} as const;

export function LogoMark({
  className,
  width,
  height,
}: {
  className?: string;
  /** Explicit size, for contexts without CSS classes (e.g. the OG image). */
  width?: number;
  height?: number;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      aria-hidden
      focusable="false"
      className={className}
      width={width}
      height={height}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={54}
    >
      <g stroke={LOGO_LIME}>
        {LOGO_PATHS.lime.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d={LOGO_PATHS.white} stroke={LOGO_WHITE} />
    </svg>
  );
}
