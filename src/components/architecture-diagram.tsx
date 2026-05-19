import { cn } from "@/lib/cn";
import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";

type NodeStatus = "active" | "passive" | "degraded";

export function DiagramNode({
  label,
  sublabel,
  status = "active",
  className,
}: {
  label: ReactNode;
  sublabel?: ReactNode;
  status?: NodeStatus;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-3 rounded-sm border w-full text-center relative z-10 transition-colors duration-300",
        "bg-background/80 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]",
        status === "active" && "border-border hover:border-muted-foreground/30",
        status === "passive" &&
          "border-transparent text-muted-foreground bg-transparent shadow-none",
        status === "degraded" &&
          "border-primary/40 text-primary bg-primary/5 shadow-[0_0_15px_rgba(194,65,12,0.1)]",
        className,
      )}
    >
      <span className="font-mono text-xs tracking-wider leading-relaxed">
        {label}
      </span>
      {sublabel && (
        <span
          className={cn(
            "font-mono text-[10px] mt-1.5 tracking-widest uppercase",
            status === "degraded" ? "text-primary/70" : "text-muted-foreground",
          )}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}

export function ArchitectureLayer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full group">
      <div className="flex flex-col md:flex-row gap-4 w-full relative">
        {/* Layer Label - Absolute on desktop, relative on mobile */}
        <div className="md:absolute md:-left-36 md:top-1/2 md:-translate-y-1/2 md:text-right md:w-28 text-left mb-2 md:mb-0">
          <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase group-hover:text-muted-foreground transition-colors">
            {title}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ArrowConnector() {
  return (
    <div className="flex justify-center w-full py-3 opacity-30">
      <ArrowDown size={14} strokeWidth={1.5} className="text-border" />
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="w-full flex justify-center py-10">
      {/* Max width constrained for readability, but fully fluid */}
      <div className="flex flex-col w-full max-w-2xl relative md:ml-16">
        <ArchitectureLayer title="Ingress">
          <DiagramNode label="Evolution API" sublabel="Self-hosted / Webhook" />
        </ArchitectureLayer>

        <ArrowConnector />

        <ArchitectureLayer title="Compute">
          <DiagramNode label="Noise Guard v2.0" sublabel="Statistical Filter" />
          <DiagramNode
            label="Orchestrator FSM"
            sublabel="Vercel AI SDK"
            status="degraded"
          />
          <DiagramNode label="DeepSeek V4" sublabel="Flash Reasoning" />
        </ArchitectureLayer>

        <ArrowConnector />

        <ArchitectureLayer title="State & Locks">
          <DiagramNode label="Postgres" sublabel="Drizzle ORM" />
          <DiagramNode label="Upstash Redis" sublabel="Mutex Locks" />
        </ArchitectureLayer>

        <ArrowConnector />

        <ArchitectureLayer title="Side Effects">
          <DiagramNode label="Postgres" sublabel="Atomic Slot Locks" />
          <DiagramNode label="Google Calendar" sublabel="Service Account" />
          <DiagramNode label="Upstash QStash" sublabel="T-24h / T-2h Jobs" />
        </ArchitectureLayer>
      </div>
    </div>
  );
}
