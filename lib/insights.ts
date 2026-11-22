import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { z } from "zod";
import type { PostCardData } from "@/components/insights/PostCard";
import { categoryName, insightCategorySlugs, insightsCopy } from "@/content/insights";

/**
 * Insights posts: one MDX file per post in content/insights/<slug>.mdx, with an
 * `export const metadata = { ... }` block validated here at build time.
 * Drafts render only in development or when SHOW_DRAFTS=1. Files starting
 * with "_" are ignored.
 */

const text = z.string().trim().min(1);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

export const postSchema = z.object({
  title: text,
  /** One or two sentences; used on cards and as the meta description. */
  description: text,
  category: z.enum(insightCategorySlugs),
  /** A real person who agreed to be named, or the default team byline. */
  author: text.default(insightsCopy.defaultAuthor),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  cover: z.object({ src: text, alt: text }).optional(),
  draft: z.boolean().default(false),
});

export type PostMeta = z.infer<typeof postSchema> & { slug: string; readingMinutes: number };
export type LoadedPost = { meta: PostMeta; Content: ComponentType };

const DIR = path.join(process.cwd(), "content", "insights");
const SHOW_DRAFTS = process.env.NODE_ENV === "development" || process.env.SHOW_DRAFTS === "1";
const WORDS_PER_MINUTE = 200;

function listSlugs(): string[] {
  try {
    return readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
      .map((f) => f.slice(0, -".mdx".length));
  } catch {
    return [];
  }
}

/** Words in the post body (metadata block and MDX comments removed). */
function readingMinutes(slug: string): number {
  const raw = readFileSync(path.join(DIR, `${slug}.mdx`), "utf8")
    .replace(/export const metadata\s*=\s*\{[\s\S]*?\n\};?/, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/[#*_>`[\]()-]/g, " ");
  const words = raw.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

async function load(slug: string): Promise<LoadedPost> {
  const mod = (await import(`../content/insights/${slug}.mdx`)) as {
    default: ComponentType;
    metadata?: unknown;
  };
  const parsed = postSchema.safeParse(mod.metadata);
  if (!parsed.success) {
    throw new Error(`Insights post "${slug}" is invalid:\n${z.prettifyError(parsed.error)}`);
  }
  return {
    meta: { ...parsed.data, slug, readingMinutes: readingMinutes(slug) },
    Content: mod.default,
  };
}

/** Published posts (plus drafts in development), newest first. */
export async function getPosts(): Promise<PostMeta[]> {
  const loaded = await Promise.all(listSlugs().map(load));
  return loaded
    .map((l) => l.meta)
    .filter((m) => SHOW_DRAFTS || !m.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<LoadedPost | null> {
  if (!listSlugs().includes(slug)) return null;
  const loaded = await load(slug);
  if (loaded.meta.draft && !SHOW_DRAFTS) return null;
  return loaded;
}

export const postHref = (slug: string) => `/insights/${slug}`;

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

/** Serializable card data (safe to pass to client components). */
export function toPostCard(p: PostMeta): PostCardData {
  return {
    slug: p.slug,
    href: postHref(p.slug),
    title: p.title,
    description: p.description,
    category: p.category,
    categoryName: categoryName(p.category),
    date: formatDate(p.publishedAt),
    isoDate: p.publishedAt,
    readingTime: insightsCopy.readingTime(p.readingMinutes),
    cover: p.cover,
    draft: p.draft,
  };
}
