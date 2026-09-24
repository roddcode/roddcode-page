import { HeroBackground } from "@/components/hero-background";
import { InteractiveDemo } from "@/components/interactive-demo";
import { SITE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const cta = SITE.whatsapp || SITE.cal;

  return (
    <section id="inicio" className="relative cursor-crosshair overflow-hidden">
      <HeroBackground />
      <div className="container-site relative">
        <div className="grid items-center gap-12 py-16 lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16 lg:py-0">
          <div className="hero-enter flex flex-col gap-8">
            <h1 className="max-w-3xl text-balance font-sans text-4xl font-medium leading-[1.05] tracking-tight md:text-[2.75rem]">
              Sistemas con IA que no fallan cuando hay plata en juego.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-secondary-foreground">
              Auditoría e ingeniería para sistemas que manejan reservas, pagos o
              datos de clientes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={cta}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero-cta"
                className="bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary/90"
                style={{ borderRadius: 2 }}
              >
                Hablemos 30 minutos
              </Link>
              <a
                href="#casos"
                className="border border-white/15 px-6 py-3 text-sm text-secondary-foreground transition-colors hover:border-white/40 hover:text-foreground"
                style={{ borderRadius: 2 }}
              >
                Ver los casos
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-2.5">
                <Image
                  src="/alejandro.webp"
                  alt="Alejandro Alvarado"
                  width={64}
                  height={64}
                  className="size-8 rounded-full border border-white/10 object-cover"
                />
                <span className="text-secondary-foreground">
                  Alejandro Alvarado
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="relative flex size-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                <span className="text-secondary-foreground">
                  Disponible para un proyecto
                </span>
              </span>
              <span>Lima, PE · trabajo con equipos de LATAM y España</span>
            </div>
          </div>

          <div
            className="hero-enter w-full"
            style={{ animationDelay: "180ms" }}
          >
            <InteractiveDemo />
            <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
              El modelo propone. La base decide. Cuatro dominios, la misma
              disciplina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
