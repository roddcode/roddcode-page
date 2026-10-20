"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-white/15 px-5 py-2.5 text-sm text-secondary-foreground transition-colors hover:border-white/40 hover:text-foreground"
      style={{ borderRadius: 2 }}
    >
      Print / Save as PDF
    </button>
  );
}
