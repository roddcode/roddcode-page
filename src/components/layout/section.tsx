import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./section.module.css";

/**
 * Banda full-bleed: dueña del fondo y del ritmo vertical.
 * Nunca declara padding lateral; eso es de `Container`.
 */
export function Section({
  id,
  tone = "paper",
  dark = false,
  ariaLabel,
  className,
  children,
}: {
  id?: string;
  tone?: "paper" | "night";
  dark?: boolean;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      data-dark={dark ? "" : undefined}
      aria-label={ariaLabel}
      className={clsx(s.section, className)}
    >
      {children}
    </section>
  );
}
