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
      "Property decisions are high-value and considered. Marketing needs to build trust, present projects clearly and generate enquiries from serious buyers.",
    focus: [
      "Project launch campaigns",
      "Lead generation for site visits",
      "Project websites and landing pages",
    ],
    services: ["website-design-development", "performance-marketing", "video-content-production"],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    description:
      "Patients and clients look for credibility and clarity before they book. Marketing should be informative, respectful and easy to act on.",
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
      "Students and parents compare options carefully. Clear information and well-timed campaigns around admission cycles make the difference.",
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
      "Financial decisions depend on trust. Marketing has to explain products clearly and accurately, and build confidence over time.",
    focus: [
      "Clear product explainers",
      "Trust-building content",
      "Websites that simplify complex offers",
    ],
    services: ["website-design-development", "seo-content-marketing", "video-content-production"],
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    description:
      "Online shoppers move quickly. Visibility, strong product content and well-run campaigns help turn browsing into sales.",
    focus: [
      "Product and catalogue campaigns",
      "Conversion-focused store experiences",
      "Product videos and reels",
    ],
    services: ["performance-marketing", "website-design-development", "video-content-production"],
  },
  {
    slug: "technology-saas",
    name: "Technology & SaaS",
    description:
      "Technology buyers research thoroughly. Content that explains value clearly and campaigns that reach decision-makers support a longer sales cycle.",
    focus: [
      "Product websites and landing pages",
      "SEO and content for research-led buyers",
      "Explainer videos",
    ],
    services: ["website-design-development", "seo-content-marketing", "video-content-production"],
  },
  {
    slug: "hospitality-lifestyle",
    name: "Hospitality & Lifestyle",
    description:
      "Guests choose with their eyes. Strong visuals, active social channels and easy booking journeys drive interest and reservations.",
    focus: [
      "Visual social media content",
      "Reels and short-form video",
      "Websites with clear booking journeys",
    ],
    services: ["social-media-marketing", "video-content-production", "website-design-development"],
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
    "Every sector buys, decides and grows differently. We shape websites and marketing around how your customers actually choose.",
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
