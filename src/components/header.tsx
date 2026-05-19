import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-background/90 backdrop-blur-lg flex items-center">
      <div className="container-site w-full flex items-center justify-between">
        <Link
          href="/"
          className="font-sans text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors tracking-tight"
        >
          roddcode
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-[#3a3a39]">
            {SITE.location}
          </span>

        </div>
      </div>
    </header>
  );
}
