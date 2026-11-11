import type { Locale } from "@/content/portfolio";
import { Hero } from "./hero";
import { LegacyLinks } from "./legacy-links";
import {
  ComponentTeaser,
  Contact,
  HomeReading,
  PortfolioShell,
  SelectedWork,
} from "./views";

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
