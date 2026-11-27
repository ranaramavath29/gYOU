/**
 * Legal pages. Text lives in content/legal/*.mdx. Privacy Policy and Terms were
 * drafted 25 Nov 2026 at gYOU's request from its business scope and the site's
 * real data handling, and approved by gYOU on 25 Nov 2026. Cookie
 * information is part of the Privacy Policy (#cookies); there is no separate
 * Cookie Policy (removed at gYOU's request).
 */
export type LegalPageKey = "privacy-policy" | "terms-and-conditions";

export const legalPages: Record<
  LegalPageKey,
  {
    title: string;
    /** <title> (the layout adds " | gYOU Digital"). */
    seoTitle: string;
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
    seoTitle: "Privacy Policy and Cookie Information",
    description:
      "How gYOU Digital collects, uses and protects personal information, including cookies.",
    lastUpdated: "2026-11-25",
    pending: false,
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    seoTitle: "Website Terms and Conditions",
    description:
      "The terms for using the gYOU Digital website, including how engagements are agreed, free audits, results and intellectual property.",
    lastUpdated: "2026-11-25",
    pending: false,
  },
};

export const legalLabels = {
  lastUpdated: "Last updated",
  pendingTitle: "This policy is being finalised",
  pendingBody:
    "We’re finalising this document with our advisers and will publish it here soon. If you have a question about it, or about how we handle information you share with us, email us.",
} as const;
