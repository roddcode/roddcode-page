import { SITE } from "@/lib/constants";
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
            aria-label="Primary navigation"
            className="flex items-center gap-6"
          >
            <Link
              href="/writing"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
            >
              Writing
            </Link>
            <Link
              href="/services"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors py-3"
            >
              Services
            </Link>
            <Link
              href={SITE.cal}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a call, opens in new tab"
              className="text-xs text-primary hover:text-foreground transition-colors font-medium py-3"
            >
              Book a call
            </Link>
          </nav>
        </div>
      </header>
  );
}
