"use client";

import {
  AGENT_TIMELINE,
  type AgentLogEvent,
  useAgentStep,
} from "@/lib/agent-timeline";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef } from "react";

export function LogsConsole() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const step = useAgentStep();
  const lines = AGENT_TIMELINE.slice(0, step + 1).filter(
    (event): event is AgentLogEvent => event.kind === "log",
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scroll on each new line
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [step]);

  return (
    <div>
      <div className="surface-dark overflow-hidden rounded-lg border border-white/10 bg-[#0d0f12] shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              logs
            </span>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/70">
            agente
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex h-[440px] flex-col gap-1.5 overflow-y-auto p-5 font-mono text-[12px] leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <p className="mb-2 text-muted-foreground/80">
            <span className="text-primary">$</span> tail -f logs/agente.log
          </p>

          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <m.p
                key={`${line.clock}-${line.text}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-white/25">{line.clock}</span>{" "}
                <span
                  className={`inline-block w-10 ${
                    line.level === "WARN" ? "text-[#febc2e]" : "text-primary/80"
                  }`}
                >
                  {line.level}
                </span>{" "}
                <span className="text-secondary-foreground">{line.text}</span>
              </m.p>
            ))}
          </AnimatePresence>

          <span
            className="mt-1 inline-block h-3.5 w-2 animate-pulse bg-primary/60"
            aria-hidden
          />
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
        Por dentro, el sistema corriendo
      </p>
    </div>
  );
}
