"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const live = liveRef.current;
    const halo = haloRef.current;
    const core = coreRef.current;
    if (!root || !live || !halo || !core) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;

    let targetX = 0;
    let targetY = 0;
    let haloX = 0;
    let haloY = 0;
    let coreX = 0;
    let coreY = 0;
    let opacity = 0;
    let inside = false;
    let entered = false;
    let raf = 0;
    let last = performance.now();

    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const easeHalo = 1 - Math.exp(-5.5 * dt);
      const easeCore = 1 - Math.exp(-11 * dt);
      const easeOpacity = 1 - Math.exp(-4 * dt);

      const prevX = haloX;
      const prevY = haloY;
      haloX += (targetX - haloX) * easeHalo;
      haloY += (targetY - haloY) * easeHalo;
      coreX += (targetX - coreX) * easeCore;
      coreY += (targetY - coreY) * easeCore;

      const speed = Math.hypot(haloX - prevX, haloY - prevY) / dt;
      const targetOpacity = inside ? Math.min(1, 0.5 + speed / 2600) : 0;
      opacity += (targetOpacity - opacity) * easeOpacity;

      if (!inside && opacity < 0.01) {
        halo.style.opacity = "0";
        core.style.opacity = "0";
        live.style.opacity = "0";
        return;
      }

      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0)`;
      halo.style.opacity = `${opacity}`;
      core.style.opacity = `${opacity}`;
      live.style.opacity = `${opacity}`;
      live.style.setProperty("--gx", `${coreX}px`);
      live.style.setProperty("--gy", `${coreY}px`);

      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = x;
      targetY = y;
      inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && !entered) {
        haloX = coreX = x;
        haloY = coreY = y;
        entered = true;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      inside = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="hero-grid absolute inset-0" />
      <div ref={liveRef} className="hero-grid-live absolute inset-0" />
      <div className="hero-ambient absolute inset-0" />
      <div ref={haloRef} className="hero-glow-halo absolute left-0 top-0" />
      <div ref={coreRef} className="hero-glow-core absolute left-0 top-0" />
    </div>
  );
}
