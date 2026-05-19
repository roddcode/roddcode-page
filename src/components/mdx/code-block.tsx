"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

export function CodeBlock({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
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
    <div className="relative group overflow-hidden rounded-sm my-8">
      <pre ref={preRef} className={cn("overflow-x-auto", className)} {...props}>
        {children}
      </pre>
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-muted/50 rounded-sm opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-foreground active:scale-95 overflow-hidden"
        aria-label="Copy code"
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <Check size={14} strokeWidth={1.5} className="text-green-500" />
        </span>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <Copy size={14} strokeWidth={1.5} />
        </span>
      </button>
    </div>
  );
}
