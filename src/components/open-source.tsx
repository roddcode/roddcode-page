import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function OpenSource() {
  return (
    <section id="open-source" className="py-24 content-visibility-auto">
      <div className="container-site">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-16">
          OPEN SOURCE PRIMITIVES
        </p>
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
          {OPEN_SOURCE_PROJECTS.map((project) => (
            <a
              key={project.name}
              href={"href" in project ? project.href : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-4 group"
            >
              <h3 className="text-xl text-foreground leading-snug flex items-center gap-2 group-hover:text-primary transition-colors font-medium">
                {project.name}
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
