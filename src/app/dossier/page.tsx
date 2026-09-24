import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dossier — roddcode",
  robots: { index: false, follow: false },
};

const cta = SITE.whatsapp || SITE.cal;

const figures = [
  {
    value: "53%",
    desc: "menos tiempo de proceso",
    caption: "CRM que reemplazó a InConcert, Movistar (Telefónica)",
  },
  {
    value: "25% a <8%",
    desc: "citas perdidas",
    caption: "sistema de IA en producción para una clínica",
  },
  {
    value: "$0.001",
    desc: "por reserva",
    caption: "atención 24/7, sin intervención humana",
  },
  {
    value: "7",
    desc: "operaciones NDC",
    caption: "de AirShopping a OrderCancel, contra PROS",
  },
];

const failures = [
  {
    title: "La reserva que se duplica.",
    text: "Dos clientes para la misma hora y nadie sabe quién confirmó qué.",
  },
  {
    title: "El pago que se confirma solo.",
    text: "El modelo dice que sí a algo que no existe. Alguien lo paga.",
  },
  {
    title: "El lead de las 11 de la noche.",
    text: "Nadie responde hasta el lunes. El cliente ya compró en otro lado.",
  },
];

const causes = [
  "Datos que en la demo estaban limpios y en producción llegan incompletos.",
  "Integraciones postergadas para después.",
  "Sistemas sin observabilidad, donde nadie sabe qué está respondiendo la IA.",
  "Proyectos sin dueño claro, donde nadie puede decidir cuando algo sale mal.",
];

const procedure = [
  {
    num: "01",
    title: "Llamada de 30 minutos. Gratis.",
    text: "Me cuentas el problema y te digo si puedo ayudar. Si no, te lo digo igual y te recomiendo a alguien que sí.",
  },
  {
    num: "02",
    title: "Auditoría.",
    text: "Es el primer servicio pago (ver honorarios), no viene incluida en la llamada. Reviso qué toca plata y dónde no puede fallar. Te doy dos o tres enfoques con tiempos y contras.",
  },
  {
    num: "03",
    title: "Construcción por milestone.",
    text: "Pagas por entrega, no por hora. Spec y review antes de escribir código. Cada semana ves avance real.",
  },
  {
    num: "04",
    title: "El código queda tuyo.",
    text: "Sin dependencia. Si quieres, seguimos con un retainer para bugs, con SLA menor a 24 horas.",
  },
];

const dossiers = [
  {
    num: "001",
    name: "METEOR",
    title: "El CRM que reemplazó a InConcert en Movistar",
    image: {
      src: "/meteor-crm-dark.webp",
      alt: "Dashboard de leads de METEOR",
      w: 1600,
      h: 770,
    },
    caption: "METEOR. Dashboard de leads en producción.",
    before:
      "La gestión de leads y los reportes dependían de un sistema externo de $1,000 USD al mes. Cada proceso tomaba 169 minutos.",
    intervention:
      "Reescritura full-stack, migración de datos a SQL Server normalizado, reportes on-demand con validaciones configurables.",
    after:
      "79 minutos por proceso, dos pasos menos y tres herramientas en una. Licencias eliminadas. Un reporte pasó de 30 minutos manuales a 5 segundos.",
    seal: "53% menos tiempo, $1,000/mes menos, ROI en menos de 2 meses",
  },
  {
    num: "002",
    name: "SoffIA",
    title: "El sistema que atiende, agenda y valida pagos en una clínica",
    image: {
      src: "/captura-crm-soffia.webp",
      alt: "Dashboard del sistema de IA en producción",
      w: 1517,
      h: 908,
    },
    caption:
      "SoffIA. CRM del agente en producción: citas, pagos y leads en vivo.",
    before:
      "Los leads fuera de horario se perdían al 100%. Respuesta promedio: 47 minutos. Citas perdidas: cerca del 25%.",
    intervention:
      "Reglas deterministas: el modelo propone, la base de datos decide. Locks atómicos, idempotencia, validación de comprobantes y derivación a humano.",
    after:
      "Menos de 8 segundos de respuesta, 24/7. 100% de los leads nocturnos capturados. Citas perdidas bajo 8%. $0.001 por reserva.",
    seal: "Sin un solo double booking desde el deploy",
  },
  {
    num: "003",
    name: "Motor de vuelos",
    title: "Las 7 operaciones NDC de Air Europa en un motor en producción",
    image: null,
    caption: "",
    before:
      "Una aerolínea europea sin integrar en un motor que ya orquestaba más de una docena de proveedores, cada uno con su dialecto del mismo estándar.",
    intervention:
      "AirShopping, OfferPrice, OrderCreate, OrderRetrieve, OrderChange, OrderCancel y UpSell contra PROS. Builders y parsers XML a mano, homologación desde otras aerolíneas ya integradas.",
    after:
      "7 operaciones en producción, usadas por agencias reales, con 3 repos en release simultáneo. Después mapeé el motor completo por mi cuenta.",
    seal: "7 operaciones en producción",
  },
];

const pricing = [
  {
    title: "Auditoría técnica",
    price: "Desde $500",
    desc: "Tres días: reviso qué toca plata y dónde no puede fallar; te llevas un reporte con los riesgos priorizados y en qué orden arreglarlos.",
  },
  {
    title: "Build por milestone",
    price: "Desde $2,000",
    desc: "Apps, integraciones, migraciones y agentes. Entregas cada dos semanas, pago por entrega.",
  },
  {
    title: "Retainer",
    price: "Desde $250/mes",
    desc: "SLA menor a 24 horas para bugs y una revisión mensual. El alcance depende del sistema.",
  },
];

const exclusions = [
  "El modelo escribe directo en la base de datos, sin control.",
  "Solo hay presupuesto para probar suerte, no para auditar.",
  "Nadie del equipo puede dedicarle dos horas por semana.",
  "Se busca un chatbot para decir que la empresa usa IA.",
];

const verification = [
  {
    label: "GitHub",
    detail: "Código abierto y herramientas",
    href: "https://github.com/roddcode",
  },
  {
    label: "LinkedIn",
    detail: "Trayectoria y trabajo en producción",
    href: "https://www.linkedin.com/in/alejandro-alvarado-roddcode/",
  },
  {
    label: "reactive-fsm",
    detail: "86 tests, 5 adapters, MIT",
    href: "https://npmjs.com/package/reactive-fsm",
  },
];

const questions = [
  {
    question: "¿Trabajas remoto?",
    answer:
      "Sí. Trabajo con equipos de LATAM y España, en español, por WhatsApp y llamadas.",
  },
  {
    question: "¿Qué pasa si algo falla después del deploy?",
    answer:
      "Con retainer tienes SLA menor a 24 horas. Sin retainer, te entrego documentación y specs para que tu equipo pueda mantenerlo.",
  },
  { question: "¿Firmas NDA?", answer: "Sí." },
  {
    question: "¿Por qué no hacerlo con mi equipo?",
    answer:
      "Pueden. Yo entro en lo puntual: auditar un sistema, destrabar una integración o sacar algo a producción. Cuando termino, tu equipo se queda con el código y el contexto.",
  },
  {
    question: "¿Cuánto tarda?",
    answer: "Una auditoría, 3 días. Un build, de 2 a 6 semanas por milestone.",
  },
];

function Section({
  num,
  title,
  id,
  children,
}: { num: string; title: string; id?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-[var(--exp-rule)] py-14"
    >
      <h2 className="exp-display mb-8 text-sm font-semibold">
        § {num}. {title}
      </h2>
      {children}
    </section>
  );
}

export default function DossierPage() {
  return (
    <div className="exp min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--exp-rule)] bg-[var(--exp-paper)]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <span className="exp-display text-sm font-semibold tracking-tight">
            roddcode
          </span>
          <div className="flex items-center gap-6">
            <span className="exp-display text-xs text-[var(--exp-muted)]">
              Expediente 2026
            </span>
            <Link
              href={cta}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-display text-xs font-semibold text-[var(--exp-verified)] underline decoration-[var(--exp-rule)] underline-offset-4"
            >
              Hablemos
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6">
        <Section num="1" title="Resumen">
          <h1 className="exp-display mb-6 max-w-2xl text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Sistemas con IA que no fallan cuando hay plata en juego.
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed">
            Auditoría e ingeniería para sistemas que manejan reservas, pagos o
            datos de clientes. Primero encuentro dónde puede fallar. Después lo
            construyo para que no falle.
          </p>
          <table className="mb-10 w-full text-sm">
            <tbody>
              {figures.map((figure) => (
                <tr
                  key={figure.desc}
                  className="border-t border-[var(--exp-rule)] last:border-b"
                >
                  <td className="whitespace-nowrap py-3 pr-6 text-lg font-semibold">
                    {figure.value}
                  </td>
                  <td className="py-3 pr-6">{figure.desc}</td>
                  <td className="hidden py-3 text-[var(--exp-muted)] sm:table-cell">
                    {figure.caption}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={cta}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-display bg-[var(--exp-ink)] px-6 py-3 text-sm font-medium text-[var(--exp-paper)]"
              style={{ borderRadius: 2 }}
            >
              Hablemos 30 minutos
            </Link>
            <a
              href="#expedientes"
              className="exp-display text-sm underline decoration-[var(--exp-rule)] underline-offset-4"
            >
              Ver los expedientes
            </a>
          </div>
        </Section>

        <Section num="2" title="Objeto">
          <p className="mb-8 max-w-2xl">
            Cuando un sistema con IA toca plata, se rompe de tres formas. Y las
            tres cuestan.
          </p>
          <div className="grid max-w-2xl gap-6">
            {failures.map((failure) => (
              <div key={failure.title}>
                <p className="font-semibold">{failure.title}</p>
                <p className="text-[var(--exp-muted)]">{failure.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl font-semibold">
            Ninguno de esos errores es culpa del modelo. Son errores de diseño.
          </p>
        </Section>

        <Section num="3" title="Hallazgos">
          <p className="mb-6 max-w-2xl">
            El 70 al 85 por ciento de los proyectos de IA no llegan a
            producción. La cifra exacta cambia según quién la mida (Gartner,
            S&amp;P y RAND publican números parecidos), pero el orden se repite.
            El culpable casi nunca es el modelo.
          </p>
          <ul className="mb-8 max-w-2xl">
            {causes.map((cause) => (
              <li
                key={cause}
                className="border-t border-[var(--exp-rule)] py-3 last:border-b"
              >
                {cause}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl font-semibold">
            La tecnología ya está. Lo que falta es el diseño.
          </p>
        </Section>

        <Section num="4" title="Método">
          <p className="mb-6 max-w-2xl text-xl md:text-2xl">
            El modelo propone, la base de datos decide.
          </p>
          <p className="mb-4 max-w-2xl">
            El LLM conversa, clasifica, resume. No confirma pagos, no agenda
            citas, no ejecuta nada irreversible. De eso se encarga el código
            determinista: locks atómicos, idempotencia, reglas que solo ejecutan
            lo que existe.
          </p>
          <p className="max-w-2xl">
            Suena más lento. No lo es. Es la diferencia entre un sistema que
            promete y un sistema que cumple.
          </p>
        </Section>

        <Section num="5" title="Procedimiento">
          <ol className="max-w-2xl">
            {procedure.map((step) => (
              <li
                key={step.num}
                className="flex gap-6 border-t border-[var(--exp-rule)] py-4 last:border-b"
              >
                <span className="exp-display w-8 shrink-0 pt-0.5 text-sm font-semibold text-[var(--exp-muted)]">
                  {step.num}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--exp-muted)]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section num="6" title="Expedientes" id="expedientes">
          {dossiers.map((dossier) => (
            <article key={dossier.num} className="mb-16 max-w-2xl last:mb-0">
              <h3 className="exp-display mb-1 text-base font-semibold">
                Expediente {dossier.num}. {dossier.name}
              </h3>
              <p className="mb-6">{dossier.title}</p>
              {dossier.image && (
                <figure className="mb-6">
                  <Image
                    src={dossier.image.src}
                    alt={dossier.image.alt}
                    width={dossier.image.w}
                    height={dossier.image.h}
                    className="h-auto w-full border border-[var(--exp-rule)]"
                    style={{ borderRadius: 2 }}
                    sizes="(max-width: 48rem) calc(100vw - 3rem), 45rem"
                  />
                  <figcaption className="mt-2 text-xs text-[var(--exp-muted)]">
                    {dossier.caption}
                  </figcaption>
                </figure>
              )}
              <table className="mb-6 w-full text-sm">
                <tbody>
                  <tr className="border-t border-[var(--exp-rule)]">
                    <td className="exp-display w-28 py-3 pr-6 align-top text-xs text-[var(--exp-muted)]">
                      Antes
                    </td>
                    <td className="py-3">{dossier.before}</td>
                  </tr>
                  <tr className="border-t border-[var(--exp-rule)]">
                    <td className="exp-display w-28 py-3 pr-6 align-top text-xs text-[var(--exp-muted)]">
                      Intervención
                    </td>
                    <td className="py-3">{dossier.intervention}</td>
                  </tr>
                  <tr className="border-t border-[var(--exp-rule)] last:border-b">
                    <td className="exp-display w-28 py-3 pr-6 align-top text-xs text-[var(--exp-muted)]">
                      Después
                    </td>
                    <td className="py-3">{dossier.after}</td>
                  </tr>
                </tbody>
              </table>
              <div className="exp-seal inline-block px-4 py-2">
                <p className="text-[11px] font-semibold tracking-wide">
                  VERIFICADO EN PRODUCCIÓN
                </p>
                <p className="mt-0.5 text-xs">{dossier.seal}</p>
              </div>
            </article>
          ))}
        </Section>

        <Section num="7" title="Honorarios">
          <table className="max-w-2xl w-full text-sm">
            <tbody>
              {pricing.map((item) => (
                <tr
                  key={item.title}
                  className="border-t border-[var(--exp-rule)] last:border-b"
                >
                  <td className="w-44 py-4 pr-6 align-top font-semibold">
                    {item.title}
                  </td>
                  <td className="w-36 whitespace-nowrap py-4 pr-6 align-top font-semibold">
                    {item.price}
                  </td>
                  <td className="py-4 align-top text-[var(--exp-muted)]">
                    {item.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section num="8" title="Exclusiones">
          <p className="mb-6 max-w-2xl">No trabajo en proyectos donde:</p>
          <ul className="mb-8 max-w-2xl">
            {exclusions.map((item) => (
              <li
                key={item}
                className="border-t border-[var(--exp-rule)] py-3 last:border-b"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl font-semibold">
            Prefiero decir que no rápido antes que dejarte a medias.
          </p>
        </Section>

        <Section num="9" title="Verificación">
          <ul className="max-w-2xl">
            {verification.map((item) => (
              <li
                key={item.label}
                className="border-t border-[var(--exp-rule)] last:border-b"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-4 py-3"
                >
                  <span className="exp-display w-32 shrink-0 font-semibold">
                    {item.label}
                  </span>
                  <span className="text-sm text-[var(--exp-muted)]">
                    {item.detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="10" title="Preguntas">
          <div className="max-w-2xl">
            {questions.map((item) => (
              <details
                key={item.question}
                className="group border-t border-[var(--exp-rule)] py-4 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="exp-display text-sm text-[var(--exp-muted)] group-open:hidden"
                    aria-hidden
                  >
                    +
                  </span>
                  <span
                    className="exp-display hidden text-sm text-[var(--exp-muted)] group-open:inline"
                    aria-hidden
                  >
                    −
                  </span>
                </summary>
                <p className="mt-3 text-[var(--exp-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section num="11" title="Contacto">
          <p className="mb-6 flex items-center gap-3 text-sm">
            <span
              className="inline-block h-2 w-2 rounded-full bg-[var(--exp-verified)]"
              aria-hidden
            />
            Disponible para un proyecto. Respondo en menos de 4 horas.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={cta}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-display bg-[var(--exp-ink)] px-6 py-3 text-sm font-medium text-[var(--exp-paper)]"
              style={{ borderRadius: 2 }}
            >
              Hablemos 30 minutos
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm underline decoration-[var(--exp-rule)] underline-offset-4"
            >
              {SITE.email}
            </a>
          </div>
        </Section>

        <footer className="flex items-center justify-between py-10 text-xs text-[var(--exp-muted)]">
          <span>© {new Date().getFullYear()} Alejandro Alvarado</span>
          <a
            href="#top"
            className="underline decoration-[var(--exp-rule)] underline-offset-4"
          >
            Arriba
          </a>
        </footer>
      </main>
    </div>
  );
}
