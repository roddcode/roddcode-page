export type Step = {
  label: string;
  system: string;
  state: "done" | "blocked";
};

export type Case = {
  id: string;
  tab: string;
  crumb: string;
  result: "blocked" | "committed";
  who: string;
  meta: string;
  message: string;
  typing: string;
  steps: Step[];
  foot: string;
  footSub: string;
  reply: string;
  chip: string;
  chipState: "blocked" | "committed";
};

export const CASES: Case[] = [
  {
    id: "booking",
    tab: "Booking",
    crumb: "gate / booking",
    result: "blocked",
    who: "Camila R.",
    meta: "patient · WhatsApp · Sat 14:58",
    message:
      "Mi hija tiene fiebre y necesito el turno del sábado a las 15:00. Si está ocupado, dime cuál me sirve.",
    typing: "Checking the slot against the calendar…",
    steps: [
      { label: "Parse intent", system: "model", state: "done" },
      { label: "State allows the action", system: "reactive-fsm", state: "done" },
      { label: "Slot is free", system: "PostgreSQL", state: "blocked" },
      { label: "Return real alternatives", system: "policy", state: "done" },
    ],
    foot: "Blocked in 42 ms",
    footSub: "3 alternatives, from the same query",
    reply:
      "That slot is taken. Saturday 15:30, Saturday 16:00, or Monday 09:00.",
    chip: "blocked · slot_taken",
    chipState: "blocked",
  },
  {
    id: "flight",
    tab: "Flight order",
    crumb: "gate / flight order",
    result: "committed",
    who: "Marco A.",
    meta: "travel agent · agency desk",
    message:
      "We have 9 passengers on a group fare. If this offer expires, the price jumps 40%.",
    typing: "Validating the NDC contract and the fare…",
    steps: [
      { label: "Validate NDC 21.3 contract", system: "parser", state: "done" },
      { label: "Check fare parity", system: "PROS", state: "done" },
      { label: "Lock the offer", system: "PostgreSQL", state: "done" },
      { label: "Commit with idempotency key", system: "exactly-once", state: "done" },
    ],
    foot: "Committed in 1.2 s",
    footSub: "order 8F2A · retry-safe",
    reply:
      "Order 8F2A created. Send the same key twice and you get the same order, not a second ticket.",
    chip: "committed · one receipt",
    chipState: "committed",
  },
  {
    id: "crm",
    tab: "CRM batch",
    crumb: "gate / crm batch",
    result: "committed",
    who: "Lucía P.",
    meta: "ops · batch #1042",
    message:
      "Finance closes in two hours and the batch already ran twice. I need one report, not two.",
    typing: "Deduping 1,842 rows by hash…",
    steps: [
      { label: "Dedupe by hash", system: "PostgreSQL", state: "done" },
      { label: "Validate payload schema", system: "zod", state: "done" },
      { label: "Write with a trace per row", system: "Serilog", state: "done" },
      { label: "Compile the summary", system: "report", state: "done" },
    ],
    foot: "Committed in 5.0 s",
    footSub: "1,842 rows · 0 duplicates",
    reply:
      "Batch 1042 processed. 1,842 rows, zero duplicates. The retry was ignored, not merged.",
    chip: "committed · 53% less process time",
    chipState: "committed",
  },
];
