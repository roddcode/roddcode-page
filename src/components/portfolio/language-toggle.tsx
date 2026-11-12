import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/content/portfolio";
import { Languages } from "lucide-react";

export function LanguageToggle({
  locale,
  hrefs,
}: {
  locale: Locale;
  hrefs: Record<Locale, string>;
}) {
  const target = locale === "es" ? "en" : "es";
  const label = locale === "es" ? "Cambiar a inglés" : "Switch to Spanish";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon-wide" className="text-ink">
          <a href={hrefs[target]} hrefLang={target} aria-label={label}>
            <Languages size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{locale.toUpperCase()}</span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
