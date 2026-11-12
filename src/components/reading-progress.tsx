"use client";

import { useEffect, useRef } from "react";

/** Scroll progress without a React render on every frame. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const article = document.querySelector("[data-writing-article]");
    if (!article) return;
    let frame = 0;
    const update = () => {
      const { top, height } = article.getBoundingClientRect();
      const total = height - window.innerHeight;
      const progress =
        total <= 0
          ? top <= 0
            ? 1
            : 0
          : Math.min(1, Math.max(0, -top / total));
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        ref={bar}
        data-reading-progress
        className="h-full origin-left scale-x-0 bg-accent"
      />
    </div>
  );
}
