import type { Placeholder } from "@/lib/ph";

/**
 * Site-wide business details. Only confirmed facts go in as plain strings.
 * Anything not yet supplied by gYOU stays as ph(...).
 */
export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "x";
export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Public handle shown next to the icon where there is room, e.g. "@gyoudigital". */
  handle?: string;
};

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
  /**
   * Structured address for LocalBusiness JSON-LD (same office as `address`).
   * Street and postal code are optional so a city-level address can be used.
   */
  postalAddress: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  } | null;
};

export const site: SiteContent = {
  name: "gYOU Digital",
  domain: "gyoudigital.com",
  tagline: "Think Digital. Grow Smarter.",
  primaryMarket: "Hyderabad",
  logo: "/brand/gyou-logo.svg",
  // Drafted from the brief's positioning at gYOU's request (PAUSE 2). Awaiting approval.
  footerDescription:
    "Helping businesses build a stronger digital presence through strategic marketing and website solutions.",
  // Confirmed at PAUSE 2.
  email: "support@gyoudigital.com",
  phone: "+91 96666 96153",
  whatsapp: "+91 96666 96153",
  // Street address hidden 26 Nov 2026 at gYOU's request until it is confirmed to match the
  // Google Business Profile (previously: Building No. 12, Main Street, Near Durgam Cheruvu
  // Metro, Madhapur, Hyderabad 500081). Restore the lines here and in postalAddress below.
  address: null,
  // Public profile URLs (the LinkedIn admin dashboard link is not public, so the
  // company page URL is used). Order: most important for B2B first.
  socials: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/145511224/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/gyoudigital/",
      handle: "@gyoudigital",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61596724598139",
    },
    { platform: "x", label: "X", href: "https://x.com/gYOUdigital", handle: "@gYOUdigital" },
  ],
  // City-level only while the street address is being confirmed (see `address`).
  postalAddress: {
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};
