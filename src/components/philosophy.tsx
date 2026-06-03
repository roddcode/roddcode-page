import { PHILOSOPHY_TENETS } from "@/lib/constants";
import Link from "next/link";

function TenetCard({ tenet }: { tenet: typeof PHILOSOPHY_TENETS[number] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl text-foreground leading-snug font-medium">
        {tenet.title}
      </h3>
      <p className="text-sm text-secondary-foreground leading-relaxed grow">
        {tenet.description}
      </p>
      <Link
        href={`/writing/${tenet.slug}`}
        className="text-sm font-sans text-primary hover:text-foreground transition-colors w-fit"
      >
        [Read: {tenet.title} →]
      </Link>
    </div>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" className="py-24 content-visibility-auto scroll-mt-20">
      <div className="container-site">
        <h2 className="text-4xl md:text-5xl mb-16 leading-tight">
          Engineering philosophy
        </h2>
        <div className="flex flex-col gap-12">
          <div className="max-w-xl">
            <TenetCard tenet={PHILOSOPHY_TENETS[2]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <TenetCard tenet={PHILOSOPHY_TENETS[0]} />
            <TenetCard tenet={PHILOSOPHY_TENETS[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
