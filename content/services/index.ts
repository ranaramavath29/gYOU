/**
 * The four service categories and routes, from the strategy brief (§4, §5).
 * Full page content for each service lives next to this file
 * (content/services/<slug>.ts), collected in ./pages.ts.
 *
 * Order matters: it drives the marquee, homepage list, footer and /services.
 * Website building and marketing lead, per gYOU's direction (PAUSE 4).
 */
export type ServiceSummary = {
  slug: string;
  name: string;
  /** Short label for tight spaces such as the marquee band. */
  shortName: string;
  /** One-line description for cards and meta descriptions (working copy). */
  summary: string;
  /** Three short tags drawn from the brief's deliverables list. */
  highlights: readonly [string, string, string];
};

export const services = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    shortName: "Websites",
    summary: "Websites and landing pages designed to turn visitors into enquiries.",
    highlights: ["UI/UX", "Landing pages", "Development"],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    shortName: "Performance",
    summary: "Meta Ads and Google Ads campaigns planned and refined around business outcomes.",
    highlights: ["Meta Ads", "Google Ads", "Retargeting"],
  },
  {
    slug: "seo-content-marketing",
    name: "SEO & Content Marketing",
    shortName: "SEO & Content",
    summary: "Technical SEO, local search and useful content that help customers find you.",
    highlights: ["Technical SEO", "Local SEO", "Blogs"],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "Social Media",
    summary: "Strategy, content and community management for a consistent social presence.",
    highlights: ["Strategy", "Content calendars", "Reels"],
  },
] as const satisfies readonly ServiceSummary[];

export type ServiceSlug = (typeof services)[number]["slug"];

/**
 * Search-focused page titles (Phase 8). The location is appended at render,
 * e.g. "Performance Marketing Agency in Hyderabad". Based on the brief's
 * initial keyword ideas (§9); validate search volumes before launch.
 */
export const serviceSeoTitles: Record<ServiceSlug, string> = {
  "website-design-development": "Website Design & Development Company",
  "performance-marketing": "Performance Marketing Agency",
  "seo-content-marketing": "SEO & Content Marketing Services",
  "social-media-marketing": "Social Media Marketing Agency",
};

export const serviceHref = (slug: string) => `/services/${slug}`;

export function serviceBySlug(slug: ServiceSlug) {
  return services.find((s) => s.slug === slug)!;
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return services.some((s) => s.slug === value);
}
