"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState<string | null>(null);
  const final = value.toFixed(decimals);

  useEffect(() => {
    if (started) return;
    if (inView || reduced) {
      setStarted(true);
      return;
    }
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (r.top < vh * 0.9 && r.bottom > vh * 0.1) setStarted(true);
    };
    const timer = window.setTimeout(() => {
      window.addEventListener("scroll", check, { passive: true });
    }, 1500);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", check);
    };
  }, [started, inView, reduced]);

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setDisplay(final);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [started, reduced, value, decimals, final]);

  return (
    <span ref={ref}>
      {prefix}
      {display ?? final}
      {suffix}
    </span>
  );
}
