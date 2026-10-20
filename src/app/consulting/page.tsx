import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting | roddcode",
  description:
    "Auditoría de arquitectura y milestones de producción para sistemas transaccionales con IA, .NET, TypeScript y PostgreSQL.",
  alternates: { canonical: "/consulting" },
};

export default function ConsultingPage() {
  return (
    <div className="container-site max-w-3xl py-24 md:py-32">
      <Link
        href="/"
        className="mb-12 inline-block text-sm font-mono text-muted-foreground transition-colors hover:text-foreground"
      >
        ← roddcode.com
      </Link>

      <header className="mb-16">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">
          Consulting
        </p>
        <h1 className="mb-6 text-balance font-sans text-4xl font-medium tracking-tight md:text-5xl">
          Arquitectura e integración para sistemas transaccionales
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-secondary-foreground">
          Para CTOs y founders técnicos que necesitan poner un flujo de IA en
          producción sin mutaciones inventadas, o destrabar una integración
          crítica en C#/.NET, SOAP o PostgreSQL.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-6 font-sans text-2xl font-medium tracking-tight">
          Cómo trabajo
        </h2>
        <div className="flex flex-col gap-8">
          <div className="border-t border-white/10 pt-6">
            <h3 className="mb-2 font-sans text-lg font-medium">
              Auditoría de arquitectura y confiabilidad · 5 días
            </h3>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              Reviso el pipeline del agente, la estrategia de locks de la base
              de datos o la integración con proveedores externos. Te llevas un
              reporte de riesgos priorizado, correcciones de estado y esquema,
              y una spec que tu equipo puede ejecutar.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6">
            <h3 className="mb-2 font-sans text-lg font-medium">
              Milestone de producción con alcance cerrado · 2 a 6 semanas
            </h3>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              Entrego un flujo determinista de agentes (tool gating, locks
              atómicos, idempotencia, observabilidad) o una integración
              enterprise en .NET, TypeScript y PostgreSQL. Sale a producción con
              documentación y handoff a tus ingenieros.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 font-sans text-2xl font-medium tracking-tight">
          Cuándo soy el fit
        </h2>
        <ul className="max-w-2xl">
          <li className="border-t border-white/10 py-4 text-sm leading-relaxed text-secondary-foreground">
            Sistemas transaccionales donde un error cuesta dinero: reservas,
            pagos, inventario o flujos B2B.
          </li>
          <li className="border-t border-white/10 py-4 text-sm leading-relaxed text-secondary-foreground">
            Equipos que pueden dedicar tiempo a revisar specs e invariantes
            antes de escribir código.
          </li>
          <li className="border-t border-white/10 py-4 text-sm leading-relaxed text-secondary-foreground">
            Integraciones con sistemas legacy, SOAP/XML o proveedores externos
            que no pueden romper producción.
          </li>
          <li className="border-t border-white/10 py-4 text-sm leading-relaxed text-secondary-foreground">
            Agentes LLM que necesitan una capa de control determinista antes de
            tocar la base de datos.
          </li>
        </ul>
      </section>

      <section className="border-t border-white/10 pt-10">
        <h2 className="mb-4 font-sans text-2xl font-medium tracking-tight">
          Hablemos
        </h2>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-secondary-foreground">
          Una llamada de 20 minutos para entender el sistema y decirte si soy
          la persona o si necesitas otra cosa.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={SITE.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary/90"
            style={{ borderRadius: 2 }}
          >
            Agendar 20 minutos
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="border border-white/15 px-6 py-3 text-sm text-secondary-foreground transition-colors hover:border-white/40 hover:text-foreground"
            style={{ borderRadius: 2 }}
          >
            {SITE.email}
          </a>
        </div>
      </section>
    </div>
  );
}
