import type { MediaSource } from "@/components/ui/MediaFrame";
import type { Heading } from "../home";
import type { ServiceSlug } from "./index";

export type Point = { title: string; description: string };
export type Faq = { question: string; answer: string };

/**
 * Content for one service page (docs/BUILD_PROMPT.md → Phase 4).
 * Section headings shared by all services live in ./shared.ts.
 */
export type ServicePageContent = {
  slug: ServiceSlug;
  /** Search result description, 160 characters or fewer. */
  metaDescription: string;
  hero: {
    heading: Heading;
    supporting: string;
    /** Photo or video beside the hero copy. */ media?: MediaSource;
  };
  intro: { heading: Heading; paragraphs: readonly string[] };
  /** Heading above the challenges (unique per service). */
  challengesHeading: Heading;
  /** Business challenges this service addresses. */
  challenges: readonly Point[];
  /** How gYOU approaches them. */
  solutions: readonly Point[];
  /** From the brief (§4 / §7). Confirm at PAUSE 4. */
  deliverables: readonly string[];
  /** Show the free website / marketing audit request form on this page. */
  auditForm?: boolean;
  /** Real FAQs with gYOU's own answers only (PAUSE 4). Section hidden while empty. */
  faqs: readonly Faq[];
  cta: { heading: Heading; supporting: string };
};
