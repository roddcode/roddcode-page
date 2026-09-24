const desc = "fill-muted-foreground font-sans text-[11px]";
const label = "fill-muted-foreground font-mono text-[10px]";

function Node({
  x,
  y,
  w,
  title,
  dashed,
  accent,
  children,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  dashed?: boolean;
  accent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={96}
        rx={6}
        className={
          accent
            ? "fill-white/[0.02] stroke-primary/50"
            : dashed
              ? "fill-white/[0.02] stroke-white/20"
              : "fill-white/[0.02] stroke-white/15"
        }
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text
        x={x + 14}
        y={y + 28}
        className={
          accent
            ? "fill-primary font-sans text-[13px] font-medium"
            : "fill-foreground font-sans text-[13px] font-medium"
        }
      >
        {title}
      </text>
      {children}
    </g>
  );
}

export function MethodDiagram() {
  return (
    <div>
      <div className="hidden md:block">
        <svg
          viewBox="0 0 980 280"
          className="w-full"
          role="img"
          aria-label="Esquema del método: el sistema arma un prompt dinámico y las tools del estado, el agente elige tools en iteraciones, cada tool valida contra reglas y base de datos, y la respuesta depende de las tools usadas"
        >
          <defs>
            <marker
              id="method-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 z"
                className="fill-muted-foreground"
              />
            </marker>
          </defs>

          <g>
            <rect
              x={392}
              y={76}
              width={384}
              height={180}
              rx={8}
              fill="none"
              className="stroke-white/15"
              strokeDasharray="5 4"
            />
            <text
              x={392}
              y={68}
              className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest"
            >
              Iteración
            </text>
          </g>

          <Node x={12} y={118} w={120} title="01 · Entrada">
            <text x={26} y={166} className={desc}>
              el mensaje llega
            </text>
          </Node>

          <path
            d="M 132 166 L 160 166"
            fill="none"
            strokeWidth={1.5}
            markerEnd="url(#method-arrow)"
            className="stroke-muted-foreground/60"
          />

          <Node x={164} y={118} w={196} title="02 · Sistema">
            <text x={178} y={166} className={desc}>
              prompt dinámico
            </text>
            <text x={178} y={184} className={desc}>
              tools del estado
            </text>
          </Node>

          <path
            d="M 360 166 L 404 166"
            fill="none"
            strokeWidth={1.5}
            markerEnd="url(#method-arrow)"
            className="stroke-muted-foreground/60"
          />

          <Node x={408} y={118} w={136} title="03 · Agente" dashed>
            <text x={422} y={166} className={desc}>
              elige qué tool usar
            </text>
          </Node>

          <path
            d="M 544 148 L 588 148"
            fill="none"
            strokeWidth={1.5}
            markerEnd="url(#method-arrow)"
            strokeDasharray="4 4"
            className="stroke-muted-foreground/60"
          />
          <text x={566} y={140} textAnchor="middle" className={label}>
            elige
          </text>

          <Node x={592} y={118} w={160} title="04 · Tool" accent>
            <text x={606} y={166} className={desc}>
              valida contra reglas
            </text>
            <text x={606} y={184} className={desc}>
              y base de datos
            </text>
            <text
              x={606}
              y={202}
              className="fill-success font-sans text-[11px]"
            >
              ✓ ejecuta
            </text>
            <text x={672} y={202} className="fill-danger font-sans text-[11px]">
              ✗ rechaza
            </text>
          </Node>

          <path
            d="M 592 184 L 548 184"
            fill="none"
            strokeWidth={1.5}
            markerEnd="url(#method-arrow)"
            className="stroke-muted-foreground/60"
          />
          <text x={566} y={198} textAnchor="middle" className={label}>
            resultado
          </text>

          <path
            d="M 776 166 L 796 166"
            fill="none"
            strokeWidth={1.5}
            markerEnd="url(#method-arrow)"
            className="stroke-muted-foreground/60"
          />

          <Node x={800} y={118} w={168} title="05 · Respuesta">
            <text x={814} y={166} className={desc}>
              según las tools usadas
            </text>
          </Node>
        </svg>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <div className="rounded-md border border-white/15 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] text-muted-foreground">01</p>
          <p className="text-sm font-medium">Entrada</p>
          <p className="mt-1 text-xs text-muted-foreground">el mensaje llega</p>
        </div>

        <div className="rounded-md border border-white/15 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] text-muted-foreground">02</p>
          <p className="text-sm font-medium">Sistema</p>
          <p className="mt-1 text-xs text-muted-foreground">prompt dinámico</p>
          <p className="text-xs text-muted-foreground">tools del estado</p>
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Iteración
          </p>
          <div className="flex flex-col gap-2 rounded-lg border border-dashed border-white/15 p-4">
            <div className="rounded-md border border-dashed border-white/20 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] text-muted-foreground">03</p>
              <p className="text-sm font-medium">Agente</p>
              <p className="mt-1 text-xs text-muted-foreground">
                elige qué tool usar
              </p>
            </div>
            <p className="text-center font-mono text-[10px] text-muted-foreground">
              ↓ elige
            </p>
            <div className="rounded-md border border-primary/50 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] text-primary">04</p>
              <p className="text-sm font-medium text-primary">Tool</p>
              <p className="mt-1 text-xs text-muted-foreground">
                valida contra reglas y base de datos
              </p>
              <p className="mt-1 text-xs">
                <span className="text-success">✓ ejecuta</span>{" "}
                <span className="text-danger">✗ rechaza</span>
              </p>
            </div>
            <p className="text-center font-mono text-[10px] text-muted-foreground">
              ↑ vuelve el resultado
            </p>
          </div>
        </div>

        <div className="rounded-md border border-white/15 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] text-muted-foreground">05</p>
          <p className="text-sm font-medium">Respuesta</p>
          <p className="mt-1 text-xs text-muted-foreground">
            según las tools usadas
          </p>
        </div>
      </div>
    </div>
  );
}
