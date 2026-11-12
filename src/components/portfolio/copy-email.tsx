"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import s from "./copy-email.module.css";

export function CopyEmail({
  email,
  locale,
}: {
  email: string;
  locale: "es" | "en";
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const label = locale === "es" ? "Copiar correo" : "Copy email";
  const feedback =
    status === "copied"
      ? locale === "es"
        ? "Correo copiado"
        : "Email copied"
      : status === "error"
        ? locale === "es"
          ? "No se pudo copiar"
          : "Could not copy email"
        : "";

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <span className={s.wrapper}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={label}
            onClick={copy}
          >
            {status === "copied" ? (
              <Check size={17} aria-hidden="true" />
            ) : (
              <Copy size={17} aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
      <output className={s.feedback}>{feedback}</output>
    </span>
  );
}
