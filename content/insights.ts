import { ctas } from "./home";

/** Insights (blog) categories, from the brief §6 Section 11 topics. */
export const insightCategories = [
  { slug: "websites", name: "Websites" },
  { slug: "digital-marketing", name: "Digital Marketing" },
  { slug: "performance-marketing", name: "Performance Marketing" },
  { slug: "seo", name: "SEO" },
  { slug: "social-media", name: "Social Media" },
  { slug: "branding", name: "Branding" },
  { slug: "business-growth", name: "Business Growth" },
] as const;

export type InsightCategorySlug = (typeof insightCategories)[number]["slug"];

export const insightCategorySlugs = insightCategories.map((c) => c.slug) as [
  InsightCategorySlug,
  ...InsightCategorySlug[],
];

export function categoryName(slug: InsightCategorySlug): string {
  return insightCategories.find((c) => c.slug === slug)!.name;
}

/** Copy for /insights and the post template. Working copy. */
export const insightsCopy = {
  heading: { lead: "Insights", accent: "& Ideas" },
  supporting:
    "Practical thinking on websites, digital marketing and business growth from the gYOU team.",
  defaultAuthor: "gYOU Team",
  filterLabel: "Category",
  all: "All",
  results: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
  none: "No articles in this category yet.",
  readingTime: (minutes: number) => `${minutes} min read`,
  publishedOn: "Published",
  by: "By",
  shareHeading: "Share this article",
  share: { linkedin: "LinkedIn", x: "X", facebook: "Facebook", whatsapp: "WhatsApp" },
  relatedHeading: { lead: "Related", accent: "Reading" },
  draftBanner: "Draft preview. Drafts are never shown on the live site.",
  breadcrumbInsights: "Insights",
  empty: {
    heading: { lead: "Insights", accent: "Coming Soon" },
    body: "We’re preparing practical articles on websites, digital marketing and growth. In the meantime, explore our services or tell us about your project.",
    primary: ctas.primary,
    secondary: ctas.services,
  },
  cta: {
    heading: { lead: "Want Help Putting This", accent: "Into Practice?" },
    supporting: "Tell us about your business and we’ll suggest where to start.",
  },
  metaTitle: "Insights",
  metaDescription:
    "Articles on website design, digital marketing, SEO, social media and business growth from gYOU.",
} as const;
