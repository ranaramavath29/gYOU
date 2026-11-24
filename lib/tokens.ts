/**
 * Mirror of the colour tokens in app/globals.css, used by /styleguide to
 * show swatches and contrast ratios. Keep the two in sync.
 */
export const colorTokens = {
  bg: "#FBF7F0",
  "bg-raised": "#FFFFFF",
  "bg-raised-2": "#FFFFFF",
  fg: "#1D1B18",
  "fg-muted": "#5C5A55",
  "fg-subtle": "#67635B",
  line: "#EBE4D8",
  "line-strong": "#8A8174",
  accent: "#1F5FD1",
  "accent-hover": "#1A4FB0",
  "on-accent": "#FFFFFF",
  sage: "#5B6650",
  sky: "#A9C4F5",
  paper: "#F3ECE1",
  ink: "#1D1B18",
  "ink-muted": "#4D4A44",
  danger: "#B42318",
  "danger-on-paper": "#B42318",
} as const;

export type ColorToken = keyof typeof colorTokens;

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG 2.x contrast ratio between two hex colours. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}
