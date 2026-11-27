import { site } from "../site";
import { media } from "../media";
import type { ServicePageContent } from "./types";

/**
 * SEO & Content Marketing. Deliverables: brief §4.2. Other copy is working copy.
 * No ranking or traffic guarantees are made.
 */
export const seoContentMarketing: ServicePageContent = {
  slug: "seo-content-marketing",
  metaDescription:
    "SEO services in Hyderabad: technical SEO, local search and useful content that help customers find your business. From gYOU Digital.",
  hero: {
    media: media.mobileSearch,
    heading: { lead: "Be Found by the", accent: "Right", trail: "Customers." },
    supporting:
      "Technical SEO, local search and useful content that help the people searching for what you offer find your business.",
  },
  intro: {
    heading: { lead: "Visibility That", accent: "Compounds." },
    paragraphs: [
      "Search engine optimisation improves how your website appears in search results for the terms your customers actually use. We fix technical issues, optimise your pages and build content that answers real questions.",
      `For businesses serving ${site.primaryMarket} and other local markets, we also strengthen local search signals so you appear when nearby customers are looking.`,
    ],
  },
  challengesHeading: { lead: "Search Problems That Sound", accent: "Familiar?" },
  challenges: [
    {
      title: "Low organic traffic",
      description: "Your website gets few visitors from search, so you rely heavily on paid ads.",
    },
    {
      title: "Technical problems holding pages back",
      description:
        "Slow pages, indexing errors or poor structure make it harder for search engines to rank your site.",
    },
    {
      title: "Content without a plan",
      description: "Blog posts appear occasionally, without clear keywords or purpose.",
    },
  ],
  solutions: [
    {
      title: "Technical and on-page foundations",
      description: "Site structure, speed, indexing and on-page elements reviewed and improved.",
    },
    {
      title: "Keyword and competitor research",
      description:
        "Find the searches that matter to your business and see where competitors are winning.",
    },
    {
      title: "Content that earns visibility",
      description:
        "Optimised service pages, blogs and articles built around what your customers search for.",
    },
  ],
  // Brief §4.2.
  deliverables: [
    "Technical and on-page SEO",
    "Off-page SEO and keyword research",
    "Competitor analysis and local SEO",
    "Website content optimisation",
    "Blog and article development",
    "Organic traffic growth strategy",
  ],
  auditForm: true,
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "How long does SEO take to show results?",
      answer:
        "SEO builds over time. How long depends on your website, your competition and your starting point, so we set realistic expectations after an initial review.",
    },
    {
      question: "Do you guarantee first-page rankings?",
      answer:
        "No. Nobody controls search engine rankings. We focus on the technical, content and local factors that improve visibility, and report progress openly.",
    },
    {
      question: `Do you offer local SEO for ${site.primaryMarket} businesses?`,
      answer:
        "Yes. Local SEO is part of this service, helping your business appear when nearby customers search for what you offer.",
    },
    {
      question: "Do you write blog content?",
      answer:
        "Yes. Blog and article development is included, planned around keyword research so each piece has a clear purpose.",
    },
  ],
  cta: {
    heading: { lead: "Ready to Improve Your", accent: "Search Visibility?" },
    supporting:
      "Tell us about your website and target market, and we’ll identify the first improvements to make.",
  },
};
