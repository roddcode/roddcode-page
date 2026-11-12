import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const contentDirectory = path.join(process.cwd(), "src/content/writing");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PostMetadataSchema = z.object({
  title: z.string().trim().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((date) => {
      const parsed = new Date(date);
      return (
        Number.isFinite(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date
      );
    }, "Use a real calendar date in YYYY-MM-DD format"),
  summary: z.string().trim().min(1),
  slug: z.string().optional(),
  draft: z.boolean().default(false),
  themes: z.array(z.string()).optional().default([]),
  series: z.string().optional(),
  kind: z.enum(["essay", "technical-note", "research-note"]).optional(),
  readingTime: z.number().optional(),
});
export type PostMetadata = z.infer<typeof PostMetadataSchema>;

export function parsePostSource(slug: string, source: string) {
  if (!slugPattern.test(slug)) throw new Error(`Invalid article slug: ${slug}`);
  const { data, content } = matter(source);
  if (data.slug && data.slug !== slug)
    throw new Error(`Article ${slug}: frontmatter slug must match filename`);
  if (!content.trim()) throw new Error(`Article ${slug}: body is empty`);
  const readingTime = Math.max(
    1,
    Math.ceil(content.split(/\s+/).filter(Boolean).length / 200),
  );
  const result = PostMetadataSchema.safeParse({ ...data, slug, readingTime });
  if (!result.success)
    throw new Error(`Article ${slug}: ${result.error.message}`);
  return { slug, meta: result.data, content, readingTime };
}

function loadPost(slug: string) {
  if (!slugPattern.test(slug)) throw new Error(`Post not found: ${slug}`);
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  return parsePostSource(slug, fs.readFileSync(fullPath, "utf8"));
}

export function getPostBySlug(slug: string) {
  const post = loadPost(slug);
  if (post.meta.draft) throw new Error(`Post not found: ${slug}`);
  return post;
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => loadPost(file.slice(0, -4)).meta)
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        (a.slug ?? "").localeCompare(b.slug ?? ""),
    );
}

export function getRelatedPosts(
  slug: string,
  posts: PostMetadata[],
  count = 2,
): PostMetadata[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current?.themes?.length) return [];
  return posts
    .filter((p) => p.slug !== slug && p.themes?.length)
    .map((post) => ({
      post,
      score: post.themes.filter((t) => current.themes.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((p) => p.post);
}
