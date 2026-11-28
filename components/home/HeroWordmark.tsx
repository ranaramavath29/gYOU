import { LOGO_ARROW_PATH, LOGO_WORD_PATH, LOGO_WORD_VIEWBOX } from "@/components/brand/logoPaths";
import { cn } from "@/lib/cn";

/** Letters and arrow as one shape, so both get the same pressed finish. */
const MARK = `${LOGO_WORD_PATH} ${LOGO_ARROW_PATH}`;

/**
 * Decorative hero backdrop: the gYOU logo (letters and arrow) set huge along
 * the bottom edge and pressed into the ink panel: a soft shadow below, a faint
 * highlight on the top edge and a soft face that fades gently downwards. It
 * rises behind the hero copy, so keep it faint. aria-hidden throughout.
 *
 * Performance: the shape is defined once and reused with <use>. The slow light
 * sweep is a separate SVG on its own layer, so only the band repaints, never
 * the blurred letterpress (and inline SVG is never counted as the LCP image). It is hidden under prefers-reduced-motion.
 */
export function HeroWordmark({ className }: { className?: string }) {
  return (
    <>
      <svg
        aria-hidden
        focusable="false"
        viewBox={LOGO_WORD_VIEWBOX}
        preserveAspectRatio="xMidYMax meet"
        className={cn("pointer-events-none", className)}
      >
        <defs>
          <path id="hw-mark" d={MARK} />
          <linearGradient id="hw-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.09" />
            <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.045" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.015" />
          </linearGradient>
          <linearGradient id="hw-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>
          <filter id="hw-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Letterpress: dark shadow below, faint highlight above, then the face. */}
        <use
          href="#hw-mark"
          fillRule="evenodd"
          fill="#000"
          opacity="0.35"
          transform="translate(0 14)"
          filter="url(#hw-soft)"
        />
        <use
          href="#hw-mark"
          fillRule="evenodd"
          fill="#ffffff"
          opacity="0.05"
          transform="translate(0 -6)"
        />
        <use
          href="#hw-mark"
          fillRule="evenodd"
          fill="url(#hw-face)"
          stroke="url(#hw-edge)"
          strokeWidth="3"
        />
      </svg>

      {/* Light sweep: a separate SVG (own layer) that reuses the shape as a mask.
          Inline vector SVG is never an LCP candidate, unlike a CSS mask image. */}
      <svg
        aria-hidden
        focusable="false"
        viewBox={LOGO_WORD_VIEWBOX}
        preserveAspectRatio="xMidYMax meet"
        className={cn("hero-sheen-layer pointer-events-none motion-reduce:hidden", className)}
      >
        <defs>
          <linearGradient id="hw-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8dce6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#b8dce6" stopOpacity="0.16" />
            <stop offset="1" stopColor="#b8dce6" stopOpacity="0" />
          </linearGradient>
          <mask id="hw-sheen-mask" maskUnits="userSpaceOnUse">
            <use href="#hw-mark" fill="#fff" fillRule="evenodd" />
          </mask>
        </defs>
        <g mask="url(#hw-sheen-mask)">
          <rect
            className="hero-sheen"
            x="-900"
            y="0"
            width="900"
            height="1500"
            fill="url(#hw-sheen)"
          />
        </g>
      </svg>
    </>
  );
}
