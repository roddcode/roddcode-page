import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const contentDirectory = path.join(process.cwd(), "src/content/writing");

const PostMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  slug: z.string().optional(),
  themes: z.array(z.string()).optional().default([]),
  series: z.string().optional(),
});

export type PostMetadata = z.infer<typeof PostMetadataSchema>;

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = PostMetadataSchema.parse({ ...data, slug: realSlug });

  return { slug: realSlug, meta, content };
}

export function getAllPosts(includeDrafts = false): PostMetadata[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith(".mdx") && (includeDrafts || !file.startsWith("_")))
    .map((file) => {
      const { meta } = getPostBySlug(file);
      return meta;
    })
    .sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1));

  return posts;
}

export function getRelatedPosts(
  slug: string,
  posts: PostMetadata[],
  count = 2
): PostMetadata[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current?.themes?.length) return [];

  return posts
    .filter((p) => p.slug !== slug && p.themes?.length)
    .map((p) => ({
      post: p,
      score: p.themes.filter((t: string) => current.themes.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((p) => p.post);
}
