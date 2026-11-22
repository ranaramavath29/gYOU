import { serviceHref, services } from "./services";
import { servicesOverview } from "./services/shared";

/**
 * Hover panel for the desktop nav's Services item: one card per service,
 * each linking to that service's page. Other nav items are plain links.
 */
export type NavSection = { label: string; description: string; href: string };
export type NavMenu = {
  title: string;
  /** Optional italic accent word(s) after the title, in lime. */
  accent?: string;
  /** Shown after the count, top right: "6 services". */
  countLabel: string;
  intro: string;
  sections: readonly NavSection[];
};

export const servicesMenu: NavMenu = {
  title: "Our",
  accent: "services",
  countLabel: "services",
  intro: servicesOverview.supporting,
  sections: services.map((s) => ({
    label: s.name,
    description: s.summary,
    href: serviceHref(s.slug),
  })),
};
