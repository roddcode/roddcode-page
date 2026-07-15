import { AuthSequenceDiagram } from "@/components/mdx/auth-sequence";
import { CodeBlock } from "@/components/mdx/code-block";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import { ReadingTracker } from "@/components/reading-tracker";
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

  try {
    post = getPostBySlug(params.slug);
    allPosts = getAllPosts();
  } catch {
    notFound();
  }

  if (!post) notFound();

  const relatedSlugs = getRelatedPosts(params.slug, allPosts, 2).map((p) => p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.summary,
    datePublished: post.meta.date,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    image: `https://roddcode.com/og?title=${encodeURIComponent(post.meta.title)}`,
    author: {
      "@type": "Person",
      name: "Alejandro Alvarado",
      url: "https://roddcode.com",
      image: "https://roddcode.com/alejandro.webp",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-24 container-site max-w-3xl min-h-[80vh]">
        <ReadingTracker slug={params.slug} />
        <div className="mb-8">
          <Link
            href="/writing"
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Writing
          </Link>
        </div>

        <header className="mb-16">
          <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <time className="tabular-nums">
              {new Date(post.meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-muted-foreground/50">·</span>
            <span>{post.readingTime} min read</span>
          </div>
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

        <div className="mt-16 flex items-center gap-4 border-t border-border/40 pt-8">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.meta.title)}&url=${encodeURIComponent(`https://roddcode.com/writing/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Share on Twitter, opens in new tab"
          >
            Share on X →
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://roddcode.com/writing/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Share on LinkedIn, opens in new tab"
          >
            Share on LinkedIn →
          </a>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8">
          <p className="text-sm text-foreground font-medium mb-2">Subscribe</p>
          <p className="text-xs text-muted-foreground mb-4">High-signal architecture essays. No spam.</p>
          <form
            action="https://buttondown.email/roddcode"
            method="post"
            target="_blank"
            className="flex gap-2 max-w-sm"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="flex-1 bg-muted border border-border/60 rounded-sm px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 text-xs font-medium transition-colors duration-100 ease-out rounded-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        <footer className="mt-8 border-t border-border/40 pt-8">
          <div className="flex items-center gap-4">
            <img src="/alejandro.webp" alt="Alejandro Alvarado" className="size-10 rounded-full" />
            <div>
              <p className="text-sm text-foreground font-medium">Alejandro Alvarado</p>
              <p className="text-xs text-muted-foreground">Building AI systems that don't hallucinate in production. DB-Fat, LLM-Light.</p>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
