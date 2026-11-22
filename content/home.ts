import type { MediaTint } from "@/components/ui/MediaFrame";
import { industryList } from "./industries";
import { site } from "./site";
import { serviceHref, type ServiceSlug } from "./services";

/**
 * Homepage content (docs/BUILD_PROMPT.md → Phase 3; brief §6).
 *
 * PAUSE 3 outcome: gYOU has no verified stats, client logos, case
 * studies, testimonials, certifications, showreel or posts yet. Nothing is
 * invented. Proof sections are empty and hidden; each reappears as soon as
 * real, approved items are added to its list below.
 * Headings/copy come from the brief. "Working copy" was drafted for gYOU
 * and accepted at PAUSE 3 pending final review.
 */

export type Heading = { lead?: string; accent?: string; trail?: string };
export type Cta = { label: string; href: string };

export const ctas = {
  // Brief §8: primary and secondary CTAs site-wide.
  primary: { label: "Get a Free Marketing Consultation", href: "/contact#enquiry" },
  secondary: { label: "Explore Our Work", href: "/our-work" },
  services: { label: "Explore Our Services", href: "/services" },
} as const satisfies Record<string, Cta>;

/** Decorative hero tile built from real services (no photos available yet). */
export type HeroTile = { title: string; detail: string; tint: MediaTint };

export const hero = {
  // Leads with websites + marketing (gYOU's direction at PAUSE 4).
  eyebrow: `Website Design & Digital Marketing · ${site.primaryMarket}`,
  // Brief §6 proposed headline. Italic accent word ("More") is working copy.
  heading: { lead: "Your Growth Deserves", accent: "More", trail: "Than Just Marketing." },
  // Adapted from the brief §6 supporting copy to name websites first.
  supporting:
    "We help businesses grow with websites built to convert and digital marketing that brings the right audience to them, backed by clear strategy, creative content and performance-driven campaigns.",
  primaryCta: ctas.primary,
  // Brief §6 hero secondary CTA. Used instead of "Explore Our Work" until a portfolio exists.
  secondaryCta: ctas.services,
  // Replace with real stills and a showreel when available (MediaFrame `media`).
  tiles: [
    { title: "Websites", detail: "UI/UX · Landing pages · Development", tint: "olive" },
    {
      title: "Creative Thinking. Strategic Marketing. Measurable Growth.",
      detail: "gYOU",
      tint: "graphite",
    },
    { title: "Marketing", detail: "Performance · SEO · Social", tint: "rust" },
  ] satisfies readonly HeroTile[],
} as const;

export const marqueeLabel = "Our services";

/**
 * Website + marketing spotlight (homepage and /services). Highlights
 * gYOU's two lead offers, per gYOU's direction at PAUSE 4. Working copy.
 */
export const spotlight = {
  heading: {
    lead: "A Website That Converts.",
    accent: "Marketing",
    trail: "That Brings People to It.",
  },
  intro:
    "Most growing businesses need both: a website that turns visitors into enquiries, and marketing that brings the right people to it. We plan and deliver the two together, so nothing is lost between them.",
  website: {
    label: "Build",
    title: "Website Design & Development",
    description:
      "Business websites and landing pages designed around your customers and built to work on every device.",
    points: [
      "Business websites and landing pages",
      "UI/UX design",
      "Responsive development",
      "Conversion-focused experiences",
    ],
    cta: { label: "Explore website services", href: serviceHref("website-design-development") },
  },
  marketing: {
    label: "Grow",
    title: "Digital Marketing",
    description:
      "Paid, organic and social channels working together to bring qualified visitors to your website.",
    services: [
      "performance-marketing",
      "seo-content-marketing",
      "social-media-marketing",
    ] satisfies readonly ServiceSlug[],
    cta: { label: "Explore marketing services", href: "/services" },
  },
} as const;

export type Stat = { value: string; label: string };

export const intro = {
  heading: { lead: "More Than Marketing.", accent: "A Partner", trail: "in Your Growth." },
  // Brief §3 proposed positioning.
  body: "gYOU is an integrated digital marketing agency combining strategy, creativity and performance marketing to help businesses establish stronger digital identities and achieve sustainable growth.",
  // Verified facts only. Add years in business, projects, team size etc. when they can be proven.
  stats: [
    { value: "6", label: "Integrated services under one team" },
    { value: site.primaryMarket, label: "Where we are based" },
  ] satisfies readonly Stat[],
  cta: { label: "About gYOU", href: "/about-us" },
} as const;

export type Credential = { name: string; logo?: string };

export const credibility = {
  label: "Clients and partners",
  // Only logos gYOU has written permission to show. Section hidden while empty.
  logos: [] as Credential[],
  // Only certifications or partner badges actually held.
  badges: [] as Credential[],
};

export const challenges = {
  heading: { lead: "Your Business Has Goals.", accent: "We Have", trail: "the Strategy." },
  intro: "Common growth problems, and the gYOU service built to solve each one.", // draft
  // Challenges from brief §6. Service matches and descriptions are drafts.
  items: [
    {
      challenge: "Low brand visibility",
      description: "Your brand is hard to recognise or remember in a crowded market.",
      service: "branding-creative-design",
    },
    {
      challenge: "Inconsistent social presence",
      description: "Posting is irregular and off-brand, so your audience never builds.",
      service: "social-media-marketing",
    },
    {
      challenge: "Poor-quality leads",
      description: "Enquiries arrive, but few of them fit your business.",
      service: "performance-marketing",
    },
    {
      challenge: "Low website traffic",
      description: "The people searching for what you offer are not finding you.",
      service: "seo-content-marketing",
    },
    {
      challenge: "Inefficient advertising spend",
      description: "Budget goes out every month without a clear return.",
      service: "performance-marketing",
    },
    {
      challenge: "Weak conversion rates",
      description: "Visitors arrive on your website but leave without acting.",
      service: "website-design-development",
    },
  ] satisfies ReadonlyArray<{ challenge: string; description: string; service: ServiceSlug }>,
} as const;

export const servicesSection = {
  heading: { lead: "Everything Your Brand Needs to", accent: "Grow Digitally." },
  intro: "Choose one service or bring them together under one integrated plan.", // draft
  cta: { label: "All services", href: "/services" },
} as const;

export const process = {
  heading: { lead: "A Clear Strategy.", accent: "A Smarter Way to Grow." },
  // Brief §6 Section 06.
  steps: [
    {
      title: "Discover",
      description: "Understand the business, objectives, audience and challenges.",
    },
    { title: "Strategise", description: "Develop a tailored marketing roadmap." },
    {
      title: "Execute",
      description: "Create content, implement campaigns and deliver marketing activities.",
    },
    {
      title: "Optimise",
      description: "Monitor results, analyse performance and improve campaigns.",
    },
  ],
} as const;

export type WorkCard = {
  client: string;
  title: string;
  tags: string;
  /** Image path, or omit to show the tinted frame. */
  image?: { src: string; alt: string };
  tint: MediaTint;
  href: string;
};

export const selectedWork = {
  heading: { lead: "Ideas in Action.", accent: "Results That Matter." },
  cta: ctas.secondary,
  // Items come from published case studies (content/case-studies/*.mdx).
  // The section is hidden until at least one is published.
  limit: 3,
};

export const industries = {
  heading: { lead: "Industries", accent: "We Serve" },
  intro: "Marketing shaped around how each sector buys, decides and grows.", // draft
  // Brief §6 Section 08 (content/industries.ts).
  items: industryList.map((i) => i.name),
  cta: { label: "Explore industries", href: "/industries" },
} as const;

export const whyChoose = {
  heading: { lead: "The Right Strategy Makes", accent: "All the Difference." },
  // Points from brief §6 Section 09. Descriptions are drafts; keep/cut/add at PAUSE 3.
  points: [
    {
      title: "Business-first approach",
      description: "We start from your commercial goals, not from a list of channels.",
    },
    {
      title: "Creative and analytical thinking",
      description: "Ideas that stand out, checked against what the numbers say.",
    },
    {
      title: "Integrated capabilities",
      description: "Strategy, content, media and web planned together as one programme.",
    },
    {
      title: "Transparent communication",
      description: "Clear reporting on what was done, what it cost and what it delivered.",
    },
    {
      title: "Data-led optimisation",
      description: "Campaigns are reviewed and refined on performance data.",
    },
    {
      title: "Custom strategies",
      description: "Plans built for your market, audience and budget.",
    },
    {
      title: "Focus on meaningful outcomes",
      description: "Success measured in enquiries, sales and growth rather than vanity metrics.",
    },
  ],
} as const;

export type TestimonialContent = {
  quote: string;
  name: string;
  designation: string;
  company: string;
};

export const testimonial = {
  /** Visually hidden section heading for screen readers. */
  heading: "Client testimonial",
  // Verified testimonial with the client's consent (brief §6 Section 10). Hidden while null.
  item: null as TestimonialContent | null,
};

export const insights = {
  heading: { lead: "Latest", accent: "Insights" },
  cta: { label: "View All Insights", href: "/insights" },
  // Posts come from content/insights/*.mdx. Section hidden until one is published.
};

export const finalCta = {
  // Brief §6 Section 12 heading and copy.
  heading: { lead: "Ready to Make Your", accent: "Next Move?" },
  supporting:
    "Let’s understand your business goals and create a marketing strategy that moves you forward.",
  emailLabel: "Your business email",
  emailPlaceholder: "you@company.com",
  submitLabel: "Start a Conversation",
  sendingLabel: "Sending…",
  errorMessage: "Something went wrong. Please try again or reach us on WhatsApp.",
  invalidEmail: "Enter a valid business email address.",
  whatsappLabel: "WhatsApp",
} as const;
