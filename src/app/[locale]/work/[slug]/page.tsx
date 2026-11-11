import { CaseStudy, PortfolioShell } from "@/components/portfolio/views";
import { getPortfolio } from "@/content/portfolio";
import { portfolioMetadata, resolveLocale } from "@/lib/portfolio";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return (["es", "en"] as const).flatMap((locale) =>
    getPortfolio(locale).projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: asked, slug } = await params;
  const locale = resolveLocale(asked);
  const project = getPortfolio(locale).projects.find(
    (item) => item.slug === slug,
  );
  if (!project) notFound();
  return portfolioMetadata(
    locale,
    `/work/${project.slug}`,
    project.title,
    project.summary,
  );
}
export default async function WorkCase({ params }: Props) {
  const { locale: asked, slug } = await params;
  const locale = resolveLocale(asked);
  const project = getPortfolio(locale).projects.find(
    (item) => item.slug === slug,
  );
  if (!project) notFound();
  return (
    <PortfolioShell locale={locale} path={`/work/${project.slug}`}>
      <CaseStudy locale={locale} project={project} />
    </PortfolioShell>
  );
}
