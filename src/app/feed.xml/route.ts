import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { escapeXml } from "@/lib/xml";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = SITE.url;

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>roddcode — Architecture Essays</title>
    <description>Notes on building software: backend, integrations and applied AI.</description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.summary)}</description>
      <link>${baseUrl}/writing/${post.slug}</link>
      <guid>${baseUrl}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
