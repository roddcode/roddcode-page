import { AuthSequenceDiagram } from "@/components/mdx/auth-sequence";
import { CodeBlock } from "@/components/mdx/code-block";
import { ReadingProgress } from "@/components/reading-progress";
import { SITE } from "@/lib/constants";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
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
      alternates: { canonical: `/writing/${slug}` },
      openGraph: {
        type: "article",
        title: meta.title,
        description: meta.summary,
        locale: "en_US",
        publishedTime: meta.date,
        images: [
          {
            url: `/writing/${slug}/image`,
            width: 1200,
            height: 630,
            alt: meta.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.summary,
        images: [{ url: `/writing/${slug}/image`, alt: meta.title }],
      },
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

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  const relatedSlugs = getRelatedPosts(params.slug, allPosts, 2).map(
    (p) => p.slug,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.summary,
    datePublished: post.meta.date,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: "en",
    mainEntityOfPage: `${SITE.url}/writing/${params.slug}`,
    image: `${SITE.url}/writing/${params.slug}/image`,
    author: {
      "@type": "Person",
      name: "Alejandro Alvarado",
      url: SITE.url,
      image: new URL("/alejandro.webp", SITE.url).href,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estructurado, contenido propio serializado
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <article>
        <Link
          href="/writing"
          className="font-mono text-[11px] tracking-[0.06em] text-ink-4 uppercase no-underline transition-colors hover:text-accent"
        >
          ← Writing
        </Link>

        <header className="mt-8 mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-ink-4 uppercase">
            <time className="tabular-nums">{fecha(post.meta.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
            {post.meta.series ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-accent">{post.meta.series}</span>
              </>
            ) : null}
          </div>

          <h1 className="m-0 font-sans text-[clamp(30px,4.2vw,42px)] leading-[1.1] font-semibold tracking-[-0.03em] text-ink">
            {post.meta.title}
          </h1>

          <p className="mt-5 mb-0 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
            {post.meta.summary}
          </p>
        </header>

        <div className="prose">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        light: "vitesse-light",
                        dark: "vitesse-dark",
                      },
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>

        {relatedSlugs.length > 0 && (
          <aside className="mt-16 border-t border-line pt-8">
            <p className="m-0 mb-5 font-mono text-[11px] tracking-[0.08em] text-ink-4 uppercase">
              Read next
            </p>
            <ul className="m-0 flex list-none flex-col gap-5 p-0">
              {relatedSlugs.map((s) => {
                const related = allPosts.find((p) => p.slug === s);
                if (!related) return null;
                return (
                  <li key={s}>
                    <Link
                      href={`/writing/${s}`}
                      className="group flex flex-col gap-1 no-underline"
                    >
                      <span className="text-[15px] font-semibold text-ink transition-colors group-hover:text-accent">
                        {related.title}
                      </span>
                      <span className="text-[13px] leading-[1.55] text-ink-3">
                        {related.summary}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.meta.title)}&url=${encodeURIComponent(`${SITE.url}/writing/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.06em] text-ink-4 uppercase no-underline transition-colors hover:text-accent"
            aria-label="Share on X, opens in new tab"
          >
            Share on X ↗
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE.url}/writing/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.06em] text-ink-4 uppercase no-underline transition-colors hover:text-accent"
            aria-label="Share on LinkedIn, opens in new tab"
          >
            Share on LinkedIn ↗
          </a>
        </div>

        <footer className="mt-8 flex items-center gap-4 border-t border-line pt-8">
          <img
            src="/alejandro.webp"
            alt=""
            className="size-10 flex-none"
            width={40}
            height={40}
          />
          <div>
            <p className="m-0 text-[14px] font-semibold text-ink">
              Alejandro Alvarado
            </p>
            <p className="m-0 text-[13px] text-ink-3">
              The model proposes. The database decides.
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}
