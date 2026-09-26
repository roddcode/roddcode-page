"use client";

import type Lenis from "lenis";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Altura del header fijo (h-14 = 56px) + respiro. */
const HEADER_OFFSET = -72;

export function scrollToSection(id: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = window.__lenis;

  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { duration: reduced ? 0 : 1.2 });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    history.pushState(null, "", window.location.pathname);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: HEADER_OFFSET,
      duration: reduced ? 0 : 1.2,
    });
  } else {
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }
  history.pushState(null, "", `#${id}`);
}

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Link de ancla para misma página. No usa next/link a propósito:
 * el router ignora clicks hacia el hash actual y su salto nativo
 * pelea con Lenis. Este handler scrollea siempre vía Lenis.
 */
export function AnchorLink({ href, onClick, ...rest }: AnchorLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      onClick?.(e);
      return;
    }
    e.preventDefault();
    scrollToSection(href.slice(1));
    onClick?.(e);
  };
  return <a href={href} onClick={handleClick} {...rest} />;
}
