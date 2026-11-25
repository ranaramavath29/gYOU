import type { MetadataRoute } from "next";
import { services, serviceHref } from "@/content/services";
import { getCaseStudies, caseStudyHref } from "@/lib/caseStudies";
import { IS_PRODUCTION_SITE } from "@/lib/env";
import { getPosts, postHref } from "@/lib/insights";
import { absoluteUrl } from "@/lib/siteUrl";

/**
 * XML sitemap. Excludes /styleguide, /thank-you and drafts. /our-work and
 * /insights are listed only once they have published content (until then they
 * are noindex). Non-production deployments return an empty sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!IS_PRODUCTION_SITE) return [];

  const [caseStudies, posts] = await Promise.all([getCaseStudies(), getPosts()]);
  const published = {
    caseStudies: caseStudies.filter((c) => !c.draft),
    posts: posts.filter((p) => !p.draft),
  };

  const entry = (
    path: string,
    priority: number,
    lastModified?: string,
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...services.map((s) => entry(serviceHref(s.slug), 0.9)),
    entry("/about-us", 0.7),
    entry("/industries", 0.7),
    entry("/contact", 0.8),
    ...(published.caseStudies.length
      ? [
          entry("/our-work", 0.8),
          ...published.caseStudies.map((c) => entry(caseStudyHref(c.slug), 0.7, c.publishedAt)),
        ]
      : []),
    ...(published.posts.length
      ? [
          entry("/insights", 0.7),
          ...published.posts.map((p) => entry(postHref(p.slug), 0.6, p.updatedAt ?? p.publishedAt)),
        ]
      : []),
    entry("/privacy-policy", 0.2),
    entry("/terms-and-conditions", 0.2),
  ];
}
