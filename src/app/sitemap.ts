import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const baseUrl = SITE.url;
  const now = new Date();
  const languages = { es: baseUrl, en: `${baseUrl}/en` };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/seguridad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
