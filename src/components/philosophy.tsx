import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export function Philosophy() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 3);

  if (!featured) return null;

  return (
    <section id="philosophy" className="py-24 content-visibility-auto scroll-mt-20">
      <div className="container-site">
        <h2 className="text-4xl md:text-5xl mb-16 leading-tight">
          Engineering philosophy
        </h2>
        <div className="flex flex-col gap-12">
          <div className="max-w-xl">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-foreground leading-snug font-medium">
                {featured.title}
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed grow">
                {featured.summary}
              </p>
              <Link
                href={`/writing/${featured.slug}`}
                className="text-sm font-sans text-primary hover:text-foreground transition-colors w-fit"
              >
                [Read: {featured.title} →]
              </Link>
            </div>
          </div>
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {rest.map((post) => (
                <div key={post.slug} className="flex flex-col gap-4">
                  <h3 className="text-xl text-foreground leading-snug font-medium">
                    {post.title}
                  </h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed grow">
                    {post.summary}
                  </p>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-sm font-sans text-primary hover:text-foreground transition-colors w-fit"
                  >
                    [Read: {post.title} →]
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
