import { type Locale, getPortfolio } from "@/content/portfolio";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pathFor } from "./paths";

export { CV, pathFor } from "./paths";
export function resolveLocale(value: string): Locale {
  if (value !== "es" && value !== "en") notFound();
  return value;
}
export function portfolioMetadata(
  locale: Locale,
  path: string,
  title: string,
  description?: string,
): Metadata {
  const identity = getPortfolio(locale).identity;
  const pageTitle = `${title} · ${identity.name}`;
  const desc = description ?? identity.intro;
  return {
    title: pageTitle,
    description: desc,
    alternates: {
      canonical: pathFor(locale, path),
      languages: { es: pathFor("es", path), en: pathFor("en", path) },
    },
    openGraph: {
      title: pageTitle,
      description: desc,
      url: pathFor(locale, path),
      type: "website",
      siteName: "roddcode",
      images: [{ url: `${SITE.url}/og/${locale}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
      images: [`${SITE.url}/og/${locale}`],
    },
  };
}
