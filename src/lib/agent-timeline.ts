"use client";

import { useEffect, useState } from "react";

export type AgentEvent =
  | { at: number; kind: "patient"; text: string; clock: string }
  | { at: number; kind: "agent"; text: string; clock: string }
  | { at: number; kind: "typing" }
  | {
      at: number;
      kind: "log";
      clock: string;
      level: "INFO" | "WARN";
      text: string;
    }
  | { at: number; kind: "done" };

export type AgentChatEvent = Extract<AgentEvent, { kind: "patient" | "agent" }>;
export type AgentLogEvent = Extract<AgentEvent, { kind: "log" }>;

export const AGENT_TIMELINE: AgentEvent[] = [
  {
    at: 600,
    kind: "patient",
    clock: "10:02",
    text: "Hola, quiero un turno para una limpieza",
  },
  {
    at: 600,
    kind: "log",
    clock: "15:42:01",
    level: "INFO",
    text: "mensaje recibido de=+51942***776 canal=whatsapp",
  },
  {
    at: 1000,
    kind: "log",
    clock: "15:42:01",
    level: "INFO",
    text: "run=3c91aa tools=[]",
  },
  { at: 1200, kind: "typing" },
  {
    at: 2400,
    kind: "agent",
    clock: "10:02",
    text: "¡Hola! Soy el asistente de la clínica. ¿Qué día te queda mejor?",
  },
  {
    at: 2600,
    kind: "log",
    clock: "15:42:02",
    level: "INFO",
    text: 'respuesta="¡Hola! Soy el asistente de la clínica. ¿Qué día te queda mejor?" en=1.1s',
  },
  {
    at: 3800,
    kind: "patient",
    clock: "10:03",
    text: "El sábado a las 15",
  },
  {
    at: 3800,
    kind: "log",
    clock: "15:42:02",
    level: "INFO",
    text: "mensaje recibido de=+51942***776 canal=whatsapp",
  },
  {
    at: 4200,
    kind: "log",
    clock: "15:42:02",
    level: "INFO",
    text: "run=8f3a2c tools=[consultar_disponibilidad,crear_reserva]",
  },
  {
    at: 4600,
    kind: "log",
    clock: "15:42:03",
    level: "INFO",
    text: 'tool=consultar_disponibilidad args={"dia":"sábado","hora":"15:00"}',
  },
  {
    at: 5000,
    kind: "log",
    clock: "15:42:03",
    level: "WARN",
    text: "tool=consultar_disponibilidad resultado=sin_disponibilidad",
  },
  {
    at: 5400,
    kind: "log",
    clock: "15:42:03",
    level: "INFO",
    text: "tool=crear_reserva omitida motivo=sin_disponibilidad",
  },
  { at: 5600, kind: "typing" },
  {
    at: 7200,
    kind: "agent",
    clock: "10:03",
    text: "Los sábados no atendemos. Tengo jueves 16:00 o viernes 10:00. ¿Te sirve alguno?",
  },
  {
    at: 7400,
    kind: "log",
    clock: "15:42:04",
    level: "INFO",
    text: 'respuesta="Los sábados no atendemos. Tengo jueves 16:00 o viernes 10:00. ¿Te sirve alguno?" en=1.8s',
  },
  {
    at: 8600,
    kind: "patient",
    clock: "10:04",
    text: "Jueves 16",
  },
  {
    at: 8600,
    kind: "log",
    clock: "15:42:04",
    level: "INFO",
    text: "mensaje recibido de=+51942***776 canal=whatsapp",
  },
  {
    at: 9000,
    kind: "log",
    clock: "15:42:04",
    level: "INFO",
    text: "run=7b2e11 tools=[crear_reserva]",
  },
  {
    at: 9400,
    kind: "log",
    clock: "15:42:05",
    level: "INFO",
    text: 'tool=crear_reserva args={"dia":"jueves","hora":"16:00"}',
  },
  {
    at: 9800,
    kind: "log",
    clock: "15:42:05",
    level: "INFO",
    text: "reserva creada id=4821 tx=commit",
  },
  { at: 10000, kind: "typing" },
  {
    at: 11400,
    kind: "agent",
    clock: "10:04",
    text: "Listo, jueves 16:00 reservado. Te mando la dirección y un recordatorio el día antes.",
  },
  {
    at: 11600,
    kind: "log",
    clock: "15:42:06",
    level: "INFO",
    text: 'respuesta="Listo, jueves 16:00 reservado. Te mando la dirección y un recordatorio el día antes." en=1.2s',
  },
  { at: 12400, kind: "done" },
];

export const LOOP_MS = 16000;

const subscribers = new Set<(step: number) => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let startedAt = 0;
let lastStep = -2;

function stepFor(elapsed: number): number {
  let step = -1;
  for (let i = 0; i < AGENT_TIMELINE.length; i++) {
    const event = AGENT_TIMELINE[i];
    if (event && event.at <= elapsed) step = i;
    else break;
  }
  return step;
}

function startClock() {
  if (timer) return;
  startedAt = performance.now();
  lastStep = -2;
  timer = setInterval(() => {
    const elapsed = (performance.now() - startedAt) % LOOP_MS;
    const step = stepFor(elapsed);
    if (step === lastStep) return;
    lastStep = step;
    for (const notify of subscribers) notify(step);
  }, 80);
}

function stopClock() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}

export function useAgentStep(): number {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setStep(AGENT_TIMELINE.length - 1);
      return;
    }
    subscribers.add(setStep);
    startClock();
    return () => {
      subscribers.delete(setStep);
      if (subscribers.size === 0) stopClock();
    };
  }, []);

  return step;
}
