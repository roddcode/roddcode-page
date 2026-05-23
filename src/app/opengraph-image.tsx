import { ImageResponse } from "next/og";

export const alt = "RoddCode — Alejandro Alvarado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
            color: "#888",
            marginBottom: 24,
          }}
        >
          roddcode
        </span>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 500,
            color: "#f2f2f2",
            lineHeight: 1.1,
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
          }}
        >
          I build production AI
          <br />
          and enterprise systems.
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#a1a1a0",
            fontFamily: "ui-sans-serif, sans-serif",
            margin: 0,
          }}
        >
          Alejandro Alvarado · Full-stack AI Engineer
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid #c2410c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "ui-monospace, monospace",
            fontSize: 48,
            color: "#c2410c",
          }}
        >
          {">_"}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
