import { OG_ALT } from "@/app/og/alt";
import { JsonLd } from "@/components/json-ld";
import { getContent } from "@/content/home";
import { SITE } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1411" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getContent(locale);
  const title = `Alejandro Alvarado · ${t.hero.role}`;
  const description = t.hero.sub;

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: locale === "es" ? "/" : "/en",
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      siteName: "RoddCode",
      title,
      description,
      images: [
        {
          url: locale === "es" ? "/og/es" : "/og/en",
          width: 1200,
          height: 630,
          alt: OG_ALT[locale === "es" ? "es" : "en"],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: locale === "es" ? "/og/es" : "/og/en",
          alt: OG_ALT[locale === "es" ? "es" : "en"],
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="relative min-h-screen bg-paper font-sans text-ink antialiased">
        <noscript>
          <style
            // biome-ignore lint/security/noDangerouslySetInnerHtml: rescate estático para navegación sin JS
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <JsonLd locale={locale} />
        <SpeedInsights />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
