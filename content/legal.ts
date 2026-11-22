/**
 * Legal pages (Phase 6). The text itself lives in content/legal/*.mdx and must
 * be supplied by gYOU's legal adviser: no legal copy is generated here.
 * Until then each file holds a placeholder, which blocks production builds.
 */
export type LegalPageKey = "privacy-policy" | "terms-and-conditions" | "cookie-policy";

export const legalPages: Record<
  LegalPageKey,
  {
    title: string;
    description: string;
    /** ISO date of the adviser-approved version, or null. */ lastUpdated: string | null;
    /**
     * true while the approved text has not been supplied: the page shows
     * legalLabels.pending instead of the MDX placeholder. Set to false when
     * the adviser-approved text replaces the .mdx file.
     */
    pending: boolean;
  }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How gYOU collects, uses and protects personal information.",
    lastUpdated: null,
    pending: true,
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    description: "The terms that apply to the use of the gYOU website.",
    lastUpdated: null,
    pending: true,
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "How the gYOU website uses cookies and similar technologies.",
    lastUpdated: null,
    pending: true,
  },
};

export const legalLabels = {
  lastUpdated: "Last updated",
  pendingTitle: "This policy is being finalised",
  pendingBody:
    "We’re finalising this document with our advisers and will publish it here soon. If you have a question about it, or about how we handle information you share with us, email us.",
} as const;
