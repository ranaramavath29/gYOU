import { services } from "./services";
import { site } from "./site";

/**
 * About page (docs/BUILD_PROMPT.md → Phase 6). Built from confirmed facts and
 * the brief's positioning only. No founding year, founder story or team
 * members are invented: add them here when gYOU supplies them (PAUSE 6).
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Only people who have agreed to be shown. */
  photo?: { src: string; alt: string };
};

export const about = {
  eyebrow: "About gYOU",
  heading: { lead: "Websites and Marketing,", accent: "Built Around", trail: "Your Growth." },
  supporting: `gYOU is a ${site.primaryMarket} website design and digital marketing agency. We combine strategy, creativity and performance marketing to help businesses build stronger digital identities and grow.`,
  whoWeAre: {
    heading: { lead: "Who", accent: "We Are" },
    // Brief §3 positioning and core communication.
    paragraphs: [
      "gYOU is an integrated digital marketing agency combining strategy, creativity and performance marketing to help businesses establish stronger digital identities and achieve sustainable growth.",
      "We focus on business outcomes rather than individual tactics: building brand visibility, reaching the right audience, generating qualified enquiries, improving marketing performance and supporting long-term growth.",
      "From the website your customers land on to the campaigns that bring them there, we plan and deliver the work as one connected programme.",
    ],
    facts: [
      { value: String(services.length), label: "Integrated services under one team" },
      { value: site.primaryMarket, label: "Where we are based" },
    ],
  },
  approachHeading: { lead: "Our", accent: "Approach" },
  // Brief §3 brand characteristics, written as values. Descriptions are working copy.
  values: {
    heading: { lead: "What We", accent: "Stand For" },
    items: [
      {
        title: "Strategic",
        description: "Every plan starts from your business goals, not from a list of channels.",
      },
      {
        title: "Creative",
        description: "Ideas and design that help your brand stand out for the right reasons.",
      },
      {
        title: "Performance-oriented",
        description: "We track what matters and refine the work based on what the data shows.",
      },
      {
        title: "Dependable",
        description: "Clear communication, realistic plans and work delivered as agreed.",
      },
      {
        title: "Business-focused",
        description: "Success is measured in enquiries, sales and growth, not vanity metrics.",
      },
      {
        title: "Modern",
        description: "Current platforms, tools and formats, chosen for what they do for you.",
      },
    ],
  },
  team: {
    heading: { lead: "Our", accent: "Team" },
    // Hidden while empty. Add only people who have agreed to be shown.
    members: [] as TeamMember[],
  },
  cta: {
    heading: { lead: "Let’s Build Your", accent: "Next Chapter" },
    supporting: "Tell us where your business is today and where you want it to go.",
  },
  metaTitle: "About Us",
  metaDescription: `About gYOU, a ${site.primaryMarket} website design and digital marketing agency combining strategy, creativity and performance marketing.`,
} as const;
