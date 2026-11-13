import { AuthSequenceDiagram } from "@/components/mdx/auth-sequence";
import { CodeBlock } from "@/components/mdx/code-block";
import { ReadingProgress } from "@/components/reading-progress";
import { Button } from "@/components/ui/button";
import { ContentLink } from "@/components/ui/external-link";
import { ArticleFooter } from "@/components/writing/article-footer";
import { PostMeta } from "@/components/writing/post-list";
import s from "@/components/writing/writing.module.css";
import { getPortfolio } from "@/content/portfolio";
import { SITE } from "@/lib/constants";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import rehypePrettyCode from "rehype-pretty-code";

const mdxComponents = {
  a: (props: ComponentProps<"a">) => <ContentLink {...props} locale="en" />,
  AuthSequenceDiagram,
  pre: CodeBlock,
  h2: (props: ComponentProps<"h2">) => <h2 {...props} data-reveal />,
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
  const { identity, projects } = getPortfolio("en");
  const relatedWork = projects.filter((project) =>
    project.relatedPosts?.includes(params.slug),
  );

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

      <article className={s.article} data-writing-article>
        <div data-reveal>
          <Button asChild variant="link" size="link">
            <a href="/writing">
              <ArrowLeft size={17} aria-hidden="true" /> Back to writing
            </a>
          </Button>
        </div>
        <header className={s.articleHeading} data-reveal>
          <PostMeta post={post.meta} />
          <h1>{post.meta.title}</h1>
          <p>{post.meta.summary}</p>
        </header>
        <div className={`prose ${s.body}`}>
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

        <ArticleFooter
          title={post.meta.title}
          slug={post.slug}
          authorRole={identity.role}
          relatedWork={relatedWork}
          relatedPosts={allPosts.filter((p) =>
            relatedSlugs.includes(p.slug ?? ""),
          )}
        />
      </article>
    </>
  );
}
