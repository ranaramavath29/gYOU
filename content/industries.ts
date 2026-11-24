import type { ServiceSlug } from "./services";

/**
 * Industries gYOU targets (brief §6 Section 08). Used by the homepage,
 * the case study filters and /industries. Descriptions and focus areas are
 * working copy describing an approach, not claims of past clients or results.
 */
type Industry = {
  slug: string;
  name: string;
  description: string;
  focus: readonly [string, string, string];
  services: readonly ServiceSlug[];
};

export const industryList = [
  {
    slug: "real-estate-infrastructure",
    name: "Real Estate & Infrastructure",
    description:
      "Build visibility, attract potential buyers and generate relevant property enquiries.",
    focus: [
      "Project launch campaigns",
      "Lead generation for site visits",
      "Project websites and landing pages",
    ],
    services: ["website-design-development", "performance-marketing", "seo-content-marketing"],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    description:
      "Strengthen digital presence, improve discoverability and connect healthcare brands with their communities.",
    focus: [
      "Local search visibility",
      "Appointment-focused websites",
      "Helpful educational content",
    ],
    services: ["seo-content-marketing", "website-design-development", "social-media-marketing"],
  },
  {
    slug: "education-training",
    name: "Education & Training",
    description:
      "Increase institutional visibility, reach prospective students and generate admission enquiries.",
    focus: [
      "Admission and enrolment campaigns",
      "Course and programme landing pages",
      "Social content for students and parents",
    ],
    services: ["performance-marketing", "website-design-development", "social-media-marketing"],
  },
  {
    slug: "fintech-financial-services",
    name: "Fintech & Financial Services",
    description:
      "Communicate financial solutions through clear content, strategic marketing and effective digital experiences.",
    focus: [
      "Clear product explainers",
      "Trust-building content",
      "Websites that simplify complex offers",
    ],
    services: ["website-design-development", "seo-content-marketing", "performance-marketing"],
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    description:
      "Improve product visibility, reach potential customers and support online sales growth.",
    focus: [
      "Product and catalogue campaigns",
      "Conversion-focused store experiences",
      "Product page SEO and content",
    ],
    services: ["performance-marketing", "website-design-development", "social-media-marketing"],
  },
  {
    slug: "technology-saas",
    name: "Technology & SaaS",
    description:
      "Build brand awareness, communicate product value and reach relevant business audiences.",
    focus: [
      "Product websites and landing pages",
      "SEO and content for research-led buyers",
      "Product and feature page content",
    ],
    services: ["website-design-development", "seo-content-marketing", "performance-marketing"],
  },
  {
    slug: "hospitality-lifestyle",
    name: "Hospitality & Lifestyle",
    description:
      "Strengthen online visibility, showcase experiences and attract potential customers.",
    focus: [
      "Visual social media content",
      "Social content showcasing experiences",
      "Websites with clear booking journeys",
    ],
    services: ["social-media-marketing", "seo-content-marketing", "website-design-development"],
  },
] as const satisfies readonly Industry[];

export type IndustrySlug = (typeof industryList)[number]["slug"];

export const industrySlugs = industryList.map((i) => i.slug) as [IndustrySlug, ...IndustrySlug[]];

export function industryName(slug: IndustrySlug): string {
  return industryList.find((i) => i.slug === slug)!.name;
}

/** /industries page copy. */
export const industriesPage = {
  heading: { lead: "Industries", accent: "We Serve" },
  supporting:
    "Every industry has its own audience, challenges and opportunities. We develop digital strategies that align with the specific needs of your business.",
  focusLabel: "Where we focus",
  servicesLabel: "Relevant services",
  cta: {
    heading: { lead: "Don’t See Your", accent: "Industry?" },
    supporting:
      "The approach works across sectors. Tell us about your business and we’ll talk it through.",
  },
  metaTitle: "Industries",
  metaDescription:
    "Website design and digital marketing for real estate, healthcare, education, fintech, e-commerce, technology and hospitality businesses.",
} as const;
