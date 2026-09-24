import { JsonLd } from "@/components/json-ld";
import {
  ChromeFooter,
  ChromeHeader,
  ChromeNoise,
} from "@/components/site-chrome";
import { SITE } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyMotion, domAnimation } from "framer-motion";
import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";
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

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "optional",
  preload: false,
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "RoddCode",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased relative">
        <noscript>
          <style
            // biome-ignore lint/security/noDangerouslySetInnerHtml: rescate estático para navegación sin JS
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded-sm"
        >
          Saltar al contenido
        </a>
        <ChromeNoise />
        <LazyMotion features={domAnimation} strict>
          <ChromeHeader />
          <main id="main-content">{children}</main>
          <JsonLd />
          <SpeedInsights />
          <Analytics />
          <ChromeFooter />
        </LazyMotion>
      </body>
    </html>
  );
}
