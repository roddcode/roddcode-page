import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export const metadata = {
  title: "Writing | roddcode",
  description: "High-signal, low-noise architecture essays.",
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
        <h1 className="text-3xl font-bold mb-4">Writing</h1>
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
              <time className="text-xs font-mono text-muted-foreground tabular-nums">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-xl font-medium text-secondary-foreground group-hover:text-foreground transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {post.summary}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
