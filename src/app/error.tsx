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
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="mb-4 font-mono text-sm text-danger">Error</p>
      <h1 className="mb-4 font-sans text-3xl font-medium tracking-tight">
        Algo se rompió de este lado.
      </h1>
      <p className="mb-8 max-w-md text-secondary-foreground">
        El error quedó registrado. Prueba de nuevo; si sigue, escríbeme.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary/90"
        style={{ borderRadius: 2 }}
      >
        Reintentar
      </button>
    </div>
  );
}
