import type { Locale, ProjectSlug } from "@/content/portfolio";
import { ArrowUpRight, Braces } from "lucide-react";
import Image from "next/image";
import meteorCapture from "../../../public/work/meteor-crm-redacted.webp";
import soffiaCapture from "../../../public/work/soffia-panel-redacted.webp";
import { NdcPreview } from "./ndc-preview";
import s from "./portfolio.module.css";

// One media source for home, index and case headers. Raw captures stay outside public.
const captures = {
  soffia: {
    image: soffiaCapture,
    es: {
      alt: "Panel de SoffIA con agenda, actividad automática y contactos; datos personales ocultos.",
      caption:
        "Panel en un entorno dental de demostración. Imagen editada para ocultar datos personales.",
    },
    en: {
      alt: "SoffIA dashboard with scheduling, automated activity and contacts; personal data concealed.",
      caption:
        "Dashboard in a dental demo environment. Image edited to conceal personal data.",
    },
  },
  meteor: {
    image: meteorCapture,
    es: {
      alt: "METEOR CRM para Movistar: filtros y tabla de leads con los datos ocultos.",
      caption:
        "Vista de gestión de leads de METEOR CRM. Imagen editada para ocultar datos de clientes.",
    },
    en: {
      alt: "METEOR CRM for Movistar: filters and a leads table with customer data concealed.",
      caption:
        "METEOR CRM lead management view. Image edited to conceal customer data.",
    },
  },
};

export function ProjectArt({
  slug,
  locale,
  detail = false,
}: {
  slug: ProjectSlug;
  locale: Locale;
  detail?: boolean;
}) {
  const es = locale === "es";
  if (slug === "soffia" || slug === "meteor") {
    const media = captures[slug];
    const text = media[locale];
    return (
      <figure className={s.projectMedia} data-project={slug}>
        <div className={s.projectMediaStage}>
          <Image
            src={media.image}
            alt={text.alt}
            fill
            sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1280px) 45vw, 580px"
            className={s.projectCapture}
          />
        </div>
        <figcaption className={s.projectMediaCaption}>
          <span>{text.caption}</span>
          {detail && (
            <a
              href={media.image.src}
              target="_blank"
              rel="noopener noreferrer"
              className={s.captureExpand}
            >
              {es ? "Ampliar imagen" : "View full image"}
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">
                {es ? " (pestaña nueva)" : " (new tab)"}
              </span>
            </a>
          )}
        </figcaption>
      </figure>
    );
  }
  if (slug === "ndc") {
    return (
      <figure className={s.projectMedia} data-project={slug}>
        <div
          role="img"
          aria-label={
            es
              ? "Mockup de una oferta de vuelo Madrid–Lima y el flujo NDC de consulta, precio y reserva."
              : "Mockup of a Madrid–Lima flight offer and the NDC shopping, pricing and booking flow."
          }
        >
          <NdcPreview locale={locale} />
        </div>
        <figcaption className={s.projectMediaCaption}>
          {es
            ? "Mockup ilustrativo de la integración NDC. Itinerario y estados de ejemplo."
            : "Illustrative NDC integration mockup. Sample itinerary and states."}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className={s.projectArt} aria-hidden="true">
      <Braces size={51} strokeWidth={1} />
    </div>
  );
}
