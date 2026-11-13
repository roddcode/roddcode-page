import fs from "node:fs/promises";
import path from "node:path";
import { BookingDemo } from "@/components/portfolio/booking-demo";
import { NdcPreview } from "@/components/portfolio/ndc-preview";
import { ProjectHighlights } from "@/components/portfolio/project-highlights";
import { ContentLink } from "@/components/ui/external-link";
import { type Locale, getPortfolio } from "@/content/portfolio";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

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
  // Group each top-level h2 with the content that follows it, so the case body
  // exposes one revealable section per narrative block without touching MDX.
  function sections() {
    return (tree: Node) => {
      const children = tree.children ?? [];
      const grouped: Node[] = [];
      let open: Node[] | null = null;
      for (const child of children) {
        if (child.type === "element" && child.tagName === "h2") {
          const sectionChildren = [child];
          grouped.push({
            type: "element",
            tagName: "section",
            properties: { "data-case-section": "", "data-reveal": "" },
            children: sectionChildren,
          });
          open = sectionChildren;
        } else if (open) {
          open.push(child);
        } else {
          grouped.push(child);
        }
      }
      tree.children = grouped;
    };
  }
  const { content } = await compileMDX({
    source,
    components: {
      a: (props: ComponentProps<"a">) => (
        <ContentLink {...props} locale={locale} />
      ),
      NdcFlow: () => (
        <div
          role="img"
          aria-label={
            locale === "es"
              ? "Itinerario ficticio Madrid–Lima: consulta, precio y creación de la orden NDC."
              : "Fictional Madrid–Lima itinerary: NDC shopping, pricing and order creation."
          }
        >
          <NdcPreview locale={locale} />
        </div>
      ),
      BookingDemo: () => <BookingDemo locale={locale} />,
      ProjectHighlights: () => <ProjectHighlights project={project} />,
    },
    options: { mdxOptions: { rehypePlugins: [headings, sections] } },
  });
  return { content, toc };
}
