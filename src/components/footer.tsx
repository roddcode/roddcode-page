import { SITE } from "@/lib/constants";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alejandro Alvarado · Hecho con Next.js en
          Vercel
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href={`mailto:${SITE.email}`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {SITE.email}
          </Link>
          <a
            href="#top"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            Arriba
            <ArrowUp size={10} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
