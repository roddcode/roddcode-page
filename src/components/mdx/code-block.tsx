"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

export function CodeBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const preRef = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onCopy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(
        (preRef.current?.textContent ?? "").trimEnd(),
      );
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  };
  return (
    <div
      className="my-8 overflow-hidden rounded-lg border border-line bg-paper-raised"
      data-code-block
    >
      <div className="flex min-h-11 items-center justify-between gap-4 border-b border-line px-3">
        <output className="text-xs text-meta">
          {status === "copied"
            ? "Code copied"
            : status === "error"
              ? "Could not copy. Select the code to copy it."
              : "Code"}
        </output>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              aria-label="Copy code"
            >
              {status === "copied" ? (
                <Check size={17} aria-hidden="true" />
              ) : (
                <Copy size={17} aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy code</TooltipContent>
        </Tooltip>
      </div>
      <pre
        {...props}
        ref={preRef}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard scrolling for overflowed code.
        tabIndex={0}
        aria-label="Code example"
        className={cn(
          "!m-0 !border-0 overflow-x-auto !rounded-none",
          className,
        )}
      >
        {children}
      </pre>
    </div>
  );
}
