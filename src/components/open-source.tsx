import { OPEN_SOURCE_PROJECTS } from "@/lib/constants";

export function OpenSource() {
  return (
    <section id="open-source" className="py-32">
      <div className="container-site">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-16">
          OPEN SOURCE PRIMITIVES
        </p>
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
          {OPEN_SOURCE_PROJECTS.map((project) => (
            <div key={project.name} className="flex flex-col gap-4">
              <h3
                className="text-xl text-foreground leading-snug"
                style={{
                  fontFamily: "var(--font-eb-garamond)",
                  fontWeight: 500,
                }}
              >
                {project.name}
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {project.description}
              </p>
              {project.status === "In Development" && (
                <span className="text-xs font-mono text-primary w-fit">
                  — {project.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
