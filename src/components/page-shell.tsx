import { Footer, Header } from "@/components/portfolio/chrome";
import type { ReactNode } from "react";

/** Shared portfolio navigation with a narrow reading column. */
export function PageShell({
  children,
  locale = "es",
  path = "/",
}: { children: ReactNode; locale?: "es" | "en"; path?: string }) {
  return (
    <div
      data-reading-surface
      lang={locale}
      className="min-h-dvh bg-paper font-sans text-ink"
    >
      <Header locale={locale} path={path} />
      <main
        id="main-content"
        className="mx-auto w-full max-w-[1240px] px-[clamp(18px,4vw,24px)] py-16 md:py-24"
      >
        <div className="max-w-[720px]">{children}</div>
      </main>
      <Footer locale={locale} />
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
