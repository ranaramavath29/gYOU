/** Canonical site origin, from NEXT_PUBLIC_SITE_URL (see .env.example). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rozento.in").replace(
  /\/$/,
  "",
);

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
