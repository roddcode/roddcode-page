import clsx from "clsx";
import type { ComponentProps } from "react";
import s from "./container.module.css";

/**
 * Único dueño del ancho de página y del gutter lateral.
 * Ningún otro componente declara `max-width` ni `padding-inline`.
 */
export function Container({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} data-container="" className={clsx(s.container, className)}>
      {children}
    </div>
  );
}
