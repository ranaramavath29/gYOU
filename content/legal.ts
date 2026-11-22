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
  }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How gYOU collects, uses and protects personal information.",
    lastUpdated: null,
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    description: "The terms that apply to the use of the gYOU website.",
    lastUpdated: null,
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "How the gYOU website uses cookies and similar technologies.",
    lastUpdated: null,
  },
};

export const legalLabels = { lastUpdated: "Last updated" } as const;
