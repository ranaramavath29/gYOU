import { serviceHref, services } from "./services";

/**
 * Navigation and interface labels. Nav labels, CTA wording and routes follow
 * docs/BUILD_PROMPT.md (Sitemap and routes) and the brief (§5).
 */
export type NavLink = { label: string; href: string };

/**
 * Set to true once the first case study is published (content/case-studies).
 * Until then "Our Work" stays out of the header and footer (PAUSE 5 decision);
 * /our-work still exists and shows a "coming soon" state, noindex.
 */
export const showOurWorkInNav = false;

/** Set to true once the first Insights post is published (PAUSE 6 decision). */
export const showInsightsInNav = false;

const allNav: ReadonlyArray<NavLink & { hidden?: boolean }> = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work", hidden: !showOurWorkInNav },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights", hidden: !showInsightsInNav },
  { label: "Contact Us", href: "/contact" },
];

export const primaryNav: readonly NavLink[] = allNav
  .filter((item) => !item.hidden)
  .map(({ label, href }) => ({ label, href }));

export const navCta: NavLink = { label: "Let’s Discuss Your Project", href: "/contact#enquiry" };

export const footerNav = {
  quickLinksTitle: "Explore",
  quickLinks: primaryNav,
  servicesTitle: "Services",
  services: services.map((s) => ({ label: s.name, href: serviceHref(s.slug) })),
  contactTitle: "Contact",
  socialTitle: "Follow",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
} as const;

/** Accessibility and interface labels (not business facts). */
export const uiLabels = {
  breadcrumb: "Breadcrumb",
  /** Prefix on process step cards: "Step 1". */
  processStep: "Step",
  /** Screen-reader label for social icon links: "gYOU on LinkedIn (opens in a new tab)". */
  socialLink: (site: string, platform: string) => `${site} on ${platform} (opens in a new tab)`,
  home: "Home",
  skipToContent: "Skip to content",
  homeLink: "gYOU home",
  primaryNav: "Primary",
  footerNav: "Footer",
  legalNav: "Legal",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menu: "Menu",
  whatsapp: "Chat with gYOU on WhatsApp",
  email: "Email",
  phone: "Phone",
  whatsappShort: "WhatsApp",
  phoneAndWhatsapp: "Call or WhatsApp",
  call: "Call",
  servicesMenu: "Show services menu",
  allServices: "All services",
  featured: "Featured",
  menuContact: "Talk to us",
  address: "Office",
  copyright: (year: number, name: string) => `© ${year} ${name}. All rights reserved.`,
} as const;
