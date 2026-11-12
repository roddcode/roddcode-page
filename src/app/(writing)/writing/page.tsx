import { Button } from "@/components/ui/button";
import { PostList } from "@/components/writing/post-list";
import s from "@/components/writing/writing.module.css";
import { getAllPosts } from "@/lib/mdx";
import { Rss } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | roddcode",
  description:
    "Notes on building software: backend, integrations and applied AI.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
  return (
    <>
      <div className={s.indexHeading} data-reveal>
        <h1>Writing</h1>
        <p>
          Notes on building software: backend, integrations and applied AI.
          Problems I ran into, decisions I made and what I learned along the
          way.
        </p>
        <Button asChild variant="link" size="link">
          <a href="/feed.xml">
            <Rss size={17} aria-hidden="true" /> Subscribe via RSS
          </a>
        </Button>
      </div>
      <PostList posts={getAllPosts()} />
    </>
  );
}
