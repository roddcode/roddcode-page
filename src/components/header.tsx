import { SITE } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
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
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Writing
            </Link>
            <Link
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              LinkedIn
              <ArrowUpRight size={10} strokeWidth={1.5} />
            </Link>
            <span className="text-xs text-muted-foreground">
              {SITE.location}
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
