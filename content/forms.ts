import { industryList } from "./industries";
import { services } from "./services";

/**
 * Form copy and options (Phase 7). Working copy: budget bands, consent wording
 * and messages were set as defaults when gYOU asked to proceed without the
 * PAUSE 7 answers. Review before launch, especially the consent text (legal).
 */

export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.shortName }));

export const industryOptions = [
  ...industryList.map((i) => ({ value: i.slug, label: i.name })),
  { value: "other", label: "Other" },
];

// Default monthly budget bands in ₹ (PAUSE 7, question 2). Replace if needed.
export const budgetOptions = [
  { value: "under-50k", label: "Under ₹50,000" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000" },
  { value: "1l-3l", label: "₹1,00,000 – ₹3,00,000" },
  { value: "3l-5l", label: "₹3,00,000 – ₹5,00,000" },
  { value: "above-5l", label: "Above ₹5,00,000" },
  { value: "not-sure", label: "Not sure yet" },
];

export const formCopy = {
  required: "This field is required.",
  invalidEmail: "Enter a valid email address.",
  invalidPhone: "Enter a valid phone or WhatsApp number, including country code if outside India.",
  invalidUrl: "Enter a valid website address, for example https://example.com",
  sending: "Sending…",
  error:
    "Something went wrong and your enquiry was not sent. Please try again, or reach us on WhatsApp.",
  /** Hidden anti-spam field label (screen readers are told to skip it). */
  honeypotLabel: "Leave this field empty",
  consent:
    "I agree that gYOU may contact me about this enquiry and process my details as described in the Privacy Policy.",
  consentRequired: "Please confirm so we can respond to your enquiry.",

  enquiry: {
    heading: { lead: "Tell Us About", accent: "Your Project" },
    intro: "Three short steps. It takes about two minutes.",
    progress: (step: number, total: number) => `Step ${step} of ${total}`,
    steps: ["What do you need?", "About your business", "Your contact details"],
    servicesLegend: "Which services are you interested in?",
    servicesError: "Choose at least one service.",
    company: "Company name",
    website: "Website",
    industry: "Industry",
    industryPlaceholder: "Select your industry",
    budget: "Monthly marketing budget",
    budgetPlaceholder: "Select a range",
    details: "Project details",
    detailsHint: "What are you looking to achieve? Any timelines we should know about?",
    detailsError: "Tell us a little more (at least 20 characters).",
    fullName: "Full name",
    email: "Business email",
    phone: "Phone or WhatsApp number",
    back: "Back",
    next: "Continue",
    submit: "Send enquiry",
  },
  /** Quick callback bar under the homepage hero (Studio Daylight layout). Working copy. */
  callback: {
    heading: "Prefer a quick call?",
    intro: "Leave your details and we’ll call you back to talk about your goals.",
    fullName: "Your name",
    email: "Business email",
    phone: "Phone or WhatsApp",
    service: "What do you need?",
    servicePlaceholder: "Choose a service",
    submit: "Get a callback",
  },
  audit: {
    heading: { lead: "Request a Free", accent: "Website Audit" },
    intro:
      "Share your website and email. We’ll review it and get back to you with the first improvements we’d recommend.",
    website: "Your website",
    email: "Business email",
    submit: "Request audit",
  },
} as const;

/** Thank-you page messages per form (?form=<key>). No response-time promise is made. */
export const thankYouCopy = {
  heading: { lead: "Thank", accent: "You." },
  default: "We’ve received your message and will be in touch.",
  byForm: {
    enquiry:
      "We’ve received your enquiry. Our team will review your project details and get in touch.",
    consultation: "We’ve received your request for a free consultation and will be in touch.",
    audit: "We’ve received your audit request. We’ll review your website and get back to you.",
    callback: "We’ve received your callback request and will be in touch.",
  } as Record<string, string>,
  next: "While you wait",
  links: [
    { label: "Explore our services", href: "/services" },
    { label: "Learn about gYOU", href: "/about-us" },
  ],
  home: "Back to home",
  metaTitle: "Thank You",
} as const;

/**
 * Pre-filled WhatsApp messages (PAUSE 7, question 4). Default wording; the
 * floating button picks the message for the current page.
 */
export const whatsappMessages = {
  default: "Hi gYOU, I’d like to know more about your services.",
  service: (serviceName: string) => `Hi gYOU, I’d like to discuss ${serviceName} for my business.`,
  contact: "Hi gYOU, I’d like to discuss a project.",
} as const;
