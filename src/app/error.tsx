"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("System Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center container-site">
      <p className="text-red-500 font-mono text-sm mb-4">SYSTEM DEGRADATION</p>
      <h1 className="text-3xl font-bold tracking-tighter mb-4">A critical error occurred</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The application state has been compromised. Please reset the system boundary.
      </p>
      <button
        onClick={reset}
        className="text-sm font-medium text-background bg-foreground hover:bg-foreground/90 px-6 py-3 transition-all duration-100 ease-out will-change-transform active:scale-[0.98]"
        style={{ borderRadius: "2px" }}
      >
        Reboot system
      </button>
    </div>
  );
}
