import type { ServicePageContent } from "./types";

/** Video & Content Production. Deliverables: brief §4.5. Other copy is working copy. */
export const videoContentProduction: ServicePageContent = {
  slug: "video-content-production",
  hero: {
    heading: { lead: "Video That", accent: "Holds", trail: "Attention." },
    supporting:
      "Promotional films, reels, product videos and motion graphics produced to tell your story clearly and keep audiences watching.",
  },
  intro: {
    heading: { lead: "Stories Worth", accent: "Watching." },
    paragraphs: [
      "Video is often the quickest way to explain what you do and why it matters. We plan, produce and edit video shaped for where it will be seen, from social feeds to websites and ad campaigns.",
      "Whether you need a single brand film or a regular flow of short-form content, we handle the creative concept, production and post-production.",
    ],
  },
  challenges: [
    {
      title: "Content that gets scrolled past",
      description: "Videos lose viewers in the first few seconds.",
    },
    {
      title: "No time to produce regularly",
      description: "Your team knows video matters but can’t create it consistently.",
    },
    {
      title: "Products that are hard to explain",
      description: "Written descriptions don’t show customers how your product or service works.",
    },
  ],
  solutions: [
    {
      title: "Concept and scripting",
      description: "Ideas and scripts built around your message, audience and platform.",
    },
    {
      title: "Production and motion graphics",
      description:
        "Filming, animation and motion graphics produced to a consistent brand standard.",
    },
    {
      title: "Editing for every format",
      description: "Edits and cut-downs prepared for reels, ads, websites and presentations.",
    },
  ],
  // Brief §4.5.
  deliverables: [
    "Promotional and corporate videos",
    "Social media reels",
    "Product videos and motion graphics",
    "Explainer and advertising videos",
    "Video editing and post-production",
  ],
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "What types of video do you produce?",
      answer:
        "Promotional and corporate videos, social media reels, product videos, motion graphics, explainers and advertising videos.",
    },
    {
      question: "Can you handle the whole process?",
      answer:
        "Yes. We take care of concept, production and post-production. If you already have footage, we can edit that too.",
    },
    {
      question: "Do you make videos for social media and ads?",
      answer: "Yes. Reels and advertising videos are part of this service.",
    },
    {
      question: "Can one video be adapted for different formats?",
      answer: "Yes. We prepare edits and cut-downs for reels, ads, websites and presentations.",
    },
  ],
  cta: {
    heading: { lead: "Ready to Tell Your", accent: "Story on Video?" },
    supporting:
      "Tell us what you want to say and who needs to see it, and we’ll shape the right format.",
  },
};
