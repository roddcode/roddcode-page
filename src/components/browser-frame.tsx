import type { ReactNode } from "react";

export function BrowserFrame({
  children,
  url = "roddcode.com",
}: { children: ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0f1013] shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate font-mono text-[10px] text-white/35">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
