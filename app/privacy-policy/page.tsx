import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalPages } from "@/content/legal";
import Content from "@/content/legal/privacy-policy.mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: legalPages["privacy-policy"].title,
  description: legalPages["privacy-policy"].description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage page="privacy-policy" Content={Content} />;
}
