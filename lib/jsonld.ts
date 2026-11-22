import type { Faq } from "@/content/services/types";
import { site } from "@/content/site";
import { isPlaceholder } from "./ph";
import { absoluteUrl, SITE_URL } from "./siteUrl";

/**
 * Structured data builders (Phase 8). Only confirmed facts are used:
 * LocalBusiness appears only because a real address was supplied, FAQPage
 * only where the FAQs are visible on the page.
 */

const ORG_ID = `${SITE_URL}/#organization`;

function sameAs(): string[] {
  return isPlaceholder(site.socials) ? [] : site.socials.map((s) => s.href);
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    slogan: site.tagline,
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    ...(isPlaceholder(site.phone) ? {} : { telephone: site.phone.replace(/\s/g, "") }),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

/** ProfessionalService (a LocalBusiness subtype). Null when no real address exists. */
export function localBusinessLd() {
  if (!site.postalAddress) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: site.name,
    url: SITE_URL,
    image: absoluteUrl("/og"),
    description: site.footerDescription,
    parentOrganization: { "@id": ORG_ID },
    address: { "@type": "PostalAddress", ...site.postalAddress },
    areaServed: { "@type": "City", name: site.primaryMarket },
    ...(isPlaceholder(site.email) ? {} : { email: site.email }),
    ...(isPlaceholder(site.phone) ? {} : { telephone: site.phone.replace(/\s/g, "") }),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
  deliverables: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: site.primaryMarket },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: input.name,
      itemListElement: input.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

export function breadcrumbLd(items: ReadonlyArray<{ label: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author:
      input.author === site.name || /team$/i.test(input.author)
        ? { "@id": ORG_ID }
        : { "@type": "Person", name: input.author },
    publisher: { "@id": ORG_ID },
    image: input.image
      ? absoluteUrl(input.image)
      : absoluteUrl(`/og?title=${encodeURIComponent(input.title)}`),
  };
}
