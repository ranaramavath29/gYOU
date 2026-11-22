import type { MetadataRoute } from "next";
import { IS_PRODUCTION_SITE } from "@/lib/env";
import { absoluteUrl } from "@/lib/siteUrl";

/** Production: crawl everything except internal pages. Everywhere else: crawl nothing. */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    // /og stays crawlable so LinkedIn, Facebook and X can fetch share images.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/styleguide", "/thank-you"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
