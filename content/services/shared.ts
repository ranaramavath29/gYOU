import { ctas, process } from "../home";
import { site } from "../site";

/** Headings and labels shared by every service page and the /services overview. */
export const serviceShared = {
  eyebrowSuffix: site.primaryMarket,
  primaryCta: ctas.primary,
  secondaryCta: { label: "All services", href: "/services" },
  breadcrumb: { label: "Breadcrumb", home: "Home", services: "Services" },
  introLabel: "Overview",
  solutionsHeading: { lead: "How We", accent: "Help" },
  deliverablesHeading: { lead: "What’s", accent: "Included" },
  processHeading: { lead: "How We", accent: "Work" },
  // Same four steps as the homepage (brief §6 Section 06).
  processSteps: process.steps,
  relatedHeading: { lead: "Related", accent: "Work" },
  // Engagement models from brief §8 "Commercial positioning". No prices or
  // guarantees are shown (never pay-per-lead). Working copy: confirm at PAUSE 4.
  engagement: {
    heading: { lead: "Ways to", accent: "Work With Us" },
    intro:
      "Every engagement is scoped to your goals after a free consultation, and pricing is shared in a tailored proposal.",
    models: [
      {
        title: "Monthly retainer",
        description:
          "Ongoing work such as social media, SEO and campaign management, planned and reported month by month.",
      },
      {
        title: "Project fee",
        description:
          "Defined projects with a clear scope, such as a new website or marketing campaign.",
      },
      {
        title: "Campaign management",
        description:
          "Focused paid campaigns run for a set period, with agreed goals and reporting.",
      },
    ],
  },
  faqHeading: { lead: "Frequently Asked", accent: "Questions" },
} as const;

/** /services overview page. */
export const servicesOverview = {
  // Brief §6 Section 05 heading.
  heading: { lead: "Everything Your Brand Needs to", accent: "Grow Digitally." },
  supporting:
    "Four integrated services, planned around your business goals. Choose one, or bring them together under a single strategy.", // working copy
  listHeading: { lead: "Our", accent: "Services" },
  exploreLabel: "Explore service",
  cta: {
    heading: { lead: "Not Sure", accent: "Where to Start?" },
    supporting:
      "Tell us about your business and goals, and we’ll recommend the right mix of services.", // working copy
  },
  metaTitle: "Digital Marketing Services",
  metaDescription:
    "Digital marketing services in Hyderabad: Google and Meta Ads, SEO, social media marketing and website design from gYOU Digital. Get a free audit.",
} as const;
