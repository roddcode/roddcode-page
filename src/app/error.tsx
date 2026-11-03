"use client";

import { useEffect, useState } from "react";

/**
 * Error de render.
 *
 * Misma gramática que el 404. El idioma se lee de `<html lang>`, que el layout
 * raíz ya declara: este componente corre en el cliente y no puede consultar la
 * request, así que se resuelve después de montar.
 */
const COPY = {
  es: {
    code: "ERROR",
    title: "Algo se rompió de este lado.",
    body: "El error quedó registrado. Prueba de nuevo; si sigue, escríbeme.",
    cta: "Reintentar",
  },
  en: {
    code: "ERROR",
    title: "Something broke on this side.",
    body: "The error was logged. Try again; if it persists, write to me.",
    cta: "Try again",
  },
} as const;

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    console.error("System Error:", error);
  }, [error]);

  useEffect(() => {
    if (document.documentElement.lang === "en") setLang("en");
  }, []);

  const t = COPY[lang];

  return (
    <div className="flex min-h-dvh flex-col bg-paper font-sans text-ink">
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-[clamp(18px,4vw,24px)] py-10">
        <span className="flex min-h-11 w-fit items-center text-base font-semibold tracking-[-0.01em]">
          roddcode<span className="text-accent">.</span>
        </span>

        <div className="flex flex-1 flex-col justify-center pb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] tracking-[0.18em] text-danger">
              {t.code}
            </span>
            <span className="h-px w-10 bg-line" />
          </div>

          <h1 className="mt-6 max-w-[18ch] text-[clamp(2rem,5.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {t.title}
          </h1>

          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-3">
            {t.body}
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center justify-center rounded-[2px] bg-accent px-5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              {t.cta}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="h-px w-full bg-line" />
          <span className="font-mono text-[12px] text-ink-5">roddcode.com</span>
        </div>
      </div>
    </div>
  );
}
