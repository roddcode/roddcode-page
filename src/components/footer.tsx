import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container-site flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Alejandro Alvarado · Built with Next.js on Vercel
        </p>
        <a
          href="#"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          Back to top
          <ArrowUp size={10} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
