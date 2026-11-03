import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing | roddcode",
  description:
    "Long-form notes on deterministic AI systems: state, contracts, and the parts of production software that cannot fail.",
  alternates: { canonical: "/writing" },
};

const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <>
      <h1 className="m-0 font-sans text-[clamp(32px,5vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
        Writing
      </h1>
      <p className="mt-5 mb-14 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        Long-form notes on deterministic AI systems: state, contracts, and the
        parts of production software that cannot fail.
      </p>

      <ul className="m-0 flex list-none flex-col p-0">
        {posts.map((post) => (
          <li key={post.slug} className="border-t border-line">
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-2 py-7 no-underline"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-ink-4 uppercase">
                <time className="tabular-nums">{fecha(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
                {post.series ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-accent">{post.series}</span>
                  </>
                ) : null}
              </div>

              <h2 className="m-0 font-sans text-[19px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h2>

              <p className="m-0 max-w-[62ch] text-[15px] leading-[1.65] text-ink-3">
                {post.summary}
              </p>

              {post.themes?.length ? (
                <p className="m-0 font-mono text-[11px] tracking-[0.04em] text-ink-4">
                  {post.themes.join(" · ")}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-line" />
    </>
  );
}
