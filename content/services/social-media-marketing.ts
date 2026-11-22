import type { ServicePageContent } from "./types";

/** Social Media Marketing. Deliverables: brief §4.1. Other copy is working copy. */
export const socialMediaMarketing: ServicePageContent = {
  slug: "social-media-marketing",
  hero: {
    heading: { lead: "Social Media That", accent: "Builds", trail: "Your Brand." },
    supporting:
      "Strategy, content and community management that give your brand a consistent, recognisable presence where your audience spends its time.",
  },
  intro: {
    heading: { lead: "Show Up", accent: "Consistently." },
    paragraphs: [
      "Social media works best when it is planned. We build a strategy around your brand, audience and goals, then turn it into a content calendar, creatives and reels that keep your channels active and on-message.",
      "Alongside publishing, we manage conversations with your community and report on what is working, so your social presence supports the wider business rather than running on its own.",
    ],
  },
  challenges: [
    {
      title: "Irregular posting",
      description: "Channels go quiet for weeks, then fill up with rushed, last-minute content.",
    },
    {
      title: "Content that doesn’t fit the brand",
      description:
        "Posts look and sound different every time, so followers never get a clear picture of who you are.",
    },
    {
      title: "No link to business results",
      description:
        "Likes and views are reported, but it is unclear how social media helps the business.",
    },
  ],
  solutions: [
    {
      title: "A clear social strategy",
      description:
        "Platforms, content pillars, tone of voice and posting rhythm defined around your audience and goals.",
    },
    {
      title: "Planned, on-brand content",
      description:
        "Monthly calendars, static and carousel creatives, and reels produced to a consistent standard.",
    },
    {
      title: "Community management and reporting",
      description:
        "Comments and messages managed in your brand voice, with reports focused on meaningful metrics.",
    },
  ],
  // Brief §4.1.
  deliverables: [
    "Social media strategy and account management",
    "Content calendar planning",
    "Static creative and carousel design",
    "Reels and short-form videos",
    "Community management",
    "Social media performance reporting",
  ],
  // Working copy: answers describe the service scope only. Confirm before launch.
  faqs: [
    {
      question: "Which social media platforms do you manage?",
      answer:
        "We recommend the platforms that suit your audience and goals as part of your social media strategy, then manage them for you.",
    },
    {
      question: "Do you create the content as well as post it?",
      answer:
        "Yes. Content calendar planning, static and carousel creatives, and reels are all part of the service.",
    },
    {
      question: "Do you reply to comments and messages?",
      answer:
        "Community management is included. We agree response guidelines with you, including which conversations should come to your team.",
    },
    {
      question: "How do you report on social media performance?",
      answer:
        "We provide performance reports focused on the measures that matter to your goals, not just likes and follower counts.",
    },
  ],
  cta: {
    heading: { lead: "Ready to Grow Your", accent: "Social Presence?" },
    supporting: "Share your channels and goals, and we’ll recommend a plan that fits.",
  },
};
