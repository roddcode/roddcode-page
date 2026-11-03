import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./container.module.css";

/**
 * Único dueño del ancho de página y del gutter lateral.
 * Ningún otro componente declara `max-width` ni `padding-inline`.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-container="" className={clsx(s.container, className)}>
      {children}
    </div>
  );
}
