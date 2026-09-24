import { HomeContent, questions } from "@/components/home-content";
import { JsonLdFaq } from "@/components/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function HomePage() {
  return (
    <>
      <HomeContent />
      <JsonLdFaq items={questions} />
    </>
  );
}
