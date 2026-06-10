import { AuthSequenceDiagram } from "@/components/mdx/auth-sequence";
import { CodeBlock } from "@/components/mdx/code-block";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";

const mdxComponents = {
  AuthSequenceDiagram,
  pre: CodeBlock,
};

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: `${meta.title} | roddcode`,
      description: meta.summary,
      openGraph: { title: meta.title, description: meta.summary },
    };
  } catch {
    return { title: "Not Found | roddcode" };
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post: ReturnType<typeof getPostBySlug> | undefined;
  let allPosts: ReturnType<typeof getAllPosts> = [];

  const related: Record<string, string[]> = {
    "deterministic-ai": ["fourth-time-fsm-library", "db-fat-llm-light"],
    "fourth-time-fsm-library": ["deterministic-ai", "domain-context-before-production-access"],
    "domain-context-before-production-access": ["server-centric-state", "network-asymmetry"],
    "network-asymmetry": ["server-centric-state", "deterministic-ai"],
    "server-centric-state": ["domain-context-before-production-access", "network-asymmetry"],
  };

  try {
    post = getPostBySlug(params.slug);
    allPosts = getAllPosts();
  } catch {
    notFound();
  }

  if (!post) notFound();

  const relatedSlugs = (related[params.slug] || []).filter((s) =>
    allPosts.some((p) => p.slug === s)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.summary,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "Alejandro Alvarado",
      url: "https://roddcode.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-24 container-site max-w-3xl min-h-[80vh]">
        <div className="mb-8">
          <Link
            href="/writing"
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Writing
          </Link>
        </div>

        <header className="mb-16">
          <time className="text-sm font-mono text-primary mb-4 block tabular-nums">
            {new Date(post.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-3xl text-foreground mb-6 leading-tight">
            {post.meta.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.meta.summary}
          </p>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "vitesse-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {relatedSlugs.length > 0 && (
          <footer className="mt-24 border-t border-border/40 pt-12">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
              Read next
            </p>
            <div className="flex flex-col gap-6">
              {relatedSlugs.map((s) => {
                const related = allPosts.find((p) => p.slug === s);
                if (!related) return null;
                return (
                  <Link
                    key={s}
                    href={`/writing/${s}`}
                    className="group flex flex-col gap-1"
                  >
                    <span className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors font-medium">
                      {related.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {related.summary}
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/writing"
              className="text-xs font-mono text-primary hover:text-foreground transition-colors mt-6 inline-block"
            >
              ← View all essays
            </Link>
          </footer>
        )}
      </article>
    </>
  );
}
