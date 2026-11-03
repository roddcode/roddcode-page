import { getLocale } from "next-intl/server";
import Link from "next/link";

/**
 * 404.
 *
 * Comparte la gramática de la tarjeta de enlace: wordmark arriba, el código en
 * mono sobre una hairline, el titular en ink y una sola salida. El idioma sale
 * de la request, igual que en el resto del sitio, para que /en/loquesea no
 * devuelva español.
 */
const COPY = {
  es: {
    code: "404",
    title: "Esta página no existe.",
    body: "El enlace está roto o la página se movió. No hay nada que rescatar acá.",
    cta: "Volver al inicio",
  },
  en: {
    code: "404",
    title: "This page doesn’t exist.",
    body: "The link is broken or the page moved. There is nothing to rescue here.",
    cta: "Back to home",
  },
} as const;

export default async function NotFound() {
  const locale = await getLocale();
  const t = COPY[locale === "en" ? "en" : "es"];

  return (
    <div className="flex min-h-dvh flex-col bg-paper font-sans text-ink">
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-[clamp(18px,4vw,24px)] py-10">
        <Link
          href="/"
          className="flex min-h-11 w-fit items-center text-base font-semibold tracking-[-0.01em] text-ink no-underline"
        >
          roddcode<span className="text-accent">.</span>
        </Link>

        <div className="flex flex-1 flex-col justify-center pb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] tracking-[0.18em] text-accent">
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
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-[2px] bg-accent px-5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              {t.cta}
            </Link>
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
