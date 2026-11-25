import type { MediaSource, MediaTint } from "@/components/ui/MediaFrame";
import { media } from "./media";
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
  primary: { label: "Let’s Grow Your Business", href: "/contact#enquiry" },
  secondary: { label: "Explore Our Work", href: "/our-work" },
  services: { label: "Explore Our Services", href: "/services" },
} as const satisfies Record<string, Cta>;

export const hero = {
  eyebrow: "DIGITAL MARKETING & GROWTH PARTNER",
  heading: { lead: "Make Your Brand Visible.", accent: "Turn Attention Into Growth." },
  supporting:
    "We help businesses grow through strategic digital marketing, performance advertising, SEO and website solutions that connect brands with the right audience and turn opportunities into customers.",
  supportingLine: "Strategy First. Data-Driven. Growth That Matters.",
  /**
   * Checklist under the supporting copy. Working copy, Nov 2026: each line restates
   * what the service pages already say (no stats, prices or guarantees).
   */
  points: [
    "Google Ads, Meta Ads, SEO and websites under one team",
    "Campaigns planned around your business goals",
    "Reporting on spend, enquiries and cost per lead",
  ],
  /** Primary CTA scrolls to the audit form in the hero card. */
  primaryCta: { label: ctas.primary.label, href: "#free-audit" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  /** Showcase card beside the headline: gYOU's shoot video with the brand statement. */
  showcase: {
    media: media.studioShoot,
    tag: "Inside the studio",
    statement: "Creative Thinking. Strategic Marketing. Measurable Growth.",
  },
} as const;

export const marqueeLabel = "Our services";

/**
 * Website + marketing spotlight (homepage and /services). Highlights
 * gYOU's two lead offers, per gYOU's direction at PAUSE 4. Working copy.
 */
export const spotlight = {
  heading: { lead: "Digital Strategies That", accent: "Move Your Business Forward." },
  intro:
    "We help businesses strengthen their online presence, reach the right audience and generate growth opportunities through strategic digital marketing and website solutions.",
  website: {
    label: "02",
    title: "Website Design & Development",
    description:
      "Turn your website into a business asset with a professional digital experience that communicates your brand, engages visitors and encourages action.",
    points: [
      "Business websites",
      "WordPress websites",
      "E-commerce websites",
      "Landing page design",
      "UI/UX design",
      "Responsive development",
      "Website optimisation",
    ],
    cta: { label: "Explore Website Solutions", href: serviceHref("website-design-development") },
  },
  marketing: {
    label: "01",
    title: "Digital Marketing",
    description:
      "Make every digital interaction count. Build visibility, attract the right audience and generate business opportunities through strategic digital marketing.",
    services: [
      "performance-marketing",
      "seo-content-marketing",
      "social-media-marketing",
    ] satisfies readonly ServiceSlug[],
    cta: { label: "Explore Digital Marketing", href: "/services" },
  },
} as const;

export type Stat = { value: string; label: string };

export const intro = {
  heading: {
    lead: "More Than Marketing.",
    accent: "A Strategic Partner",
    trail: "in Your Growth.",
  },
  body: [
    "At gYOU Digital, we believe successful marketing starts with understanding your business.",
    "We combine digital marketing strategy, performance-driven campaigns, search engine optimisation and website development to help businesses build visibility, connect with their audience and generate meaningful opportunities.",
    "From improving your online presence to running targeted advertising campaigns, we bring the right strategies together to support your business goals.",
  ],
  /** Screen-reader label for the facts row under the hero. */
  factsLabel: "gYOU at a glance",
  // Verified facts only. Add years in business, projects, team size etc. when they can be proven.
  stats: [
    { value: "4", label: "Integrated services under one team" },
    { value: site.primaryMarket, label: "Where we are based" },
  ] satisfies readonly Stat[],
  cta: { label: "Discover gYOU Digital", href: "/about-us" },
  image: media.hourglass,
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
  intro:
    "Growing a business online takes more than simply being present. It requires the right strategy, consistent execution and continuous improvement.",
  cta: { label: "Let’s Solve Your Growth Challenges", href: "/contact#enquiry" },
  items: [
    {
      challenge: "Low brand visibility",
      description:
        "Your potential customers are searching online, but your brand isn’t reaching them.",
      approach:
        "Improve online visibility through SEO, content marketing and strategic social media activities.",
      service: "seo-content-marketing",
    },
    {
      challenge: "Inconsistent social presence",
      description:
        "Your brand struggles to maintain consistent communication and engagement with its audience.",
      approach:
        "Build a structured social media strategy with consistent content planning and management.",
      service: "social-media-marketing",
    },
    {
      challenge: "Poor-quality leads",
      description:
        "Your marketing campaigns generate enquiries, but too many come from people who aren’t the right fit.",
      approach: "Improve audience targeting, campaign strategy and lead generation activities.",
      service: "performance-marketing",
    },
    {
      challenge: "Low website traffic",
      description: "Your website exists, but the right audience isn’t discovering it.",
      approach:
        "Strengthen search visibility and drive relevant traffic through SEO and paid advertising.",
      service: "seo-content-marketing",
    },
    {
      challenge: "Inefficient advertising spend",
      description: "Your advertising budget isn’t delivering the expected marketing performance.",
      approach: "Improve campaign structure, audience targeting, tracking and optimisation.",
      service: "performance-marketing",
    },
    {
      challenge: "Weak conversion rates",
      description: "Visitors reach your website, but too few take the next step.",
      approach: "Improve website experiences, messaging, calls to action and conversion pathways.",
      service: "website-design-development",
    },
  ] satisfies ReadonlyArray<{
    challenge: string;
    description: string;
    approach: string;
    service: ServiceSlug;
  }>,
} as const;

export const servicesSection = {
  heading: { lead: "The Right Digital Strategy.", accent: "The Right Execution." },
  intro:
    "Every business has different goals. We bring together digital marketing expertise and website development solutions to help businesses build visibility, attract customers and grow online.",
  cta: { label: "View All Services", href: "/services" },
  /** Media on each service card (social plays its looping video, with a pause button). */
  media: {
    "website-design-development": media.websiteDevices,
    "performance-marketing": media.marketingTeam,
    "seo-content-marketing": media.mobileSearch,
    "social-media-marketing": media.socialMedia,
  } satisfies Record<ServiceSlug, MediaSource>,
} as const;

export const process = {
  heading: { lead: "A Clear Strategy.", accent: "A Smarter Way to Grow." },
  steps: [
    {
      title: "Discover",
      description:
        "We understand your business, target audience, objectives and current digital presence.",
    },
    {
      title: "Strategise",
      description:
        "We develop a customised strategy based on your goals, market opportunities and marketing requirements.",
    },
    {
      title: "Execute",
      description:
        "We put the strategy into action through digital marketing campaigns, website development and digital implementation.",
    },
    {
      title: "Optimise",
      description:
        "We monitor performance, analyse results and identify opportunities to continuously improve your digital activities.",
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
  heading: {
    lead: "Different Industries.",
    accent: "Different Challenges.",
    trail: "One Strategic Approach.",
  },
  intro:
    "Property launches, patient enquiries and online orders each need a different mix of search, social, advertising and web. We shape the plan around your sector.",
  // Brief §6 Section 08 (content/industries.ts).
  items: industryList.map((i) => i.name),
  cta: { label: "Explore Industries", href: "/industries" },
  ctaHint: "How we approach each sector",
} as const;

export const whyChoose = {
  heading: { lead: "The Right Strategy Makes", accent: "All the Difference." },
  image: media.lightbulb,
  points: [
    {
      title: "Business-first approach",
      description:
        "We understand your business objectives before recommending marketing activities.",
    },
    {
      title: "Strategic & analytical thinking",
      description:
        "We combine strategic planning with performance insights to develop effective digital marketing strategies.",
    },
    {
      title: "Integrated digital solutions",
      description:
        "From digital marketing to website development, we bring complementary services together to support your goals.",
    },
    {
      title: "Transparent communication",
      description:
        "We value clear communication, structured updates and alignment throughout the engagement.",
    },
    {
      title: "Data-led optimisation",
      description:
        "We use campaign insights and performance data to identify opportunities for improvement.",
    },
    {
      title: "Strategies built around you",
      description: "Our approach is shaped around your audience, objectives and requirements.",
    },
    {
      title: "Focus on meaningful outcomes",
      description:
        "We focus on activities that support business visibility, relevant enquiries and sustainable growth.",
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
  eyebrow: "READY TO GROW?",
  heading: { lead: "Your Next Stage of Growth Starts", accent: "With the Right Strategy." },
  supporting:
    "Whether you want to strengthen your digital presence, generate more enquiries or build a better website, gYOU Digital is ready to help you move forward. Let’s understand your goals, explore the opportunities and create a digital strategy that works for your business.",
  supportingLine: "Have a project in mind? Let’s turn your ideas into action.",
  primaryCta: { label: "Let’s Discuss Your Project", href: "/contact#enquiry" },
  secondaryCta: { label: "Get in Touch", href: "/contact" },
  emailLabel: "Your business email",
  submitLabel: "Let’s Discuss Your Project",
  sendingLabel: "Sending…",
  errorMessage: "Something went wrong. Please try again or reach us on WhatsApp.",
  invalidEmail: "Enter a valid business email address.",
  whatsappLabel: "WhatsApp",
} as const;
