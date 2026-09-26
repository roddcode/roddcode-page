"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.1 });
    window.__lenis = lenis;
    // Deep link con hash al cargar: entrar directo vía Lenis, sin salto nativo.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        if (id === "top") {
          lenis.scrollTo(0, { immediate: true });
          return;
        }
        const el = document.getElementById(id);
        if (el) lenis.scrollTo(el, { offset: -72, immediate: true });
      });
    }
    return () => {
      if (window.__lenis === lenis) window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return null;
}
