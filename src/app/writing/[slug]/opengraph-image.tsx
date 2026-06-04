import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

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
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#151515",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Línea vertical acento */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 60,
            bottom: 60,
            width: 2,
            backgroundColor: "#27272A",
          }}
        />

        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            marginLeft: 40,
          }}
        >
          <span
            style={{
              fontSize: 18,
              color: "#D97747",
              fontFamily: "ui-monospace, monospace",
              fontWeight: 500,
              letterSpacing: "0.12em",
            }}
          >
            ESSAY
          </span>
          <span
            style={{
              fontSize: 14,
              color: "#525252",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            / roddcode
          </span>
        </div>

        {/* Título */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 500,
            color: "#F5F5F0",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 24px 40px",
            maxWidth: 900,
            fontFamily: "Georgia, 'EB Garamond', 'Times New Roman', serif",
          }}
        >
          {post.meta.title}
        </h1>

        {/* Sumario */}
        <p
          style={{
            fontSize: 22,
            color: "#A1A1AA",
            lineHeight: 1.5,
            margin: "0 0 40px 40px",
            maxWidth: 800,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {post.meta.summary}
        </p>

        {/* Fecha */}
        <span
          style={{
            fontSize: 16,
            color: "#525252",
            fontFamily: "ui-monospace, monospace",
            marginLeft: 40,
          }}
        >
          {date} · Alejandro Alvarado
        </span>
      </div>
    ),
    { ...size },
  );
}
