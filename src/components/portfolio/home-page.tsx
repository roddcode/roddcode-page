import type { Locale } from "@/content/portfolio";
import { ComponentTeaser } from "./component-teaser";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { HomeReading } from "./home-reading";
import { LegacyLinks } from "./legacy-links";
import { SelectedWork } from "./selected-work";
import { PortfolioShell } from "./shell";

export function PortfolioHome({ locale }: { locale: Locale }) {
  return (
    <PortfolioShell locale={locale} path="/">
      <LegacyLinks locale={locale} />
      <Hero locale={locale} />
      <SelectedWork locale={locale} />
      <ComponentTeaser locale={locale} />
      <HomeReading locale={locale} />
      <Contact locale={locale} />
    </PortfolioShell>
  );
}
