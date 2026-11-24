import type { ServiceSlug } from "./index";
import { performanceMarketing } from "./performance-marketing";
import { seoContentMarketing } from "./seo-content-marketing";
import { socialMediaMarketing } from "./social-media-marketing";
import type { ServicePageContent } from "./types";
import { websiteDesignDevelopment } from "./website-design-development";

/**
 * Every service page, keyed by slug. Record<ServiceSlug, …> makes the build
 * fail if a service from content/services/index.ts has no page content.
 * To hold a service back at launch (PAUSE 4), remove it from the services list.
 */
export const servicePages: Record<ServiceSlug, ServicePageContent> = {
  "social-media-marketing": socialMediaMarketing,
  "seo-content-marketing": seoContentMarketing,
  "performance-marketing": performanceMarketing,
  "website-design-development": websiteDesignDevelopment,
};
