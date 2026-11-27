import { site } from "./site";

/** Contact page copy (Phase 6). Contact details themselves live in content/site.ts. */
export const contactPage = {
  heading: { lead: "Let’s Talk About", accent: "Your Growth." },
  supporting:
    "Tell us about your business and goals. Reach us on WhatsApp, by phone or by email, or send us your project details using the form below.",
  methodsHeading: { lead: "Ways to", accent: "Reach Us" },
  methodsIntro:
    "Whether you need a new website, more qualified enquiries from Google and Meta Ads, stronger SEO or a consistent social media presence, start with a conversation. Share where your business is today and what you want to achieve, and we’ll suggest practical next steps.",
  methods: {
    combined: {
      title: "Call or WhatsApp",
      detail: "One number for both. Call us, or send a WhatsApp message and we’ll reply there.",
    },
    whatsapp: { title: "WhatsApp", action: "Chat on WhatsApp" },
    phone: { title: "Call us", action: "Call now" },
    email: { title: "Email", action: "Send an email" },
    office: { title: "Visit", action: "Open in Google Maps" },
  },
  // The enquiry form's heading and copy live in content/forms.ts.
  /** Discovery-call booking link (Calendly, Cal.com…). null hides the block (PAUSE 6). */
  bookingUrl: null as string | null,
  bookingLabel: "Book a discovery call",
  heroCta: "Send Your Project Details",
  metaTitle: "Contact Us",
  /** <title> (the layout adds " | gYOU Digital"). */
  seoTitle: "Contact a Hyderabad Digital Marketing Agency",
  metaDescription: `Contact gYOU Digital, a digital marketing and website design agency in ${site.primaryMarket}. Reach us by WhatsApp, phone or email, or send your project details.`,
} as const;

/** Google Maps search link for the office address (a link, not an embed, so no third-party cookies). */
export function mapsHref(address: readonly string[]): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(", "))}`;
}
