import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legalPages } from "@/content/legal";
import Content from "@/content/legal/terms-and-conditions.mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: legalPages["terms-and-conditions"].title,
  description: legalPages["terms-and-conditions"].description,
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return <LegalPage page="terms-and-conditions" Content={Content} />;
}
