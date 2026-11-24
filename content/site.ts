import type { Placeholder } from "@/lib/ph";

/**
 * Site-wide business details. Only confirmed facts go in as plain strings.
 * Anything not yet supplied by gYOU stays as ph(...).
 */
export type SocialLink = { label: string; href: string };

export type SiteContent = {
  name: string;
  domain: string;
  tagline: string;
  /** Primary target market (confirmed at PAUSE 2). */
  primaryMarket: string;
  /** Full logo image path, or "wordmark" to render the SVG mark and text. */
  logo: "wordmark" | `/${string}` | Placeholder;
  footerDescription: string | Placeholder;
  email: string | Placeholder;
  /** Display format; links are built from the digits. */
  phone: string | Placeholder;
  /** Display format; links are built from the digits. */
  whatsapp: string | Placeholder;
  /** Postal address lines, or null to show no address. */
  address: readonly string[] | Placeholder | null;
  /** Only profiles that exist. */
  socials: readonly SocialLink[] | Placeholder;
  /** Structured address for LocalBusiness JSON-LD (same office as `address`). */
  postalAddress: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  } | null;
};

export const site: SiteContent = {
  name: "gYOU Digital",
  domain: "gyoudigital.com",
  tagline: "Think Digital. Grow Smarter.",
  primaryMarket: "Hyderabad",
  logo: "/gyou-logo-light.png",
  // Drafted from the brief's positioning at gYOU's request (PAUSE 2). Awaiting approval.
  footerDescription:
    "Helping businesses build a stronger digital presence through strategic marketing and website solutions.",
  // Confirmed at PAUSE 2.
  email: "support@gyoudigital.com",
  phone: "+91 96666 96153",
  whatsapp: "+91 96666 96153",
  address: [
    "Building No. 12, Main Street",
    "Near Durgam Cheruvu Metro, Madhapur",
    "Hyderabad 500081",
  ],
  socials: [{ label: "Facebook", href: "https://www.facebook.com/share/1FzqVuKcek/" }],
  // From the PAUSE 2 address. Madhapur, Hyderabad is in Telangana.
  postalAddress: {
    streetAddress: "Building No. 12, Main Street, Near Durgam Cheruvu Metro, Madhapur",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
};
