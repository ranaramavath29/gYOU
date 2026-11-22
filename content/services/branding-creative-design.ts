import type { ServicePageContent } from "./types";

/** Branding & Creative Design. Deliverables: brief §4.4. Other copy is working copy. */
export const brandingCreativeDesign: ServicePageContent = {
  slug: "branding-creative-design",
  hero: {
    heading: { lead: "Brands People", accent: "Remember." },
    supporting:
      "Brand strategy, visual identity and campaign creative that give your business a clear, consistent and distinctive presence.",
  },
  intro: {
    heading: { lead: "More Than a", accent: "Logo." },
    paragraphs: [
      "A strong brand tells people who you are, what you stand for and why they should choose you. We start with strategy, then design the identity and creative assets that express it at every touchpoint.",
      "From a new identity to a refresh of existing materials, we keep your brand consistent across print, digital, social and advertising.",
    ],
  },
  challenges: [
    {
      title: "A brand that blends in",
      description: "Your business looks much like its competitors, so it is easily forgotten.",
    },
    {
      title: "Inconsistent visuals",
      description: "Colours, fonts and tone change from one channel to the next.",
    },
    {
      title: "Outdated materials",
      description:
        "Your logo, brochures or creatives no longer reflect where the business is today.",
    },
  ],
  solutions: [
    {
      title: "Brand strategy",
      description: "Positioning, personality and messaging defined before any design work begins.",
    },
    {
      title: "Visual identity system",
      description: "Logo, colour, typography and usage guidelines that keep the brand consistent.",
    },
    {
      title: "Creative for every channel",
      description:
        "Collateral, social and advertising creatives, and campaign design built on the identity.",
    },
  ],
  // Brief §4.4.
  deliverables: [
    "Brand strategy and identity development",
    "Logo and visual identity",
    "Marketing collateral",
    "Social media and advertising creatives",
    "Brand communication",
    "Campaign design",
  ],
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "Can you refresh our existing brand rather than start over?",
      answer:
        "Yes. We can refine an existing identity or create a new one, depending on what your business needs.",
    },
    {
      question: "Do you start with strategy or design?",
      answer:
        "Strategy. We define positioning, personality and messaging first, so every design decision has a clear purpose.",
    },
    {
      question: "What do we receive at the end of a branding project?",
      answer:
        "That depends on the scope we agree. It can include a logo, a visual identity system with usage guidelines, and marketing collateral.",
    },
    {
      question: "Do you design social media and advertising creatives?",
      answer:
        "Yes. Social media and advertising creatives, and campaign design, are part of this service.",
    },
  ],
  cta: {
    heading: { lead: "Ready to Build a", accent: "Stronger Brand?" },
    supporting: "Tell us where your brand is today and where you want it to go.",
  },
};
