import { SITE } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-site flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <span className="text-sm text-muted-foreground font-medium">
          roddcode
        </span>

        <div className="flex items-center gap-5 text-sm text-secondary-foreground">
          <Link
            href="/writing"
            className="hover:text-foreground transition-colors"
          >
            Writing
          </Link>
          <span className="text-tertiary select-none">·</span>
          <Link
            href={SITE.github}
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <span className="text-tertiary select-none">·</span>
          <Link
            href={SITE.linkedin}
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <span className="text-tertiary select-none">·</span>
          <span className="text-tertiary">{SITE.location}</span>
        </div>
      </div>
    </footer>
  );
}
