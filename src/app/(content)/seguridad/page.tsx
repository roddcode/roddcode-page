import { LegalBlock, LegalList } from "@/components/page-shell";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguridad | roddcode",
  description:
    "Cómo reportar una vulnerabilidad en roddcode.com: qué está en alcance, qué incluir en el reporte y qué esperar.",
  alternates: { canonical: "/seguridad" },
};

const Mail = () => (
  <a
    href={`mailto:${SITE.email}?subject=Seguridad`}
    className="text-accent underline-offset-4 hover:underline"
  >
    {SITE.email}
  </a>
);

export default function SeguridadPage() {
  return (
    <>
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Seguridad
      </h1>
      <p className="mt-5 mb-12 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        Si encontraste una vulnerabilidad en este sitio, quiero saberlo. Te
        contesto yo, no un formulario.
      </p>

      <div>
        <LegalBlock title="Cómo reportar">
          <p>
            Escríbeme a <Mail /> con el asunto «Seguridad» precargado. Incluye
            lo necesario para reproducirlo: la URL, los pasos y el impacto que
            crees que tiene.
          </p>
          <p>
            Si el reporte está bien descrito, puedo confirmarlo sin pedirte más
            de lo que ya escribiste.
          </p>
        </LegalBlock>

        <LegalBlock title="Qué está en alcance">
          <LegalList
            items={[
              "roddcode.com y todas sus rutas públicas.",
              "Los formularios y enlaces de contacto del sitio.",
              "La configuración del servidor que sirve este dominio.",
            ]}
          />
          <p>
            Fuera de alcance: ingeniería social, denegación de servicio, ataques
            de fuerza bruta, y cualquier prueba sobre servicios de terceros que
            el sitio use (Vercel, Google). Para esos, reportá directamente a
            ellos.
          </p>
        </LegalBlock>

        <LegalBlock title="Qué esperar">
          <LegalList
            items={[
              "Acuse de recibo y mi lectura del reporte.",
              "Confirmación de si es reproducible, o explicación de por qué no lo es.",
              "Si lo es: el arreglo, y aviso cuando esté desplegado.",
            ]}
          />
          <p>
            No hay programa de recompensas: este es un sitio personal, no un
            producto con bug bounty. Tampoco voy a tomar acciones legales contra
            quien reporte de buena fe y sin exfiltrar datos.
          </p>
        </LegalBlock>

        <LegalBlock title="Divulgación">
          <p>
            Te pido un margen razonable antes de publicar el detalle, para que
            el arreglo esté en producción. Si el reporte involucra datos de
            terceros, avisame primero y no los incluyas en capturas.
          </p>
        </LegalBlock>

        <LegalBlock title="Formato estándar">
          <p>
            La política también está publicada como{" "}
            <a
              href="/.well-known/security.txt"
              className="text-accent underline-offset-4 hover:underline"
            >
              security.txt
            </a>
            , que es el formato que leen las herramientas automáticas de
            reporte.
          </p>
        </LegalBlock>
      </div>

      <p className="mt-4 border-t border-line pt-6 font-mono text-xs text-ink-4">
        Última actualización: 27 de octubre de 2026
      </p>
    </>
  );
}
