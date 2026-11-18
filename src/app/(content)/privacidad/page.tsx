import { LegalBlock, LegalList, PageShell } from "@/components/page-shell";
import { ExternalLink } from "@/components/ui/external-link";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad | roddcode",
  description:
    "Qué datos trato en roddcode.com, para qué, con quién se comparten y cómo ejercer tus derechos.",
  alternates: {
    canonical: "/privacidad",
    languages: { es: "/privacidad", en: "/en/privacy" },
  },
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
    <PageShell
      locale="es"
      path="/privacidad"
      languagePaths={{ es: "/privacidad", en: "/privacy" }}
    >
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Privacidad
      </h1>
      <p className="mt-5 mb-12 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        Qué datos trato cuando visitas este sitio o me escribes: tus
        preferencias, las estadísticas de uso y la información que envías por
        correo.
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
              "Preferencia de tema, guardada en el almacenamiento local de tu navegador.",
              "Con Umami Cloud: páginas visitadas, procedencia, navegador, dispositivo, idioma, tamaño de pantalla, ubicación aproximada y clics en CV, correo, GitHub y casos del portafolio.",
              "Con Vercel Speed Insights: métricas de carga y respuesta, ruta, navegador, dispositivo, país y otros datos técnicos de rendimiento.",
            ]}
          />
        </LegalBlock>

        <LegalBlock title="Cómo funciona la analítica">
          <p>
            Umami Cloud se carga cuando está configurado en la versión de
            producción. No añado cookies de analítica ni identificadores de
            cuenta. Excluyo consultas y fragmentos de la URL visitada; los
            eventos personalizados solo llevan el nombre de la acción y, para un
            caso, el proyecto.
          </p>
          <p>
            Según Umami, la IP se procesa para obtener una ubicación aproximada
            y derivar identificadores que agrupan visitas, junto con información
            del navegador. No se guarda como campo en los registros estándar de
            analítica, pero Umami y su infraestructura pueden tratarla en
            registros operativos y de seguridad. Esto no garantiza anonimato
            absoluto.
          </p>
          <p>
            No activo grabaciones de sesiones, mapas de calor ni captura de
            errores. Tampoco asocio las métricas a nombres, correos o cuentas de
            visitantes. Esta versión retira Vercel Web Analytics; Vercel Speed
            Insights continúa para medir rendimiento.
          </p>
        </LegalBlock>

        <LegalBlock title="Para qué los uso">
          <LegalList
            items={[
              "Responder tus consultas y coordinar llamadas.",
              "Conocer el tráfico y qué proyectos o acciones profesionales despiertan interés.",
              "Comprobar el rendimiento real del sitio.",
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
            Utilizo Umami Software, Inc. para analítica, Vercel para alojamiento
            y rendimiento, y Google para correo. Estos proveedores y su
            infraestructura pueden tratar datos fuera del Perú, incluidos
            Estados Unidos y la Unión Europea. Sus acuerdos de tratamiento
            describen las condiciones y garantías de esas transferencias.
          </p>
          <p>
            Consulta la{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="es"
              href="https://umami.is/privacy"
            >
              política de Umami
            </ExternalLink>
            , su{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="es"
              href="https://umami.is/dpa"
            >
              acuerdo de tratamiento
            </ExternalLink>
            , la{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="es"
              href="https://umami.is/subprocessors"
            >
              lista de subencargados
            </ExternalLink>{" "}
            y la{" "}
            <ExternalLink
              className="text-accent underline underline-offset-4"
              locale="es"
              href="https://vercel.com/docs/speed-insights/privacy-policy"
            >
              información de Speed Insights
            </ExternalLink>
            .
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
          <p>
            El plan Hobby de Umami Cloud que utilizo conserva las métricas
            durante seis meses. Ese plazo no equivale a la eliminación inmediata
            de todas las copias de seguridad o registros operativos: estos
            siguen los ciclos y obligaciones descritos en su acuerdo de
            tratamiento.
          </p>
          <p>
            La conservación de métricas y registros de Vercel depende del plan y
            de sus políticas. Retirar Web Analytics del código no elimina por sí
            solo los datos que pudieran haberse recogido antes.
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
            navegador. La preferencia de tema se guarda localmente hasta que la
            cambies o borres el almacenamiento del sitio. No uso cookies
            publicitarias; el tracker de Umami funciona sin cookies. Respeta Do
            Not Track cuando el navegador expone esa preferencia. Puedes
            bloquear el tracker y seguir utilizando el portafolio.
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
        Última actualización: 17 de noviembre de 2026
      </p>
    </PageShell>
  );
}
