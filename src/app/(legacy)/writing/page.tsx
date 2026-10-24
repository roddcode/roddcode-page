import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "Writing | roddcode",
  description: "High-signal, low-noise architecture essays.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <div className="py-24 container-site max-w-3xl min-h-[80vh]">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to roddcode.com
        </Link>
      </div>
      <div className="mb-16">
        <h1 className="text-3xl font-medium mb-4">Writing</h1>
        <p className="text-muted-foreground text-lg">
          High-signal architecture essays.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/writing/${post.slug}`}
              className="flex flex-col gap-2"
            >
              <time className="text-xs font-mono text-muted-foreground tabular-nums flex items-center gap-3">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span>{post.readingTime} min read</span>
              </time>
              <h2 className="text-xl font-medium text-secondary-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                {post.title}
                {post.series && (
                  <span className="text-[10px] font-mono text-muted-foreground border border-border/40 rounded-sm px-1.5 py-0.5">
                    {post.series}
                  </span>
                )}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {post.summary}
              </p>
              {post.themes && post.themes.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {post.themes.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-muted-foreground border border-border/30 rounded-sm px-1.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
