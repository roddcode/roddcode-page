import { PHILOSOPHY_TENETS } from "@/lib/constants";
import Link from "next/link";

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32">
      <div className="container-site">
        <h2 className="text-4xl md:text-5xl mb-16 leading-tight">
          Engineering philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
          {PHILOSOPHY_TENETS.map((tenet) => (
            <div key={tenet.number} className="flex flex-col gap-4">
              <h3
                className="text-xl text-foreground leading-snug"
                style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 500 }}
              >
                {tenet.title}
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {tenet.description}
              </p>
              <Link
                href={`/writing/${tenet.slug}`}
                className="text-sm font-sans text-primary hover:text-foreground transition-colors w-fit"
              >
                [Read the Essay →]
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
