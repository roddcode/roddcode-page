import { SITE } from "@/lib/constants";
import Link from "next/link";

export function Header() {
  const cta = SITE.whatsapp || SITE.cal;

  return (
    <header className="sticky top-0 z-50 h-14 bg-background/80 backdrop-blur-md border-b border-border/20 flex items-center">
      <div className="container-site w-full flex items-center justify-between">
        <Link
          href="/"
          className="font-sans text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors tracking-tight"
        >
          roddcode
        </Link>
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-6"
        >
          <Link
            href="#precios"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            Precios
          </Link>
          <Link
            href="#preguntas"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            Preguntas
          </Link>
          <Link
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos, abre en nueva pestaña"
            className="text-xs text-primary hover:text-foreground transition-colors font-medium py-3"
          >
            Hablemos
          </Link>
        </nav>
      </div>
    </header>
  );
}
