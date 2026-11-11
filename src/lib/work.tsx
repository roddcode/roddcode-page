import fs from "node:fs/promises";
import path from "node:path";
import { BookingDemo } from "@/components/portfolio/booking-demo";
import { ProjectHighlights } from "@/components/portfolio/project-highlights";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { compileMDX } from "next-mdx-remote/rsc";

type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

// Trusted repository content only. Registry lookup also prevents arbitrary file reads.
export async function getWorkBody(locale: Locale, slug: string) {
  const project = getPortfolio(locale).projects.find(
    (project) => project.slug === slug,
  );
  if (!project) {
    throw new Error(`Unknown published case: ${slug}`);
  }
  const source = await fs.readFile(
    path.join(process.cwd(), "src/content/work", locale, `${slug}.mdx`),
    "utf8",
  );
  const toc: { id: string; title: string }[] = [];
  const ids = new Map<string, number>();
  function headings() {
    return (tree: Node) => {
      function text(node: Node): string {
        return node.value ?? node.children?.map(text).join("") ?? "";
      }
      function visit(node: Node) {
        if (node.tagName === "h2") {
          const title = text(node);
          const base = title
            .normalize("NFD")
            .replace(/\p{M}/gu, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          const count = ids.get(base) ?? 0;
          ids.set(base, count + 1);
          const id = count ? `${base}-${count}` : base;
          node.properties = { ...node.properties, id };
          toc.push({ id, title });
        }
        node.children?.forEach(visit);
      }
      visit(tree);
    };
  }
  const { content } = await compileMDX({
    source,
    components: {
      BookingDemo: () => <BookingDemo locale={locale} />,
      ProjectHighlights: () => <ProjectHighlights project={project} />,
    },
    options: { mdxOptions: { rehypePlugins: [headings] } },
  });
  return { content, toc };
}
