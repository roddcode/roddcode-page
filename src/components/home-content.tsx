import { AnchorLink } from "@/components/anchor-link";
import { BrowserFrame } from "@/components/browser-frame";
import { ChatWhatsapp } from "@/components/chat-whatsapp";
import { CountUp } from "@/components/count-up";
import { FaqItem } from "@/components/faq-item";
import { Hero } from "@/components/hero";
import { LogsConsole } from "@/components/logs-console";
import { MethodDiagram } from "@/components/method-diagram";
import { NdcDiagram } from "@/components/ndc-diagram";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const trajectory = [
  {
    period: "2023–2024",
    title: "Web, CRM comercial y ERP logístico",
    detail:
      "Extensiones sobre SINTAD (el ERP que usa el cliente): logística, transporte, cargo y aduanas",
    result: "Funcionalidades end-to-end en 4 áreas",
  },
  {
    period: "2024–2025",
    title: "METEOR para Movistar (Telefónica)",
    detail:
      "CRM enterprise full-stack, en la cuenta digital de una operadora Tier 1",
    result: "53% menos proceso, $1,000/mes menos",
  },
  {
    period: "2026",
    title: "Integración NDC de Air Europa",
    detail: "AirShopping a OrderCancel, contra PROS",
    result: "7 operaciones en producción",
  },
  {
    period: "2026",
    title: "SoffIA",
    detail: "Sistema de IA determinista para clínicas dentales y estéticas",
    result: "Citas perdidas de 25% a menos de 8%",
  },
];

const verification = [
  {
    label: "Ver el código",
    detail: "GitHub: librerías y herramientas abiertas",
    href: "https://github.com/roddcode",
  },
  {
    label: "Auditar reactive-fsm",
    detail: "npm: 86 tests, 5 adapters, MIT",
    href: "https://npmjs.com/package/reactive-fsm",
  },
  {
    label: "Auditar exactly-once",
    detail: "npm: idempotencia para agentes, MIT",
    href: "https://npmjs.com/package/exactly-once",
  },
];

export const questions = [
  {
    question: "¿Qué roles buscas?",
    answer:
      "Roles remotos full-time o contract como AI Engineer, Applied AI Engineer, Software Engineer o Backend/Fullstack Engineer (.NET + TypeScript) en equipos con sistemas transaccionales.",
  },
  {
    question: "¿En qué huso horario trabajas?",
    answer:
      "Lima, Perú (UTC-5), con solapamiento completo para EE.UU., LATAM y mañanas de Europa.",
  },
  {
    question: "¿Qué sistemas has llevado a producción?",
    answer:
      "SoffIA, un agente de reservas para clínicas; la integración NDC de Air Europa en .NET; y METEOR, el CRM de Movistar en VML (WPP).",
  },
  {
    question: "¿Puedo revisar tu código?",
    answer:
      "Sí. reactive-fsm y exactly-once están en GitHub y npm, y los ensayos de arquitectura en /writing.",
  },
  {
    question: "¿Cómo te contacto?",
    answer: "roddcode.dev@gmail.com o LinkedIn. Respondo en menos de 24 horas.",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-balance font-sans text-3xl font-medium tracking-tight md:text-5xl">
      {children}
    </h2>
  );
}

export function HomeContent() {
  return (
    <div className="bg-background text-foreground">
      <Hero />

      {/* Results */}
      <section
        id="resultados"
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-16"
      >
        <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <p className="mb-2 font-sans text-4xl font-medium tracking-tight text-primary md:text-5xl">
              <CountUp value={53} suffix="%" />
            </p>
            <p className="mb-1 text-sm font-medium">menos tiempo de proceso</p>
            <p className="text-xs text-muted-foreground">
              CRM que reemplazó a InConcert. Movistar (Telefónica).
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-2 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              <span className="text-muted-foreground/40">25% → </span>
              <span className="text-primary">
                <CountUp value={8} prefix="<" suffix="%" />
              </span>
            </p>
            <p className="mb-1 text-sm font-medium">citas perdidas</p>
            <p className="text-xs text-muted-foreground">
              Sistema de IA en producción para una clínica dental.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mb-2 font-sans text-4xl font-medium tracking-tight text-primary md:text-5xl">
              <CountUp value={0.001} decimals={3} prefix="$" />
            </p>
            <p className="mb-1 text-sm font-medium">costo por reserva</p>
            <p className="text-xs text-muted-foreground">
              24/7: atiende fuera de horario y deriva a una persona solo cuando
              el caso lo pide.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mb-2 font-sans text-4xl font-medium tracking-tight text-primary md:text-5xl">
              <CountUp value={7} />
            </p>
            <p className="mb-1 text-sm font-medium">
              operaciones NDC integradas
            </p>
            <p className="text-xs text-muted-foreground">
              De AirShopping a OrderCancel, contra PROS.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trajectory */}
      <section
        id="trayectoria"
        className="container-site scroll-mt-20 py-16 md:py-32"
      >
        <Reveal>
          <SectionTitle>Trayectoria</SectionTitle>
          <p className="mb-12 max-w-2xl text-secondary-foreground">
            De un ERP logístico a la integración de aerolíneas. El patrón no
            cambió: sistemas que tocan dinero y no pueden fallar.
          </p>
        </Reveal>
        <div className="flex flex-col">
          {trajectory.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="grid gap-2 border-t border-white/10 py-6 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {item.period}
                </span>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-sm text-primary sm:text-right">
                  {item.result}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section
        id="casos"
        className="scroll-mt-20 border-t border-white/5 py-16 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>Casos en producción</SectionTitle>
            <p className="mb-16 max-w-2xl text-secondary-foreground">
              Tres sistemas en producción, con el rol, las decisiones y las
              métricas de cada uno.
            </p>
          </Reveal>

          <div className="flex flex-col gap-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal className="lg:order-2">
                <BrowserFrame url="soffia.clinica">
                  <Image
                    src="/captura-crm-soffia.webp"
                    alt="Dashboard del sistema de IA en producción para la clínica"
                    width={1517}
                    height={908}
                    className="h-auto w-full"
                    sizes="(max-width: 64rem) calc(100vw - 3rem), 36rem"
                  />
                </BrowserFrame>
              </Reveal>
              <Reveal delay={0.1} className="lg:order-1">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                  Caso 01 · SoffIA (CoreOS)
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  El agente que agenda y valida pagos en una clínica
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  Reglas deterministas: el modelo propone, la base de datos
                  decide. Atiende fuera de horario, cobra con link de pago y
                  deriva a una persona cuando hace falta.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      {"<8 s"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de respuesta
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium">
                      <span className="text-muted-foreground/40">25% → </span>
                      <span className="text-primary">
                        <CountUp value={8} prefix="<" suffix="%" />
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      citas perdidas
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      $0.001
                    </p>
                    <p className="text-xs text-muted-foreground">
                      costo por reserva
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <NdcDiagram />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                  Caso 02 · Air Europa NDC
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  Las 7 operaciones NDC en un motor en producción
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  Integré las 7 operaciones de Air Europa dentro de un motor
                  .NET que ya orquestaba 12+ proveedores. Lideré la migración
                  del motor de .NET 6 a .NET 10 con paridad 50/50 byte a byte.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      <CountUp value={7} />
                    </p>
                    <p className="text-xs text-muted-foreground">operaciones</p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      12+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      proveedores en el motor
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      <CountUp value={18} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ofertas en vivo por búsqueda
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <BrowserFrame url="meteor.movistar">
                  <Image
                    src="/meteor-crm-dark.webp"
                    alt="Dashboard de leads de METEOR"
                    width={1600}
                    height={770}
                    className="h-auto w-full"
                    sizes="(max-width: 64rem) calc(100vw - 3rem), 36rem"
                  />
                </BrowserFrame>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                  Caso 03 · METEOR
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  El CRM que reemplazó a InConcert en Movistar
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  Proceso de 169 a 79 minutos, dos pasos menos y tres
                  herramientas en una. El reporting que requería un
                  desarrollador escribiendo consultas a mano pasó a reportes de
                  cinco minutos.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      <CountUp value={53} suffix="%" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      menos proceso
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      $1,000
                    </p>
                    <p className="text-xs text-muted-foreground">
                      al mes menos
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      {"<2"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      meses de ROI
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section
        id="metodo"
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-16 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>El método</SectionTitle>
            <p className="mb-12 max-w-2xl text-secondary-foreground">
              El modelo no toca la base de datos: propone acciones y el sistema
              las valida contra reglas. Se habilitan solo las tools que el
              estado permite, y la iteración sigue hasta terminar. La respuesta
              depende de lo que realmente pasó. Cuando el proyecto no lleva IA,
              aplico la misma disciplina: nada toca dinero sin validación en
              base.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <MethodDiagram />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 grid items-center gap-10 lg:grid-cols-[320px_minmax(0,768px)] lg:justify-center">
              <ChatWhatsapp />
              <LogsConsole />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section
        id="confianza"
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-16 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>No me creas. Revisa el código.</SectionTitle>
            <p className="mb-8 max-w-xl text-secondary-foreground">
              Mis librerías abiertas, MIT: reactive-fsm con 86 tests y 5
              adapters, y exactly-once, idempotencia para tool calls. La misma
              disciplina de validación que corre en producción, a la vista para
              que la audites.
            </p>
            <ul className="max-w-xl">
              {verification.map((item) => (
                <li
                  key={item.label}
                  className="border-t border-white/10 last:border-b"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline gap-4 py-3 transition-colors hover:text-primary"
                  >
                    <span className="w-44 shrink-0 font-medium">
                      {item.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.detail}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="preguntas"
        className="container-site scroll-mt-20 py-16 md:py-32"
      >
        <Reveal>
          <SectionTitle>Preguntas</SectionTitle>
        </Reveal>
        <div className="max-w-2xl lg:max-w-3xl">
          {questions.map((item, i) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              delay={i * 0.03}
            />
          ))}
        </div>
      </section>

      {/* Closing */}
      <section
        id="cierre"
        className="scroll-mt-20 border-t border-white/5 py-20 md:py-28"
      >
        <div className="container-site flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="max-w-3xl text-balance font-sans text-3xl font-medium tracking-tight md:text-5xl">
              Abierto a roles remotos en AI y backend.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-muted-foreground">
              Lima, PE (UTC-5). Full-time o contract. Si estás construyendo
              sistemas transaccionales con IA, hablemos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${SITE.email}`}
                data-track="closing-cta"
                className="bg-primary px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-primary/90"
                style={{ borderRadius: 2 }}
              >
                Escríbeme
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-8 py-4 text-sm text-secondary-foreground transition-colors hover:border-white/40 hover:text-foreground"
                style={{ borderRadius: 2 }}
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="flex items-center gap-2.5 font-mono text-[11px] text-muted-foreground">
              <Image
                src="/alejandro.webp"
                alt=""
                width={48}
                height={48}
                className="size-6 rounded-full border border-white/10 object-cover"
              />
              Alejandro Alvarado · roddcode
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Alejandro Alvarado</span>
          <nav className="flex items-center gap-5">
            <Link
              href="/writing"
              className="transition-colors hover:text-foreground"
            >
              Writing
            </Link>
            <Link
              href="/cv"
              className="transition-colors hover:text-foreground"
            >
              CV
            </Link>
            <Link
              href="/consulting"
              className="transition-colors hover:text-foreground"
            >
              Consulting
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <Link
              href="/privacidad"
              className="transition-colors hover:text-foreground"
            >
              Privacidad
            </Link>
          </nav>
          <AnchorLink
            href="#top"
            className="transition-colors hover:text-foreground"
          >
            Arriba
          </AnchorLink>
        </div>
      </footer>
    </div>
  );
}
