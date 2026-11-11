import type { Locale, ProjectSlug } from "@/content/portfolio";
import {
  Bot,
  Braces,
  Database,
  FileCheck2,
  Plane,
  Workflow,
} from "lucide-react";
import s from "./portfolio.module.css";

export function ProjectArt({
  slug,
  locale,
}: { slug: ProjectSlug; locale: Locale }) {
  const es = locale === "es";
  return (
    <div className={s.projectArt} data-project={slug} aria-hidden="true">
      {slug === "soffia" ? (
        <>
          <svg
            className={s.artLines}
            viewBox="0 0 500 280"
            fill="none"
            aria-hidden="true"
          >
            <path d="M80 140h340M250 55v170" />
            <circle cx="250" cy="140" r="92" />
            <circle cx="250" cy="140" r="120" />
          </svg>
          <div className={s.artNode}>
            <Bot size={35} strokeWidth={1.2} />
            <span>{es ? "Intención" : "Intent"}</span>
          </div>
          <div className={`${s.artNode} ${s.artNodeCenter}`}>
            <Workflow size={35} strokeWidth={1.2} />
            <span>{es ? "Reglas" : "Rules"}</span>
          </div>
          <div className={s.artNode}>
            <Database size={35} strokeWidth={1.2} />
            <span>{es ? "Reserva" : "Booking"}</span>
          </div>
        </>
      ) : slug === "ndc" ? (
        <>
          <svg
            className={s.artLines}
            viewBox="0 0 500 280"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M55 215Q250 -80 445 215M55 215h390"
              strokeDasharray="4 7"
            />
            <circle cx="55" cy="215" r="4" />
            <circle cx="445" cy="215" r="4" />
          </svg>
          <div className={s.xmlToken}>
            <Braces size={26} strokeWidth={1.2} />
            <span>OrderCreate</span>
          </div>
          <Plane className={s.artPlane} size={62} strokeWidth={1} />
          <div className={s.artCaption}>
            {es ? "Un contrato. Dos sistemas." : "One contract. Two systems."}
          </div>
        </>
      ) : (
        <>
          <div className={s.meteorStack}>
            <span />
            <span />
            <span />
            <FileCheck2 size={51} strokeWidth={1} />
          </div>
          <div className={s.meteorFlow}>
            <span>{es ? "Leads" : "Leads"}</span>
            <i />
            <span>{es ? "Consulta" : "Query"}</span>
            <i />
            <span>{es ? "Reporte" : "Report"}</span>
          </div>
        </>
      )}
    </div>
  );
}
