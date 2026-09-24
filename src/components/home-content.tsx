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

const cta = SITE.whatsapp || SITE.cal;

const trajectory = [
  {
    period: "2023–2024",
    title: "Web, CRM comercial y ERP logístico",
    detail:
      "Extensiones sobre SINTAD, con logística, transporte, cargo y aduanas",
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
    detail: "Sistema de IA determinista para una clínica dental",
    result: "Citas perdidas de 25% a menos de 8%",
  },
];

const pricing = [
  {
    title: "Auditoría técnica",
    price: "Desde $250",
    desc: "Revisión profunda de tu sistema y un reporte escrito con los riesgos priorizados.",
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
    label: "Ver la trayectoria",
    detail: "LinkedIn: experiencia y contexto",
    href: "https://www.linkedin.com/in/alejandro-alvarado-roddcode/",
  },
];

export const questions = [
  {
    question: "¿Trabajas remoto?",
    answer:
      "Sí. Trabajo con equipos de LATAM y España, en español, por WhatsApp y llamadas.",
  },
  {
    question: "¿Trabajas con mi stack?",
    answer:
      "Frontend en React y TypeScript; backend en .NET y SQL Server; integraciones XML, SOAP y JSON. Si tu stack es otro, te lo digo en la primera llamada.",
  },
  {
    question: "¿Cómo sé que puedes con un sistema crítico?",
    answer:
      "Por lo que ya corrió en producción: ERP logístico, CRM enterprise para Movistar, el motor NDC de Air Europa y un sistema de IA en una clínica. Tres años, ningún proyecto era una demo. Si no quieres creerme, puedes auditar mi código abierto antes de la llamada.",
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
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-24"
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
            <p className="mb-2 font-sans text-4xl font-medium tracking-tight text-primary md:text-5xl">
              <CountUp value={25} suffix="% → <8%" />
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
            <p className="mb-1 text-sm font-medium">por reserva</p>
            <p className="text-xs text-muted-foreground">
              Atención 24/7 sin intervención humana.
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
        className="container-site scroll-mt-20 py-24 md:py-32"
      >
        <Reveal>
          <SectionTitle>Trayectoria</SectionTitle>
          <p className="mb-12 max-w-2xl text-secondary-foreground">
            De un ERP logístico a la integración de aerolíneas. El patrón no
            cambió: sistemas que tocan plata y no pueden fallar.
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
        className="scroll-mt-20 border-t border-white/5 py-24 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>Casos en producción</SectionTitle>
            <p className="mb-16 max-w-2xl text-secondary-foreground">
              Los tres con datos de producción. Los números salen de ahí, no de
              una demo.
            </p>
          </Reveal>

          <div className="flex flex-col gap-24">
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
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Caso 01 · METEOR
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  El CRM que reemplazó a InConcert en Movistar
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  Proceso de 169 a 79 minutos, dos pasos menos y tres
                  herramientas en una. El reporting que requería un
                  desarrollador escribiendo consultas a mano pasó a descargas de
                  cinco segundos.
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
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Caso 02 · SoffIA
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  El sistema que atiende, agenda y valida pagos en una clínica
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  Reglas deterministas: el modelo propone, la base de datos
                  decide. Captura el 100% de los leads fuera de horario, valida
                  comprobantes y deriva a una persona cuando hace falta.
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
                    <p className="font-sans text-xl font-medium text-primary">
                      <CountUp value={25} suffix="% → <8%" />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      citas perdidas
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-xl font-medium text-primary">
                      $0.001
                    </p>
                    <p className="text-xs text-muted-foreground">por reserva</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <NdcDiagram />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                  Caso 03 · Motor de vuelos
                </p>
                <h3 className="mb-4 text-balance font-sans text-2xl font-medium tracking-tight md:text-3xl">
                  Las 7 operaciones NDC de Air Europa en un motor en producción
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">
                  AirShopping, OfferPrice, OrderCreate, OrderRetrieve,
                  OrderChange, OrderCancel y UpSell contra PROS. Builders y
                  parsers XML a mano, homologación desde otras aerolíneas ya
                  integradas.
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
                      3
                    </p>
                    <p className="text-xs text-muted-foreground">
                      repos en release
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
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-24 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>El método</SectionTitle>
            <p className="mb-12 max-w-2xl text-secondary-foreground">
              El agente no toca la base de datos: usa tools. El sistema le arma
              el prompt según el estado y le habilita solo las tools que
              corresponden. El agente itera hasta terminar, y la respuesta
              depende de las tools que usó.
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

      {/* Pricing */}
      <section
        id="precios"
        className="container-site scroll-mt-20 py-24 md:py-32"
      >
        <Reveal>
          <SectionTitle>Precios</SectionTitle>
          <p className="mb-12 max-w-2xl text-secondary-foreground">
            Sin cotizaciones sorpresa. Pagas por entrega.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-primary/40">
                <p className="font-mono text-xs text-primary">{item.price}</p>
                <h3 className="font-sans text-lg font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Exclusions */}
      <section
        id="exclusiones"
        className="scroll-mt-20 border-t border-white/5 py-24"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>Para quién no es</SectionTitle>
            <p className="mb-6 max-w-2xl text-secondary-foreground">
              No trabajo en proyectos donde:
            </p>
          </Reveal>
          <ul className="max-w-2xl">
            {exclusions.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.05}
                className="border-t border-white/10 py-4 text-sm last:border-b"
              >
                {item}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-medium">
              Prefiero decir que no rápido antes que dejarte a medias.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section
        id="confianza"
        className="scroll-mt-20 border-t border-white/5 bg-white/[0.015] py-24 md:py-32"
      >
        <div className="container-site">
          <Reveal>
            <SectionTitle>No me creas. Revisa el código.</SectionTitle>
            <p className="mb-8 max-w-xl text-secondary-foreground">
              reactive-fsm es mi librería abierta: 86 tests, 5 adapters, MIT. Es
              la misma disciplina de «la base decide» que corre en producción,
              con cada test a la vista para que la audites.
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
        className="container-site scroll-mt-20 py-24 md:py-32"
      >
        <Reveal>
          <SectionTitle>Preguntas</SectionTitle>
        </Reveal>
        <div className="max-w-2xl">
          {questions.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      {/* Closing */}
      <section
        id="cierre"
        className="scroll-mt-20 border-t border-white/5 py-28"
      >
        <div className="container-site flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="max-w-3xl text-balance font-sans text-3xl font-medium tracking-tight md:text-5xl">
              Si tu sistema con IA maneja algo que no puede fallar, hablemos.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm text-muted-foreground">
              30 minutos. Si no veo dónde aportar, te lo digo en los primeros
              10.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={cta}
                target="_blank"
                rel="noopener noreferrer"
                data-track="closing-cta"
                className="bg-primary px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-primary/90"
                style={{ borderRadius: 2 }}
              >
                Hablemos 30 minutos
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="border border-white/15 px-8 py-4 text-sm text-secondary-foreground transition-colors hover:border-white/40 hover:text-foreground"
                style={{ borderRadius: 2 }}
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-mono text-[11px] text-muted-foreground">
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
          </nav>
          <a href="#top" className="transition-colors hover:text-foreground">
            Arriba
          </a>
        </div>
      </footer>
    </div>
  );
}
