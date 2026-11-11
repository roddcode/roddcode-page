import { SITE } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/design-preview", "/en/design-preview"],
    },
    sitemap: new URL("/sitemap.xml", SITE.url).href,
  };
}
