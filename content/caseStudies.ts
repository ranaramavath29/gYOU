import { ctas } from "./home";

/** Copy for /our-work and the case study template (Phase 5). Working copy. */
export const ourWork = {
  heading: { lead: "Our", accent: "Work" },
  supporting: "Selected projects, published with our clients’ permission.",
  filters: {
    industry: "Industry",
    service: "Service",
    all: "All",
    clear: "Clear filters",
    results: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    none: "No projects match these filters yet.",
  },
  // Shown while no case study is published. The page is also noindex then.
  empty: {
    heading: { lead: "Case Studies", accent: "Coming Soon" },
    body: "We’re preparing detailed case studies of our work, and we publish them only with our clients’ permission. In the meantime, explore our services or tell us about your project.",
    primary: ctas.primary,
    secondary: ctas.services,
  },
  metaTitle: "Our Work",
  metaDescription:
    "Case studies from gYOU: website design and digital marketing projects, published with our clients’ permission.",
} as const;

export const caseStudyLabels = {
  breadcrumbHome: "Home",
  breadcrumbWork: "Our Work",
  breadcrumbLabel: "Breadcrumb",
  client: "Client",
  industry: "Industry",
  services: "Services",
  objective: "Objective",
  challenge: "The challenge",
  strategy: "Our strategy",
  storyHeading: { lead: "The", accent: "Story" },
  galleryHeading: { lead: "Creative", accent: "Highlights" },
  resultsHeading: { lead: "The", accent: "Results" },
  period: "Period",
  measuredBy: "Measured by",
  testimonialHeading: "Client testimonial",
  next: "Next project",
  draftBanner: "Draft preview. Drafts are never shown on the live site.",
  relatedHeading: { lead: "Related", accent: "Work" },
  cta: {
    heading: { lead: "Want Results Like", accent: "These?" },
    supporting: "Tell us about your goals and we’ll show you how we would approach them.",
  },
} as const;
