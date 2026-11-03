"use client";

import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

export function CodeBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const onCopy = () => {
    if (preRef.current) {
      const text = preRef.current.innerText || preRef.current.textContent || "";
      navigator.clipboard.writeText(text.trimEnd());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden border border-line bg-paper-raised">
      <pre ref={preRef} className={cn("overflow-x-auto", className)} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2 right-2 flex size-8 items-center justify-center border border-line bg-paper-raised text-ink-4 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent focus-visible:opacity-100"
        aria-label="Copy code"
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
            copied ? "opacity-100" : "opacity-0",
          )}
        >
          <Check size={14} strokeWidth={1.6} className="text-pass" />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
            copied ? "opacity-0" : "opacity-100",
          )}
        >
          <Copy size={14} strokeWidth={1.6} />
        </span>
      </button>
    </div>
  );
}
