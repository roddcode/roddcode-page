"use client";

import { useEffect, useRef } from "react";

const THRESHOLDS = [25, 50, 75, 100];

export function ReadingTracker({ slug }: { slug: string }) {
  const tracked = useRef(new Set<number>());

  useEffect(() => {
    const el = document.querySelector("article");
    if (!el) return;

    const handler = () => {
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.abs(top);
      const total = height - window.innerHeight;
      if (total <= 0) return;

      const pct = Math.min(100, Math.round((scrolled / total) * 100));

      for (const t of THRESHOLDS) {
        if (pct >= t && !tracked.current.has(t)) {
          tracked.current.add(t);
          console.log("[read]", slug, t);
        }
      }
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [slug]);

  return null;
}
