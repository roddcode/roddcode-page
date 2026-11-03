"use client";

import { useEffect, useState } from "react";

/**
 * Barra de progreso de lectura.
 *
 * Reemplaza al tracker anterior, que sólo escribía umbrales en consola: el
 * mismo cálculo, pero visible en el borde superior de la página.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.querySelector("article");
    if (!el) return;

    let frame = 0;

    const update = () => {
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      const value =
        total <= 0
          ? 0
          : Math.min(100, Math.max(0, (Math.abs(top) / total) * 100));
      setPct(value);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        className="h-full bg-accent"
        style={{ width: `${pct}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
}
