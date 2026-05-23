import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="py-24 content-visibility-auto scroll-mt-20 border-t border-border/40"
    >
      <div className="container-site">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-16">
          TOOLING
        </p>
        <div className="flex flex-col">
          {OPEN_SOURCE_PROJECTS.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-16 group py-8 ${
                i < OPEN_SOURCE_PROJECTS.length - 1
                  ? "border-b border-border/40"
                  : ""
              }`}
            >
              <h3 className="text-lg text-foreground leading-snug flex items-center gap-2 group-hover:text-primary transition-colors font-medium shrink-0 md:w-56">
                {project.name}
                <ArrowUpRight
                  size={14}
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
