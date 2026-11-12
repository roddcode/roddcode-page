"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Enhances server-rendered blocks; never hides content before JavaScript runs. */
export function PageReveal({ routeKey }: { routeKey: string }) {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const main = document.getElementById("main-content");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !main ||
      motion.matches ||
      !window.IntersectionObserver ||
      !HTMLElement.prototype.animate
    )
      return;

    const candidates = Array.from(
      main.querySelectorAll<HTMLElement>(
        "[data-reveal], :scope > section, :scope > div > *, article",
      ),
    );
    main.dataset.revealRoute = `${routeKey}:${pathname}`;
    const footer =
      main.parentElement?.querySelector<HTMLElement>(":scope > footer");
    if (footer) candidates.push(footer);
    // Animate a block or its children, never both at once.
    const targets = candidates.filter(
      (node) =>
        !candidates.some((child) => child !== node && node.contains(child)) &&
        node.getClientRects().length > 0,
    );
    const animations = new Set<Animation>();
    const show = (node: HTMLElement, animate: boolean) => {
      delete node.dataset.revealState;
      if (!animate || motion.matches) return;
      const animation = node.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 460, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement, true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    for (const node of targets) {
      const rect = node.getBoundingClientRect();
      if (rect.bottom <= 0) continue;
      if (rect.top < window.innerHeight) show(node, true);
      else {
        node.dataset.revealState = "pending";
        observer.observe(node);
      }
    }
    const revealFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const focused = event.target;
      for (const node of targets) {
        if (node.dataset.revealState && node.contains(focused)) {
          show(node, false);
          observer.unobserve(node);
        }
      }
    };
    const stop = () => {
      delete main.dataset.revealRoute;
      observer.disconnect();
      for (const node of targets) delete node.dataset.revealState;
      for (const animation of animations) animation.cancel();
      animations.clear();
    };
    const preferenceChanged = () => {
      if (motion.matches) stop();
    };
    document.addEventListener("focusin", revealFocus);
    motion.addEventListener("change", preferenceChanged);
    return () => {
      stop();
      document.removeEventListener("focusin", revealFocus);
      motion.removeEventListener("change", preferenceChanged);
    };
  }, [routeKey, pathname]);
  return null;
}
