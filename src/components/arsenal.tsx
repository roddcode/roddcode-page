import { ARSENAL } from "@/lib/constants";

export function Arsenal() {
  return (
    <section
      id="arsenal"
      className="py-24 container-site content-visibility-auto scroll-mt-20"
    >
      <h2 className="text-4xl md:text-5xl mb-16 leading-tight">The arsenal</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest pr-10">
                Layer
              </th>
              <th className="pb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest pr-10">
                Technologies
              </th>
              <th className="pb-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Approach
              </th>
            </tr>
          </thead>
          <tbody>
            {ARSENAL.map((item) => (
              <tr
                key={item.layer}
                className="border-b border-border transition-colors hover:bg-muted/40"
              >
                <td className="py-5 text-sm text-muted-foreground pr-10 font-medium">
                  {item.layer}
                </td>
                <td className="py-5 text-base text-foreground pr-10 font-sans">
                  {item.technologies}
                </td>
                <td className="py-5 text-sm text-muted-foreground font-sans italic">
                  {item.approach}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
