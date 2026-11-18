import { OG_ALT } from "@/app/og/alt";
import { UmamiAnalytics } from "@/components/analytics/umami";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { getPortfolio } from "@/content/portfolio";
import { SITE } from "@/lib/constants";
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
    { media: "(prefers-color-scheme: dark)", color: "#12161c" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { identity } = getPortfolio(locale);
  const title = `${identity.name} · ${identity.role}`;
  const description = identity.intro;

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
      suppressHydrationWarning
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
        {process.env.VERCEL === "1" && <SpeedInsights />}
        <UmamiAnalytics />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
