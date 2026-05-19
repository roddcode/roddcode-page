import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const contentDirectory = path.join(process.cwd(), "src/content/writing");

const PostMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  slug: z.string(),
});

export type PostMetadata = z.infer<typeof PostMetadataSchema>;

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const meta = PostMetadataSchema.parse({ ...data, slug: realSlug });

  return {
    slug: realSlug,
    meta,
    content,
  };
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { meta } = getPostBySlug(file);
      return meta;
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  return posts;
}
