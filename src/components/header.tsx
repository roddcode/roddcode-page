import Link from "next/link";

export function Header() {
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
            href="/#casos"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            Casos
          </Link>
          <Link
            href="/cv"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            CV
          </Link>
          <Link
            href="/#preguntas"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
          >
            Preguntas
          </Link>
          <Link
            href="/#cierre"
            className="text-xs text-primary hover:text-foreground transition-colors font-medium py-3"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
