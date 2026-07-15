"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
} as const;

export function SectionReveal({ children, className = "py-24 container-site" }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <section className={className}>{children}</section>;

  return <m.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className={className}>{children}</m.section>;
}
