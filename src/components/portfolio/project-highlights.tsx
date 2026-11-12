import type { Project } from "@/content/portfolio";

export function ProjectHighlights({ project }: { project: Project }) {
  return project.highlights?.map((item) => (
    <p key={item.label}>
      {item.label} <strong>{item.value}</strong>
      {item.context && <>, {item.context}</>}
    </p>
  ));
}
