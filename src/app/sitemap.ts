import { getPortfolio } from "@/content/portfolio";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { pathFor } from "@/lib/paths";
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
      alternates: {
        languages: {
          es: `${baseUrl}/privacidad`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/seguridad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/seguridad`,
          en: `${baseUrl}/en/security`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacidad`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/security`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/seguridad`,
          en: `${baseUrl}/en/security`,
        },
      },
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = (["es", "en"] as const).flatMap(
    (locale) =>
      [
        "/work",
        "/about",
        ...getPortfolio(locale).projects.map(
          (project) => `/work/${project.slug}`,
        ),
      ].map((path) => ({
        url: new URL(pathFor(locale, path), baseUrl).href,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            es: new URL(pathFor("es", path), baseUrl).href,
            en: new URL(pathFor("en", path), baseUrl).href,
          },
        },
      })),
  );
  return [...staticPages, ...portfolioPages, ...postPages];
}
