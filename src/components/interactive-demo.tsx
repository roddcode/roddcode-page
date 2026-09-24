"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Check = { label: string; ok: boolean; detail: string };
type Scenario = {
  tab: string;
  input: string;
  system: string;
  toolCall: string;
  checks: Check[];
  toolResult: { ok: boolean; text: string };
  response: string;
  result: "BLOQUEADO" | "EJECUTADO";
  note: string;
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SCENARIOS: Scenario[] = [
  {
    tab: "Agente",
    input: "Reserva el sábado a las 15:00",
    system: "Agenda",
    toolCall: "crear_reserva(sáb, 15:00)",
    checks: [
      {
        label: "¿Existe el horario?",
        ok: false,
        detail: "Sin agenda para el sábado",
      },
      {
        label: "¿El slot está libre?",
        ok: false,
        detail: "No hay dato que confirmar",
      },
      {
        label: "¿Se puede confirmar?",
        ok: false,
        detail: "Bloqueado por la base",
      },
    ],
    toolResult: { ok: false, text: "sin_disponibilidad" },
    response:
      "El sábado no atendemos. Te ofrezco jueves 16:00 o viernes 10:00. ¿Te sirve alguno?",
    result: "BLOQUEADO",
    note: "El modelo propuso la reserva; la agenda la bloqueó. La respuesta salió con los horarios que sí existen.",
  },
  {
    tab: "CRM",
    input: "Lead del formulario: “necesito 200 líneas para marzo”",
    system: "CRM",
    toolCall: "mover_etapa(4821, ganado)",
    checks: [
      {
        label: "¿El lead existe?",
        ok: true,
        detail: "Registrado hace 2 minutos",
      },
      {
        label: "¿Hay contrato firmado?",
        ok: false,
        detail: "Sin contrato no hay 'ganado'",
      },
      {
        label: "¿La transición existe?",
        ok: false,
        detail: "'nuevo' → 'ganado' no existe",
      },
    ],
    toolResult: { ok: false, text: "transición inválida" },
    response:
      "No puedo cerrarlo sin contrato. Dejo una tarea para ventas y el lead sigue en 'nuevo'.",
    result: "BLOQUEADO",
    note: "El modelo propuso el atajo; la máquina de estados lo bloqueó. La respuesta respetó el flujo.",
  },
  {
    tab: "ERP",
    input: "Recepción de mercadería: 500 cajas, guía 4471",
    system: "ERP",
    toolCall: "registrar_recepcion(2291, 500)",
    checks: [
      {
        label: "¿Existe la orden?",
        ok: true,
        detail: "OC-2291 aprobada",
      },
      {
        label: "¿El almacén está listo?",
        ok: true,
        detail: "Muelle 3, sin restricciones",
      },
      {
        label: "¿La transacción cuadra?",
        ok: true,
        detail: "Stock 1,000 → 1,500",
      },
    ],
    toolResult: { ok: true, text: "ok · stock en 1,500" },
    response:
      "Recepción registrada: 500 cajas, stock en 1,500. La orden quedó cerrada.",
    result: "EJECUTADO",
    note: "La acción pasó por la orden y el cuadre antes de tocar el stock. El modelo recién ahí respondió.",
  },
  {
    tab: "Vuelos",
    input: "Cambio de vuelo: LIM → MAD, del 12 al 14 de marzo",
    system: "Motor NDC",
    toolCall: "cambiar_vuelo(MAD, 14_mar)",
    checks: [
      {
        label: "¿La tarifa lo permite?",
        ok: true,
        detail: "Con penalidad de $80",
      },
      {
        label: "¿Hay disponibilidad?",
        ok: true,
        detail: "3 asientos en el nuevo vuelo",
      },
      {
        label: "¿La aerolínea confirma?",
        ok: true,
        detail: "OrderChange aceptado",
      },
    ],
    toolResult: { ok: true, text: "ok · penalidad $80" },
    response:
      "Cambio confirmado al 14 de marzo, con penalidad de $80 según tu tarifa.",
    result: "EJECUTADO",
    note: "El modelo no inventó el costo: la tarifa lo dijo, el motor lo aplicó, la respuesta lo comunicó.",
  },
];

export function InteractiveDemo() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "checks" | "done">("typing");
  const [visibleCount, setVisibleCount] = useState(0);
  const reduced = useReducedMotion();

  const scenario = (SCENARIOS[index] ?? SCENARIOS[0]) as Scenario;

  useEffect(() => {
    setTyped("");
    setPhase("typing");
    setVisibleCount(0);

    if (reduced) {
      setTyped(scenario.toolCall);
      setVisibleCount(scenario.checks.length);
      setPhase("done");
      return;
    }

    const text = scenario.toolCall;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(() => setPhase("checks"), 400);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [scenario, reduced]);

  useEffect(() => {
    if (phase !== "checks") return;
    if (visibleCount >= scenario.checks.length) {
      const t = setTimeout(() => setPhase("done"), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((v) => v + 1), 400);
    return () => clearTimeout(t);
  }, [phase, visibleCount, scenario.checks.length]);

  const fade = (visible: boolean, delay = 0) => ({
    animate: { opacity: visible ? 1 : 0, y: visible ? 0 : 4 },
    transition: {
      duration: reduced ? 0 : 0.3,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  const blocked = scenario.result === "BLOQUEADO";

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
      <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
        {SCENARIOS.map((item, i) => (
          <button
            key={item.tab}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-md border px-2.5 py-2 text-left font-mono text-xs transition-colors md:px-3 ${
              i === index
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <p className="mb-4 truncate font-mono text-[11px] text-muted-foreground">
        <span className="text-primary">›</span> {scenario.input}
      </p>

      <div className="rounded-lg border border-white/10 bg-background/60 p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
          Modelo
        </p>
        <p className="font-mono text-[11px] leading-relaxed">
          <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-primary/90">
            {typed}
            {phase === "typing" && (
              <span className="animate-pulse text-primary">▍</span>
            )}
          </span>
        </p>
        <m.p
          {...fade(phase === "done", 0.05)}
          className="mt-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-relaxed text-secondary-foreground"
        >
          {scenario.response}
        </m.p>
      </div>

      <div className="mt-3 rounded-lg border border-white/10 bg-background/60 p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {scenario.system}
        </p>
        <ul className="flex flex-col gap-2.5">
          {scenario.checks.map((check, i) => (
            <m.li
              key={check.label}
              {...fade(i < visibleCount)}
              className="flex items-start gap-3 text-sm"
            >
              <span
                className={`font-mono text-[10px] ${check.ok ? "text-success" : "text-danger"}`}
              >
                {check.ok ? "PASA" : "FALLA"}
              </span>
              <span>
                <span className="text-foreground">{check.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {check.detail}
                </span>
              </span>
            </m.li>
          ))}
        </ul>
        <m.p
          {...fade(phase === "done", 0.05)}
          className={`mt-3 font-mono text-[11px] ${
            scenario.toolResult.ok ? "text-success" : "text-danger"
          }`}
        >
          resultado › {scenario.toolResult.text}
        </m.p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <m.div
          {...fade(phase === "done", 0.1)}
          className="flex flex-wrap items-center gap-4"
        >
          <span
            className={`rounded border px-3 py-1 font-mono text-xs tracking-widest ${
              blocked
                ? "border-danger/60 text-danger"
                : "border-success/60 text-success"
            }`}
          >
            {scenario.result}
          </span>
          <p className="min-w-0 flex-1 text-sm text-muted-foreground">
            {scenario.note}
          </p>
        </m.div>
      </div>
    </div>
  );
}
