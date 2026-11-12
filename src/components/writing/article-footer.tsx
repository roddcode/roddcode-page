import { Button } from "@/components/ui/button";
import type { Project } from "@/content/portfolio";
import { SITE } from "@/lib/constants";
import type { PostMetadata } from "@/lib/mdx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PostList } from "./post-list";
import s from "./writing.module.css";

export function ArticleFooter({
  title,
  slug,
  authorRole,
  relatedWork,
  relatedPosts,
}: {
  title: string;
  slug: string;
  authorRole: string;
  relatedWork: Project[];
  relatedPosts: PostMetadata[];
}) {
  const url = encodeURIComponent(`${SITE.url}/writing/${slug}`);
  return (
    <>
      {relatedWork.length > 0 && (
        <aside className={s.related} data-reveal>
          <h2>Related work</h2>
          <ul className={s.workLinks}>
            {relatedWork.map((project) => (
              <li key={project.slug}>
                <Button asChild variant="link" size="link">
                  <a href={`/en/work/${project.slug}`}>
                    {project.title}
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </aside>
      )}
      {relatedPosts.length > 0 && (
        <aside className={s.related}>
          <h2 data-reveal>Read next</h2>
          <PostList posts={relatedPosts} headingLevel={3} />
        </aside>
      )}
      <div className={s.share} data-reveal>
        <Button asChild variant="link" size="link">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X, opens in new tab"
          >
            Share on X<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="link" size="link">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn, opens in new tab"
          >
            Share on LinkedIn
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Button>
      </div>
      <footer className={s.author} data-reveal>
        <img
          src="/alejandro.webp"
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <div>
          <p>
            <strong>Alejandro Alvarado</strong>
          </p>
          <p>{authorRole}</p>
        </div>
      </footer>
    </>
  );
}
