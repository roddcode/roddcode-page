"use client";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/content/portfolio/copy";
import type { Locale } from "@/content/portfolio/types";
import { Check, Minus, X } from "lucide-react";
import { useId, useState } from "react";
import s from "./booking-demo.module.css";

type Result = "idle" | "accepted" | "replayed" | "rejected";
export function BookingDemo({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const id = useId();
  const [slot, setSlot] = useState("10:00");
  const [result, setResult] = useState<Result>("idle");
  const [receipt, setReceipt] = useState<string | null>(null);
  function run() {
    if (slot === "10:30") {
      setResult("rejected");
      return;
    }
    if (receipt) {
      setResult("replayed");
      return;
    }
    setReceipt("illustration-001");
    setResult("accepted");
  }
  const message =
    result === "idle"
      ? t.demoIdle
      : result === "accepted"
        ? t.demoSuccess
        : result === "replayed"
          ? t.demoRepeated
          : t.demoConflict;
  return (
    <section className={s.demo} id="gate-panel" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{t.demoTitle}</h2>
      <p>{t.demoIntro}</p>
      <div className={s.demoGrid}>
        <div className={s.demoControls}>
          <fieldset>
            <legend>{t.demoRequest}</legend>
            {[
              ["10:00", t.demoAvailable],
              ["10:30", t.demoTaken],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`${id}-slot`}
                  value={value}
                  checked={slot === value}
                  onChange={() => {
                    setSlot(value ?? "10:00");
                    setResult("idle");
                  }}
                />
                <span>
                  <b>{value}</b>
                  {label}
                </span>
              </label>
            ))}
          </fieldset>
          <div className={s.actions}>
            <Button type="button" onClick={run}>
              {receipt && slot === "10:00" ? t.demoReplay : t.demoRun}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setReceipt(null);
                setResult("idle");
                setSlot("10:00");
              }}
            >
              {t.demoReset}
            </Button>
          </div>
        </div>
        <div className={s.demoOutput}>
          <h3>{t.demoStep}</h3>
          <ol>
            {[t.demoRequest, t.demoPolicy, t.demoCommit].map((label, index) => (
              <li key={label}>
                <span className={s.demoStatusIcon}>
                  {result === "idle" ? (
                    <Minus size={16} />
                  ) : result === "rejected" && index > 0 ? (
                    <X size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                </span>
                {label}
              </li>
            ))}
          </ol>
          <output aria-live="polite" aria-atomic="true" data-state={result}>
            {message}
          </output>
          {receipt && result !== "rejected" && (
            <p className={s.receipt}>
              {t.demoReceipt}: <code>{receipt}</code>
            </p>
          )}
        </div>
      </div>
      <p className={s.demoLimit}>{t.demoLimit}</p>
    </section>
  );
}
