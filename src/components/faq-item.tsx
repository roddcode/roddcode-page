"use client";

import { m, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const contentId = useId();

  return (
    <div className="border-t border-white/10 last:border-b">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left font-medium"
      >
        {question}
        <m.span
          aria-hidden
          initial={false}
          animate={{ rotate: open ? 45 : 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 420, damping: 30 }
          }
          className="shrink-0 font-mono text-sm text-muted-foreground"
        >
          +
        </m.span>
      </button>
      <m.div
        id={contentId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
        aria-hidden={!open}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </m.div>
    </div>
  );
}
