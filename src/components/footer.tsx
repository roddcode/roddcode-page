"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container-site flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Alejandro Alvarado
        </p>
        <button
          type="button"
          onClick={handleBackToTop}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          Back to top
          <ArrowUp size={10} strokeWidth={1.5} />
        </button>
      </div>
    </footer>
  );
}
