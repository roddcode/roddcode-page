import { OpenSourcePage, PortfolioShell } from "@/components/portfolio/views";
import { getCopy } from "@/content/portfolio/copy";
import { portfolioMetadata, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return portfolioMetadata(
    locale,
    "/open-source",
    getCopy(locale).components,
    getCopy(locale).componentsIntro,
  );
}
export default async function Components({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  return (
    <PortfolioShell locale={locale} path="/open-source">
      <OpenSourcePage locale={locale} />
    </PortfolioShell>
  );
}
