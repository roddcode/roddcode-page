import { getCopy } from "@/content/portfolio/copy";
import type { Locale } from "@/content/portfolio/types";
import type { PostMetadata } from "@/lib/mdx";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import s from "./writing.module.css";

export function PostMeta({
  post,
  locale,
}: {
  post: PostMetadata;
  locale: Locale;
}) {
  const t = getCopy(locale);
  return (
    <div className={s.meta}>
      <time dateTime={post.date}>
        {new Date(post.date).toLocaleDateString(
          locale === "es" ? "es-PE" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          },
        )}
      </time>
      <span>
        {post.readingTime} {t.reading}
      </span>
    </div>
  );
}

export function PostList({
  posts,
  locale,
  headingLevel = 2,
}: {
  posts: PostMetadata[];
  locale: Locale;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className={s.postList}>
      {posts.map((post) => (
        <li key={post.slug} data-reveal>
          <Link href={`/writing/${post.slug}`} className={s.postLink}>
            <PostMeta post={post} locale={locale} />
            <div className={s.postText} lang="en">
              <Heading>{post.title}</Heading>
              <p>{post.summary}</p>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
