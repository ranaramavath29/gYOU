import { media } from "../media";
import type { ServicePageContent } from "./types";

/** Website Design & Development. Deliverables: brief §4.6. Other copy is working copy. */
export const websiteDesignDevelopment: ServicePageContent = {
  slug: "website-design-development",
  metaDescription:
    "Business websites and landing pages designed around your customers, responsive on every device and easy to update. Web design by gYOU Digital, Hyderabad.",
  hero: {
    media: media.websiteDevices,
    heading: { lead: "Websites Built to", accent: "Convert." },
    supporting:
      "Business websites and landing pages designed around your customers, built to work on every device and easy to keep up to date.",
  },
  intro: {
    heading: { lead: "First Impressions", accent: "That Last." },
    paragraphs: [
      "Your website is often the first place customers judge your business. We design and build sites that explain what you offer clearly, are built for speed and guide visitors towards an enquiry or purchase.",
      "From a focused landing page to a complete redesign, we handle UX, design, development, content integration and ongoing maintenance.",
    ],
  },
  challenges: [
    {
      title: "Visitors leave without acting",
      description: "People arrive on your site but can’t quickly see why or how to get in touch.",
    },
    {
      title: "A poor mobile experience",
      description: "Pages are slow or awkward on phones, where many of your visitors browse.",
    },
    {
      title: "Updates that take too long",
      description: "Small changes depend on a developer, so the site falls out of date.",
    },
  ],
  solutions: [
    {
      title: "UX and design",
      description:
        "Page structure and journeys planned around what your customers need to find and do.",
    },
    {
      title: "Responsive development",
      description: "Fast, accessible builds that work across phones, tablets and desktops.",
    },
    {
      title: "Conversion and care",
      description:
        "Clear calls to action, enquiry forms and ongoing maintenance to keep the site working for you.",
    },
  ],
  // Brief §4.6.
  deliverables: [
    "Business websites and landing pages",
    "UI/UX design",
    "Responsive website development",
    "Website redesign",
    "Content integration",
    "Conversion-focused experiences and maintenance",
  ],
  auditForm: true,
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "Do you build new websites as well as redesign existing ones?",
      answer:
        "Yes. We design and build new business websites and landing pages, and we redesign existing sites that no longer reflect the business or perform as they should.",
    },
    {
      question: "Will my website work properly on mobile phones?",
      answer:
        "Every site we build is responsive, designed and tested to work across phones, tablets and desktops.",
    },
    {
      question: "Can the website support our marketing?",
      answer:
        "Yes. We plan each site with clear calls to action, enquiry forms and tracking, so it works hand in hand with your SEO, social media and paid campaigns.",
    },
    {
      question: "Do you help after the website goes live?",
      answer:
        "Content integration and ongoing maintenance are part of our website services. We agree the level of support you need when we scope the project.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "It depends on the number of pages, features and content involved. After a free consultation, we share a proposal scoped to your requirements.",
    },
  ],
  cta: {
    heading: { lead: "Ready for a Website That", accent: "Works Harder?" },
    supporting: "Tell us about your current site and goals, and we’ll suggest the right next step.",
  },
};
