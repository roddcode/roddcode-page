export function NdcDiagram() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-5">
      <div className="rounded-md border border-white/12 bg-white/[0.02] p-4">
        <p className="font-mono text-[10px] text-muted-foreground">BÚSQUEDA</p>
        <p className="mt-1 text-sm font-medium">Una agencia busca un vuelo</p>
      </div>

      <p
        className="text-center font-mono text-[10px] text-muted-foreground"
        aria-hidden
      >
        ↓
      </p>

      <div className="rounded-md border border-white/12 bg-white/[0.02] p-4">
        <p className="font-mono text-[10px] text-muted-foreground">MOTOR</p>
        <p className="mt-1 text-sm font-medium">12 proveedores en paralelo</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {["XML plano", "SOAP", "JSON"].map((dialect) => (
            <span
              key={dialect}
              className="rounded border border-white/12 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {dialect}
            </span>
          ))}
          <span className="font-mono text-[10px] text-muted-foreground">
            sistemas viejos que hablan distinto
          </span>
        </div>
      </div>

      <p
        className="text-center font-mono text-[10px] text-muted-foreground"
        aria-hidden
      >
        ↓
      </p>

      <div className="rounded-md border border-primary/40 bg-white/[0.02] p-4">
        <p className="font-mono text-[10px] text-primary">AIR EUROPA</p>
        <p className="mt-1 text-sm font-medium">
          Las 7 operaciones, sin romper producción
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          AirShopping, OfferPrice, OrderCreate, OrderRetrieve, OrderChange,
          OrderCancel y UpSell contra PROS, homologada desde otras aerolíneas.
        </p>
        <p className="mt-2 text-xs text-success">
          ✓ en producción, con agencias reales
        </p>
      </div>
    </div>
  );
}
