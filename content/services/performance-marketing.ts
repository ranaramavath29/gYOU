import type { ServicePageContent } from "./types";

/**
 * Performance Marketing: the reference service page (Phase 4).
 * Deliverables: brief §7 example list. All other copy is working copy for
 * gYOU's review. No results, prices or guarantees are claimed.
 */
export const performanceMarketing: ServicePageContent = {
  slug: "performance-marketing",
  hero: {
    heading: { lead: "Advertising That", accent: "Answers", trail: "to Your Goals." },
    supporting:
      "Meta Ads and Google Ads campaigns planned, run and refined around the outcomes that matter to your business: qualified enquiries, sales and a clear view of what your spend delivers.",
  },
  intro: {
    heading: { lead: "Spend With", accent: "Purpose." },
    paragraphs: [
      "Performance marketing is paid advertising measured by results. We plan campaigns around your commercial goals, target the audiences most likely to act, and track every step from click to enquiry, so budget decisions rest on evidence rather than guesswork.",
      "Whether you need a steady flow of leads, more online sales or better returns from campaigns you already run, we set up the strategy, targeting, tracking and reporting to support it.",
    ],
  },
  challenges: [
    {
      title: "Spend without clear returns",
      description:
        "Campaigns run every month, but it is hard to say which ones are paying for themselves.",
    },
    {
      title: "Leads that don’t convert",
      description: "Forms get filled, yet few enquiries turn into real conversations or customers.",
    },
    {
      title: "Tracking you can’t trust",
      description: "Missing or duplicated conversion data turns optimisation into guesswork.",
    },
  ],
  solutions: [
    {
      title: "Goal-led campaign strategy",
      description:
        "Objectives, audiences, budgets and channels planned around your business targets before any ad goes live.",
    },
    {
      title: "Audience targeting and retargeting",
      description:
        "Reach people who match your ideal customer, and re-engage those who have already shown interest.",
    },
    {
      title: "Measurement and optimisation",
      description:
        "Conversion tracking set up properly, then campaigns refined on what the data shows.",
    },
  ],
  // Brief §7 "Example: Performance Marketing page".
  deliverables: [
    "Meta Ads Management",
    "Google Ads Management",
    "Lead Generation",
    "Audience Research",
    "Retargeting",
    "Conversion Rate Optimisation",
    "Analytics and Conversion Tracking",
  ],
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "Which advertising platforms do you manage?",
      answer: "We manage Meta Ads (Facebook and Instagram) and Google Ads campaigns.",
    },
    {
      question: "Do you guarantee a number of leads?",
      answer:
        "No. Results depend on your market, offer, budget and website. We set clear goals with you, track performance accurately and refine campaigns based on what the data shows.",
    },
    {
      question: "How is the advertising budget decided?",
      answer:
        "We recommend a budget based on your goals and market during campaign planning, and you approve it before any campaign goes live.",
    },
    {
      question: "How will I know what is working?",
      answer:
        "We set up conversion tracking and report on the measures tied to your goals, such as enquiries, cost per lead and sales.",
    },
    {
      question: "Can you improve campaigns we already run?",
      answer:
        "Yes. We can review your existing campaigns and tracking, then recommend and carry out improvements.",
    },
  ],
  cta: {
    heading: { lead: "Ready to Make Your Ad Spend", accent: "Work Harder?" },
    supporting: "Tell us about your goals and current campaigns, and we’ll suggest where to start.",
  },
};
