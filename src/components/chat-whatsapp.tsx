"use client";

import {
  AGENT_TIMELINE,
  type AgentChatEvent,
  useAgentStep,
} from "@/lib/agent-timeline";
import { AnimatePresence, m } from "framer-motion";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  CircleCheck,
  Lock,
  Mic,
  Paperclip,
  Phone,
  Smile,
  Video,
} from "lucide-react";
import { useEffect, useRef } from "react";

const POP = {
  type: "spring",
  stiffness: 420,
  damping: 30,
  mass: 0.6,
} as const;

export function ChatWhatsapp() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const step = useAgentStep();
  const passed = AGENT_TIMELINE.slice(0, step + 1);
  const messages = passed.filter(
    (event): event is AgentChatEvent =>
      event.kind === "patient" || event.kind === "agent",
  );
  const isTyping = passed[passed.length - 1]?.kind === "typing";
  const done = passed.some((event) => event.kind === "done");

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scroll on each new message
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [step]);

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div
        aria-hidden
        className="absolute inset-x-4 bottom-10 top-16 -z-10 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="surface-dark relative rounded-[32px] border border-white/12 bg-[#171a1e] p-2 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]">
        <span
          aria-hidden
          className="absolute -left-[3px] top-[108px] h-7 w-[3px] rounded-l bg-white/15"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[150px] h-11 w-[3px] rounded-l bg-white/15"
        />
        <span
          aria-hidden
          className="absolute -right-[3px] top-[132px] h-14 w-[3px] rounded-r bg-white/15"
        />

        <div className="overflow-hidden rounded-[24px] bg-[#0b141a]">
          <div className="flex items-center justify-between px-4 pb-1 pt-2.5 text-[10px] text-[#e9edef]">
            <span className="font-medium">10:04</span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="flex items-end gap-[2px]">
                <span className="h-1 w-[3px] rounded-sm bg-[#e9edef]/80" />
                <span className="h-1.5 w-[3px] rounded-sm bg-[#e9edef]/80" />
                <span className="h-2 w-[3px] rounded-sm bg-[#e9edef]/80" />
                <span className="h-2.5 w-[3px] rounded-sm bg-[#e9edef]/40" />
              </span>
              <span className="h-2.5 w-5 rounded-[3px] border border-[#e9edef]/60 p-[2px]">
                <span className="block h-full w-2/3 rounded-[1px] bg-[#e9edef]/80" />
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-[#202c33] px-2 py-2">
            <ChevronLeft
              size={16}
              className="shrink-0 text-[#aebac1]"
              strokeWidth={2}
            />
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6a7175] text-[11px] font-medium text-[#e9edef]">
              CD
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium leading-tight text-[#e9edef]">
                Clínica dental
              </p>
              <p className="flex items-center gap-1.5 truncate text-[10px] leading-tight text-[#8696a0]">
                {isTyping ? (
                  "escribiendo…"
                ) : (
                  <>
                    <span
                      aria-hidden
                      className="inline-block size-1.5 rounded-full bg-[#25d366]"
                    />
                    en línea
                  </>
                )}
              </p>
            </div>
            <Video
              size={16}
              className="shrink-0 text-[#aebac1]"
              strokeWidth={1.75}
            />
            <Phone
              size={14}
              className="shrink-0 text-[#aebac1]"
              strokeWidth={1.75}
            />
          </div>

          <div
            ref={scrollRef}
            className="flex h-[430px] flex-col gap-1.5 overflow-y-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              backgroundImage:
                "radial-gradient(oklch(1 0 0 / 0.025) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <span className="mx-auto rounded-md bg-[#1f2c34] px-2.5 py-1 text-[9px] uppercase tracking-wide text-[#8696a0]">
              Hoy
            </span>
            <span className="mx-auto mb-1 flex items-center gap-1 text-center text-[9px] text-[#8696a0]">
              <Lock size={9} strokeWidth={2} className="shrink-0" />
              Los mensajes están cifrados de extremo a extremo
            </span>

            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isPatient = msg.kind === "patient";
                const read = messages.some(
                  (other, j) => j > idx && other.kind === "agent",
                );
                return (
                  <m.div
                    key={`${msg.clock}-${msg.text}`}
                    initial={{ opacity: 0, scale: 0.75, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={POP}
                    style={{
                      transformOrigin: isPatient
                        ? "right bottom"
                        : "left bottom",
                    }}
                    className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.35)] ${
                        isPatient
                          ? "rounded-br-sm bg-[#005c4b]"
                          : "rounded-bl-sm bg-[#202c33]"
                      }`}
                    >
                      <p className="text-[12px] leading-snug text-[#e9edef]">
                        {msg.text}
                      </p>
                      <span className="mt-1 flex items-center justify-end gap-1 text-[9px] leading-none text-[#8696a0]/80">
                        {msg.clock}
                        {isPatient &&
                          (read ? (
                            <CheckCheck
                              size={11}
                              className="text-[#53bdeb]"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <Check size={11} strokeWidth={2.5} />
                          ))}
                      </span>
                    </div>
                  </m.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <m.div
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={POP}
                style={{ transformOrigin: "left bottom" }}
                className="flex justify-start"
              >
                <span className="flex gap-1 rounded-2xl rounded-bl-sm bg-[#202c33] px-3 py-2.5">
                  <span className="size-1.5 animate-bounce rounded-full bg-[#8696a0]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-[#8696a0] [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-[#8696a0] [animation-delay:240ms]" />
                </span>
              </m.div>
            )}

            {done && (
              <m.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={POP}
                style={{ transformOrigin: "left bottom" }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-[#00a884]/40 bg-[#202c33] px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                  <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#00a884]">
                    <CircleCheck size={13} strokeWidth={2.25} />
                    Turno confirmado
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#8696a0]">
                    Jueves 16:00, limpieza dental
                  </p>
                </div>
              </m.div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-[#202c33] px-2.5 py-2">
            <Smile
              size={16}
              className="shrink-0 text-[#8696a0]"
              strokeWidth={1.75}
            />
            <span className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5 text-[11px] text-[#8696a0]">
              Mensaje
            </span>
            <Paperclip
              size={15}
              className="shrink-0 text-[#8696a0]"
              strokeWidth={1.75}
            />
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#00a884]">
              <Mic size={13} className="text-[#0b141a]" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
        Por fuera, la conversación
      </p>
    </div>
  );
}
