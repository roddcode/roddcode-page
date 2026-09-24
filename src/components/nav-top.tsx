"use client";

import { SITE } from "@/lib/constants";
import { useActiveSection } from "@/lib/use-active-section";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { id: "casos", label: "Casos" },
  { id: "precios", label: "Precios" },
  { id: "preguntas", label: "Preguntas" },
] as const;

const IDS = LINKS.map((link) => link.id);

export function NavTop() {
  const cta = SITE.whatsapp || SITE.cal;
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(IDS);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduced) return;
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
  });

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md"
    >
      <div className="container-site flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          roddcode
        </Link>
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-6"
        >
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`hidden text-xs transition-colors sm:block ${
                active === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            data-track="nav-cta"
            className="bg-primary px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-primary/90"
            style={{ borderRadius: 2 }}
          >
            Hablemos 30 minutos
          </Link>
        </nav>
      </div>
      <m.span
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 block h-px origin-left bg-primary/70"
      />
    </m.header>
  );
}
