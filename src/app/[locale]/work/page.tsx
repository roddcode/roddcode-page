import { Contact } from "@/components/portfolio/contact";
import { PortfolioShell } from "@/components/portfolio/shell";
import { WorkIndex } from "@/components/portfolio/work-index";
import { getCopy } from "@/content/portfolio/copy";
import { portfolioMetadata, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return portfolioMetadata(
    locale,
    "/work",
    getCopy(locale).work,
    getCopy(locale).workIntro,
  );
}
export default async function Work({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return (
    <PortfolioShell locale={locale} path="/work">
      <WorkIndex locale={locale} />
      <Contact locale={locale} />
    </PortfolioShell>
  );
}
