import { Button } from "@/components/ui/button";
import { PostList } from "@/components/writing/post-list";
import s from "@/components/writing/writing.module.css";
import { getCopy } from "@/content/portfolio/copy";
import { getInterfaceLocale } from "@/i18n/server";
import { getAllPosts } from "@/lib/mdx";
import { Rss } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | roddcode",
  description:
    "Notes on building software: backend, integrations and applied AI.",
  alternates: { canonical: "/writing" },
};

export default async function WritingIndex() {
  const locale = await getInterfaceLocale();
  const t = getCopy(locale);
  return (
    <>
      <div className={s.indexHeading} data-reveal>
        <h1>{t.writingTitle}</h1>
        <p>{t.writingIntro}</p>
        <Button asChild variant="link" size="link">
          <a href="/feed.xml">
            <Rss size={17} aria-hidden="true" /> {t.rssSubscribe}
          </a>
        </Button>
      </div>
      <PostList posts={getAllPosts()} locale={locale} />
    </>
  );
}
