import { LegalBlock, LegalList } from "@/components/page-shell";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad | roddcode",
  description:
    "Qué datos trato en roddcode.com, para qué, con quién se comparten y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

const Mail = () => (
  <a
    href={`mailto:${SITE.email}`}
    className="text-accent underline-offset-4 hover:underline"
  >
    {SITE.email}
  </a>
);

export default function PrivacidadPage() {
  return (
    <>
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Privacidad
      </h1>
      <p className="mt-5 mb-12 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        Qué datos personales toco cuando usas este sitio o me escribes, y qué
        hago con ellos. En corto: los uso para responderte y coordinar una
        llamada.
      </p>

      <div>
        <LegalBlock title="Quién es el responsable">
          <p>
            Alejandro Alvarado (roddcode), con domicilio en Lima, Perú. Para
            cualquier tema de privacidad puedes escribirme a <Mail />.
          </p>
        </LegalBlock>

        <LegalBlock title="Qué datos trato">
          <LegalList
            items={[
              "Los que me mandas por correo electrónico cuando me escribes.",
              "Tu preferencia de idioma, guardada en una cookie funcional.",
              "Métricas técnicas agregadas de Vercel Analytics y Speed Insights, sin cookies de seguimiento.",
            ]}
          />
        </LegalBlock>

        <LegalBlock title="Para qué los uso">
          <LegalList
            items={[
              "Responder tus consultas y coordinar llamadas.",
              "Entender, de forma agregada, qué partes del sitio se usan.",
            ]}
          />
          <p>
            No los uso para publicidad ni los vendo. Solo los comparto con los
            proveedores descritos abajo y no tomo decisiones automatizadas con
            ellos.
          </p>
        </LegalBlock>

        <LegalBlock title="Con quién se comparten">
          <p>
            Solo con los proveedores que hacen funcionar el sitio: Vercel
            (hosting y métricas técnicas) y Google (correo). Pueden tratar datos
            fuera del Perú, principalmente en Estados Unidos, bajo sus términos
            y marcos de transferencia vigentes.
          </p>
          <p>
            Si sigues un enlace a LinkedIn, GitHub o npm, sales de este sitio y
            se aplica la política de privacidad de ese servicio.
          </p>
        </LegalBlock>

        <LegalBlock title="Cuánto tiempo los conservo">
          <p>
            El necesario para responder tu consulta y mantener la relación
            comercial. Los correos se conservan solo mientras sean útiles para
            el seguimiento de la conversación.
          </p>
        </LegalBlock>

        <LegalBlock title="Tus derechos">
          <p>
            Acceso, rectificación, cancelación, oposición y portabilidad (Ley
            29733 de Perú). Si estás en España o la Unión Europea, además:
            acceso, rectificación, supresión, limitación del tratamiento,
            oposición y portabilidad (RGPD).
          </p>
          <p>
            Para ejercer cualquiera de ellos, escríbeme a <Mail /> y te
            respondo. También puedes reclamar ante tu autoridad de protección de
            datos: la ANPD en Perú o la AEPD en España.
          </p>
        </LegalBlock>

        <LegalBlock title="Cookies">
          <p>
            Uso la cookie funcional NEXT_LOCALE para recordar si prefieres
            español o inglés. Dura un año y puedes eliminarla desde tu
            navegador. No uso cookies publicitarias ni de seguimiento.
          </p>
        </LegalBlock>

        <LegalBlock title="Menores">
          <p>
            El sitio no está dirigido a menores de edad y no recojo datos suyos
            de forma consciente.
          </p>
        </LegalBlock>

        <LegalBlock title="Cambios">
          <p>
            Si algo cambia en esta política, actualizo esta página y la fecha de
            abajo.
          </p>
        </LegalBlock>
      </div>

      <p className="mt-4 border-t border-line pt-6 font-mono text-xs text-ink-4">
        Última actualización: 2 de noviembre de 2026
      </p>
    </>
  );
}
