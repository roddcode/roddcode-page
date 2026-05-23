import { ArrowLeft, ArrowRight } from "lucide-react";

export function AuthSequenceDiagram() {
  return (
    <div className="w-full font-mono text-xs my-10 border border-border rounded-sm bg-[#0f0f0e] p-6 overflow-x-auto shadow-inner relative">
      <div className="min-w-[600px] w-full max-w-3xl mx-auto relative py-6">
        {/* Lifelines (Asymmetric placement to prevent overflow on the right) */}
        <div className="absolute top-0 bottom-0 left-[15%] w-0 border-l border-dashed border-muted-foreground/40 z-0" />
        <div className="absolute top-0 bottom-0 left-[65%] w-0 border-l border-dashed border-muted-foreground/40 z-0" />

        {/* Headers */}
        <div className="relative w-full h-8 mb-12 z-10">
          <div className="absolute left-[15%] -translate-x-1/2 top-0 bg-[#0f0f0e] px-4 py-1 text-muted-foreground uppercase tracking-widest font-semibold text-[10px]">
            Browser
          </div>
          <div className="absolute left-[65%] -translate-x-1/2 top-0 bg-[#0f0f0e] px-4 py-1 text-muted-foreground uppercase tracking-widest font-semibold text-[10px]">
            Server
          </div>
        </div>

        {/* Step 1: Login Request */}
        <div className="relative w-full h-8 mb-4">
          <div className="absolute left-[15%] w-[50%] flex items-center top-1/2 -translate-y-1/2 z-10">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0f0f0e] px-2 text-[11px] text-foreground/80 font-medium whitespace-nowrap">
              POST /api/auth/login
            </span>
            <div className="w-full h-px bg-muted-foreground/50" />
            <ArrowRight
              size={14}
              className="absolute right-[-7px] text-muted-foreground/50"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Step 2: Server Processing (Activation Box) */}
        <div className="relative w-full h-[60px] mb-8 z-10">
          <div className="absolute left-[65%] -translate-x-1/2 flex items-center h-full">
            {/* Activation Bar */}
            <div className="w-1.5 h-full bg-muted-foreground/50 rounded-full" />
            {/* Text Nodes */}
            <div className="absolute left-5 flex flex-col gap-3 py-1">
              <span className="text-muted-foreground whitespace-nowrap text-[11px]">
                Validates credentials
              </span>
              <span className="text-muted-foreground whitespace-nowrap text-[11px]">
                Issues JWT (access + refresh)
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Login Response */}
        <div className="relative w-full h-8 mb-16">
          <div className="absolute left-[15%] w-[50%] flex items-center top-1/2 -translate-y-1/2 z-10">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0f0f0e] px-2 text-[11px] text-primary font-medium whitespace-nowrap">
              Sets HttpOnly cookies
            </span>
            <div className="w-full h-px bg-primary/60" />
            <ArrowLeft
              size={14}
              className="absolute left-[-7px] text-primary/80"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Step 4: Protected Request */}
        <div className="relative w-full h-12 mb-4">
          <div className="absolute left-[15%] w-[50%] flex items-center top-1/2 -translate-y-1/2 z-10">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0f0f0e] px-2 text-[11px] text-foreground/80 font-medium text-center leading-tight whitespace-nowrap">
              GET /api/protected
              <br />
              <span className="text-[9px] opacity-60 font-normal">
                (cookie sent automatically)
              </span>
            </span>
            <div className="w-full h-px bg-muted-foreground/50" />
            <ArrowRight
              size={14}
              className="absolute right-[-7px] text-muted-foreground/50"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Step 5: Server Processing (Activation Box) */}
        <div className="relative w-full h-[40px] z-10 mb-8">
          <div className="absolute left-[65%] -translate-x-1/2 flex items-center h-full">
            {/* Activation Bar */}
            <div className="w-1.5 h-full bg-primary/70 rounded-full shadow-[0_0_12px_rgba(194,65,12,0.6)]" />
            {/* Text Nodes */}
            <div className="absolute left-5 flex flex-col justify-center gap-1">
              <span className="text-primary whitespace-nowrap text-[11px] font-medium">
                Reads cookie, validates JWT
              </span>
              <span className="text-primary whitespace-nowrap text-[11px] font-medium">
                Responds with protected data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
