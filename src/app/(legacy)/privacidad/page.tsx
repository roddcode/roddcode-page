import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacidad | roddcode",
  description:
    "Qué datos trato en roddcode.com, para qué, con quién se comparten y cómo ejercer tus derechos.",
  alternates: { canonical: "/privacidad" },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="mb-3 font-sans text-base font-medium tracking-tight">
        {title}
      </h2>
      <div className="flex max-w-2xl flex-col gap-3 text-sm leading-relaxed text-secondary-foreground">
        {children}
      </div>
    </section>
  );
}

export default function PrivacidadPage() {
  return (
    <div className="container-site max-w-3xl py-16 md:py-24">
      <Link
        href="/"
        className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        ← roddcode
      </Link>

      <p className="mt-12 mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">
        Legal
      </p>
      <h1 className="mb-4 font-sans text-3xl font-medium tracking-tight md:text-4xl">
        Privacidad
      </h1>
      <p className="max-w-2xl text-secondary-foreground">
        Qué datos personales toco cuando usas este sitio o me escribes, y qué
        hago con ellos. En corto: los uso para responderte y coordinar una
        llamada.
      </p>

      <div className="mt-12">
        <Block title="Quién es el responsable">
          <p>
            Alejandro Alvarado (roddcode), con domicilio en Lima, Perú. Para
            cualquier tema de privacidad puedes escribirme a{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-primary hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
        </Block>

        <Block title="Qué datos trato">
          <ul className="flex flex-col gap-2">
            <li>
              Los que me mandas por correo electrónico cuando me escribes.
            </li>
            <li>
              Los que compartes al agendar una llamada (nombre, correo y
              horario), a través de Cal.com.
            </li>
            <li>
              Métricas técnicas agregadas del sitio: sin cookies y sin
              identificarte. La analítica usa un hash anónimo que se borra cada
              24 horas.
            </li>
          </ul>
        </Block>

        <Block title="Para qué los uso">
          <ul className="flex flex-col gap-2">
            <li>Responder tus consultas y coordinar llamadas.</li>
            <li>Entender, de forma agregada, qué partes del sitio se usan.</li>
          </ul>
          <p>
            No los uso para publicidad, no los vendo ni los cedo a terceros, y
            no tomo decisiones automatizadas con ellos.
          </p>
        </Block>

        <Block title="Con quién se comparten">
          <p>
            Solo con los proveedores que hacen funcionar el sitio: Vercel
            (hosting y analítica), Cal.com (agendamiento) y Google (correo).
            Pueden tratar datos fuera del Perú, principalmente en Estados
            Unidos, bajo sus términos y marcos de transferencia vigentes.
          </p>
          <p>
            Cuando agendas una llamada sales a Cal.com, que aplica su propia
            política de privacidad.
          </p>
        </Block>

        <Block title="Cuánto tiempo los conservo">
          <p>
            El necesario para responder tu consulta y mantener la relación
            comercial. Los correos se conservan solo mientras sean útiles para
            el seguimiento de la conversación.
          </p>
        </Block>

        <Block title="Tus derechos">
          <p>
            Acceso, rectificación, cancelación, oposición y portabilidad (Ley
            29733 de Perú). Si estás en España o la Unión Europea, además:
            acceso, rectificación, supresión, limitación del tratamiento,
            oposición y portabilidad (RGPD).
          </p>
          <p>
            Para ejercer cualquiera de ellos, escríbeme a{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-primary hover:underline"
            >
              {SITE.email}
            </a>{" "}
            y te respondo. También puedes reclamar ante tu autoridad de
            protección de datos: la ANPD en Perú o la AEPD en España.
          </p>
        </Block>

        <Block title="Cookies">
          <p>Este sitio no usa cookies. No hay nada que aceptar ni rechazar.</p>
        </Block>

        <Block title="Menores">
          <p>
            El sitio no está dirigido a menores de edad y no recojo datos suyos
            de forma consciente.
          </p>
        </Block>

        <Block title="Cambios">
          <p>
            Si algo cambia en esta política, actualizo esta página y la fecha de
            abajo.
          </p>
        </Block>
      </div>

      <div className="mt-4 border-t border-white/10 pt-6">
        <p className="font-mono text-[11px] text-muted-foreground">
          Última actualización: 24 de septiembre de 2026
        </p>
      </div>
    </div>
  );
}
