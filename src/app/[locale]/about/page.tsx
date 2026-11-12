import { AboutPage } from "@/components/portfolio/about-page";
import { PortfolioShell } from "@/components/portfolio/shell";
import { getCopy } from "@/content/portfolio/copy";
import { portfolioMetadata, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return portfolioMetadata(
    locale,
    "/about",
    getCopy(locale).about,
    getCopy(locale).aboutIntro,
  );
}
export default async function About({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return (
    <PortfolioShell locale={locale} path="/about">
      <AboutPage locale={locale} />
    </PortfolioShell>
  );
}
