import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const date = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 80px 80px 120px",
        backgroundColor: "#f7f5f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 60,
          bottom: 60,
          width: 2,
          backgroundColor: "#e4e0d6",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 17,
            color: "#1f4e8c",
            fontFamily: "ui-monospace, monospace",
            fontWeight: 500,
            letterSpacing: "0.14em",
          }}
        >
          ESSAY
        </span>
        <span
          style={{
            fontSize: 15,
            color: "#8b8e94",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          / roddcode
        </span>
      </div>

      <h1
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: "#15171a",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          margin: "0 0 24px",
          maxWidth: 900,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {post.meta.title}
      </h1>

      <p
        style={{
          fontSize: 22,
          color: "#4e5157",
          lineHeight: 1.5,
          margin: "0 0 40px",
          maxWidth: 820,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {post.meta.summary}
      </p>

      <span
        style={{
          fontSize: 16,
          color: "#6b6e74",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {date} · Alejandro Alvarado
      </span>
    </div>,
    { ...size },
  );
}
