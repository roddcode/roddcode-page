"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
} as const;

export function StaggerContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div variants={item} className={className}>
      {children}
    </m.div>
  );
}
