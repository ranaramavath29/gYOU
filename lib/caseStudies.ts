import { readdirSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { z } from "zod";
import type { CaseStudyCardData } from "@/components/case-studies/CaseStudyCard";
import { industryName, industrySlugs } from "@/content/industries";
import { serviceBySlug, services, type ServiceSlug } from "@/content/services";

/**
 * Case studies: one MDX file per project in content/case-studies/<slug>.mdx.
 * Typed frontmatter is an `export const metadata = { ... }` block at the top
 * of each file, validated here at build time. The MDX body is the long-form story.
 *
 * Publishing rules (brief §6 Section 07, PAUSE 5) are enforced by the schema:
 * - permissionConfirmed must be true unless the file is a draft
 * - every result needs the period and how it was measured
 * Drafts render only in development or when SHOW_DRAFTS=1 (never on launch).
 * Files starting with "_" are ignored.
 */

const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];
const text = z.string().trim().min(1);
const image = z.object({ src: text, alt: text });

export const caseStudySchema = z
  .object({
    title: text,
    /** Client name, or an anonymised description ("A Hyderabad real-estate developer"). */
    client: text,
    anonymised: z.boolean().default(false),
    /** gYOU has the client's written permission to publish. */
    permissionConfirmed: z.boolean(),
    industry: z.enum(industrySlugs),
    services: z.array(z.enum(serviceSlugs)).min(1),
    summary: text,
    objective: text,
    challenge: text,
    strategy: text,
    results: z
      .array(
        z.object({
          value: text,
          label: text,
          /** e.g. "First 90 days of the campaign" */
          period: text,
          /** e.g. "Google Analytics 4 conversions" */
          measuredBy: text,
        }),
      )
      .default([]),
    cover: image.optional(),
    gallery: z.array(image).default([]),
    testimonial: z.object({ quote: text, name: text, designation: text, company: text }).optional(),
    /** ISO date, YYYY-MM-DD */
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
    /** Lower numbers appear first. */
    order: z.number().optional(),
    draft: z.boolean().default(false),
  })
  .refine((d) => d.draft || d.permissionConfirmed, {
    message: "permissionConfirmed must be true before a case study can be published",
    path: ["permissionConfirmed"],
  });

export type CaseStudyMeta = z.infer<typeof caseStudySchema> & { slug: string };
export type LoadedCaseStudy = { meta: CaseStudyMeta; Content: ComponentType };

const DIR = path.join(process.cwd(), "content", "case-studies");
const SHOW_DRAFTS = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "1";

function listSlugs(): string[] {
  try {
    return readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
      .map((f) => f.slice(0, -".mdx".length));
  } catch {
    return [];
  }
}

async function load(slug: string): Promise<LoadedCaseStudy> {
  const mod = (await import(`../content/case-studies/${slug}.mdx`)) as {
    default: ComponentType;
    metadata?: unknown;
  };
  const parsed = caseStudySchema.safeParse(mod.metadata);
  if (!parsed.success) {
    throw new Error(`Case study "${slug}" is invalid:\n${z.prettifyError(parsed.error)}`);
  }
  return { meta: { ...parsed.data, slug }, Content: mod.default };
}

/** Published case studies (plus drafts in development), in display order. */
export async function getCaseStudies(): Promise<CaseStudyMeta[]> {
  const loaded = await Promise.all(listSlugs().map(load));
  return loaded
    .map((l) => l.meta)
    .filter((m) => SHOW_DRAFTS || !m.draft)
    .sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999) || b.publishedAt.localeCompare(a.publishedAt),
    );
}

export async function getCaseStudy(slug: string): Promise<LoadedCaseStudy | null> {
  if (!listSlugs().includes(slug)) return null;
  const loaded = await load(slug);
  if (loaded.meta.draft && !SHOW_DRAFTS) return null;
  return loaded;
}

export const caseStudyHref = (slug: string) => `/case-studies/${slug}`;

/** Serializable card data (safe to pass to client components). */
export function toCardData(cs: CaseStudyMeta): CaseStudyCardData {
  return {
    slug: cs.slug,
    href: caseStudyHref(cs.slug),
    title: cs.title,
    client: cs.client,
    summary: cs.summary,
    industry: cs.industry,
    industryName: industryName(cs.industry),
    services: cs.services,
    serviceNames: cs.services.map((s) => serviceBySlug(s).shortName),
    cover: cs.cover,
    draft: cs.draft,
  };
}
