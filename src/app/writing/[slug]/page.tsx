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
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
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
    </article>
  );
}
