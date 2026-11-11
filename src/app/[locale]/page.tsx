import { PortfolioHome } from "@/components/portfolio/home-page";
import { getIdentity } from "@/content/portfolio/identity";
import { portfolioMetadata, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return ["es", "en"].map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const identity = getIdentity(locale);
  return portfolioMetadata(locale, "/", identity.role, identity.intro);
}
export default async function HomePage({ params }: Props) {
  return <PortfolioHome locale={resolveLocale((await params).locale)} />;
}
