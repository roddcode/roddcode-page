import { SITE } from "@/lib/constants";
import type { ReactNode } from "react";

/**
 * Chrome mínimo para páginas de contenido (legal, seguridad).
 *
 * No reusa el header del home porque ese vive dentro de `home.tsx` y arrastra
 * el panel del demo. Acá solo hace falta: salida clara, el wordmark y un pie
 * con los mismos enlaces legales.
 *
 * El navbar replica el tratamiento del home: sticky en el borde superior, con
 * el fondo de papel al 82% y blur, para que el contenido pase por debajo. Los
 * colores salen de `[data-reading-surface]`, que remapea los tokens al tema
 * noche, así que el chrome queda oscuro sin duplicar valores.
 */
const LABELS = {
  es: {
    back: "Volver al inicio",
    privacy: "Privacidad",
    security: "Seguridad",
    rights: "Todos los derechos reservados.",
  },
  en: {
    back: "Back to home",
    privacy: "Privacy",
    security: "Security",
    rights: "All rights reserved.",
  },
} as const;

export function PageShell({
  children,
  locale = "es",
}: {
  children: ReactNode;
  locale?: keyof typeof LABELS;
}) {
  return (
    <div
      data-reading-surface
      lang={locale}
      className="min-h-dvh bg-paper font-sans text-ink"
    >
      <header className="sticky top-0 z-30 border-b border-line bg-[color-mix(in_srgb,var(--color-paper)_82%,transparent)] pt-[env(safe-area-inset-top)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center gap-4 px-[clamp(18px,4vw,24px)]">
          <a
            href="/"
            className="flex min-h-11 items-center text-base font-semibold tracking-[-0.01em] text-ink no-underline"
          >
            roddcode<span className="text-accent">.</span>
          </a>
          <a
            href="/"
            className="ml-auto flex min-h-11 items-center text-sm text-ink-3 no-underline transition-colors hover:text-accent"
          >
            {LABELS[locale].back}
          </a>
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-[1240px] px-[clamp(18px,4vw,24px)] py-16 md:py-24"
      >
        <div className="max-w-[720px]">{children}</div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-[clamp(18px,4vw,24px)] py-6 text-xs text-ink-4">
          <p className="m-0">© 2026 roddcode. {LABELS[locale].rights}</p>
          <nav className="flex flex-wrap items-center gap-5">
            <a
              href="/privacidad"
              className="inline-flex min-h-11 items-center text-ink-4 no-underline transition-colors hover:text-accent"
            >
              {LABELS[locale].privacy}
            </a>
            <a
              href="/seguridad"
              className="inline-flex min-h-11 items-center text-ink-4 no-underline transition-colors hover:text-accent"
            >
              {LABELS[locale].security}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 items-center text-ink-4 no-underline transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Bloque de sección: hairline arriba, título, y el contenido con medida de lectura. */
export function LegalBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="mb-3 font-sans text-base font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="flex max-w-[65ch] flex-col gap-3 text-[15px] leading-[1.7] text-ink-3">
        {children}
      </div>
    </section>
  );
}

/** Lista de datos o derechos, con el mismo ritmo que el resto del sitio. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {items.map((item) => (
        <li key={item} className="relative pl-4">
          <span
            aria-hidden="true"
            className="absolute top-[0.7em] left-0 h-px w-2 bg-ink-4"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
