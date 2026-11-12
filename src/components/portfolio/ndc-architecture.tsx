import { getProjects } from "@/content/portfolio/projects";
import type { Locale } from "@/content/portfolio/types";
import { ArrowRight, Network } from "lucide-react";
import s from "./ndc-architecture.module.css";

export function NdcArchitecture({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const delivery = getProjects(locale).find(
    (project) => project.slug === "ndc",
  )?.delivery;

  if (!delivery) return null;

  return (
    <div className={s.diagram} aria-hidden="true">
      <div className={s.header}>
        <Network size={18} />
        <strong>{es ? "Motor de vuelos" : "Flight engine"}</strong>
        <span>SOAP / XML</span>
      </div>
      <div className={s.flow}>
        <div className={s.node}>
          <span>{es ? "Multiproveedor" : "Multi-provider"}</span>
          <strong>{es ? "Motor de vuelos" : "Flight engine"}</strong>
        </div>
        <ArrowRight size={18} />
        <div className={`${s.node} ${s.integration}`}>
          <span>{es ? "Integración" : "Integration"}</span>
          <strong>NDC</strong>
        </div>
        <ArrowRight size={18} />
        <div className={s.node}>
          <span>{es ? "Proveedor" : "Provider"}</span>
          <strong>Air Europa</strong>
        </div>
      </div>
      <div className={s.scope}>
        <div>
          <span>{es ? "Integración" : "Integration"}</span>
          <strong>
            {es
              ? `${delivery.ndcOperations} operaciones`
              : `${delivery.ndcOperations} operations`}
          </strong>
          <p>
            {es ? "Ofertas, órdenes y cambios" : "Offers, orders and changes"}
          </p>
        </div>
        <div>
          <span>{es ? "Migración .NET" : ".NET migration"}</span>
          <strong>
            {es
              ? `${delivery.migratedRepositories} repositorios`
              : `${delivery.migratedRepositories} repositories`}
          </strong>
          <p>
            {es
              ? "Compatibilidad y entrega en producción"
              : "Compatibility and production delivery"}
          </p>
        </div>
      </div>
    </div>
  );
}
