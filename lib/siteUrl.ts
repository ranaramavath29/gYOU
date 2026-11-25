import { site } from "@/content/site";

/**
 * Canonical site origin. NEXT_PUBLIC_SITE_URL wins (set it on the host to the
 * primary domain); otherwise https://<site.domain>, so canonicals, Open Graph,
 * JSON-LD and the sitemap never point at another domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  "",
);

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
