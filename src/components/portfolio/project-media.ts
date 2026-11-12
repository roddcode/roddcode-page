import type { Locale, ProjectSlug } from "@/content/portfolio/types";
import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import meteorCapture from "../../../public/work/meteor-crm-redacted.webp";
import soffiaCapture from "../../../public/work/soffia-panel-redacted.webp";
import { NdcArchitecture } from "./ndc-architecture";

type ResourceCopy = Record<Locale, { alt: string; caption: string }>;

type ImageResource = {
  kind: "image";
  image: StaticImageData;
  copy: ResourceCopy;
};

type DiagramResource = {
  kind: "diagram";
  component: ComponentType<{ locale: Locale }>;
  copy: ResourceCopy;
};

export type ProjectResource = ImageResource | DiagramResource;

// One media source for home, index and case headers.
export const projectMedia: Partial<Record<ProjectSlug, ProjectResource>> = {
  soffia: {
    kind: "image",
    image: soffiaCapture,
    copy: {
      es: {
        alt: "Panel de SoffIA en un entorno dental de demostración, editado para ocultar datos personales.",
        caption:
          "Panel en un entorno dental de demostración. Imagen editada para ocultar datos personales.",
      },
      en: {
        alt: "SoffIA dashboard in a dental demo environment, edited to conceal personal data.",
        caption:
          "Dashboard in a dental demo environment. Image edited to conceal personal data.",
      },
    },
  },
  meteor: {
    kind: "image",
    image: meteorCapture,
    copy: {
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
  },
  ndc: {
    kind: "diagram",
    component: NdcArchitecture,
    copy: {
      es: {
        alt: "Esquema simplificado del motor multiproveedor, la integración de Air Europa mediante SOAP/XML, las operaciones NDC y la migración de repositorios .NET.",
        caption:
          "Esquema explicativo; no representa la arquitectura interna exacta.",
      },
      en: {
        alt: "Simplified diagram of the multi-provider engine, Air Europa SOAP/XML integration, NDC operations and migration of .NET repositories.",
        caption:
          "Explanatory diagram; not an exact representation of the internal architecture.",
      },
    },
  },
};
