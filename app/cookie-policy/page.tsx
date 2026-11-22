import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalPages } from "@/content/legal";
import Content from "@/content/legal/cookie-policy.mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: legalPages["cookie-policy"].title,
  description: legalPages["cookie-policy"].description,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return <LegalPage page="cookie-policy" Content={Content} />;
}
