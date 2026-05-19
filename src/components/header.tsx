import { SITE } from "@/lib/constants";
import Link from "next/link";

export function Header() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-background focus:border focus:border-primary focus:text-foreground focus:text-sm focus:font-mono focus:rounded-sm"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 h-20 bg-background/90 backdrop-blur-lg flex items-center">
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
            <span className="text-xs font-mono text-tertiary">
              {SITE.location}
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
