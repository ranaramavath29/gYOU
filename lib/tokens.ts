/**
 * Mirror of the colour tokens in app/globals.css, used by /styleguide to
 * show swatches and contrast ratios. Keep the two in sync.
 */
export const colorTokens = {
  bg: "#0C0C0B",
  "bg-raised": "#141413",
  "bg-raised-2": "#1C1C1A",
  fg: "#F2F0EA",
  "fg-muted": "#BDBBB2",
  "fg-subtle": "#A9A79F",
  line: "#2A2A27",
  "line-strong": "#3A3A36",
  accent: "#D6FF5C",
  paper: "#F2F0EA",
  ink: "#0C0C0B",
  "ink-muted": "#45443E",
  danger: "#FF8F80",
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
