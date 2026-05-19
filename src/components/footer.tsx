import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-site flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <span className="font-mono text-sm text-muted-foreground font-semibold">
          roddcode
        </span>

        <div className="flex items-center gap-5 text-sm font-mono text-[#3a3a39]">
          <Link href="/writing" className="hover:text-muted-foreground transition-colors">
            Writing
          </Link>
          <span>·</span>
          <Link
            href={SITE.github}
            className="hover:text-muted-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <span>·</span>
          <Link
            href={SITE.linkedin}
            className="hover:text-muted-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <span>·</span>
          <span>{SITE.location}</span>
        </div>
      </div>
    </footer>
  );
}
