/**
 * True only for the live site. Vercel sets VERCEL_ENV=production on production
 * deployments; NEXT_PUBLIC_SITE_ENV=production does the same on other hosts.
 * Everything else (local, previews, staging) is noindex and has no sitemap entries.
 */
export const IS_PRODUCTION_SITE =
  process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_SITE_ENV === "production";
