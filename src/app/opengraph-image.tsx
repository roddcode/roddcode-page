import { ImageResponse } from "next/og";

export const alt =
  "roddcode — Sistemas con IA que no fallan cuando hay plata en juego";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#090a0c",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 20,
          color: "#83868c",
          marginBottom: 28,
        }}
      >
        roddcode
      </span>
      <h1
        style={{
          fontSize: 64,
          fontWeight: 500,
          color: "#f1f2f3",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: "0 0 40px 0",
          maxWidth: 980,
        }}
      >
        Sistemas con IA que no fallan cuando hay plata en juego.
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#64d1d7",
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
            color: "#64d1d7",
          }}
        >
          el modelo propone, la base decide
        </span>
      </div>
      <span
        style={{
          position: "absolute",
          bottom: 80,
          right: 80,
          fontFamily: "ui-monospace, monospace",
          fontSize: 20,
          color: "#83868c",
        }}
      >
        roddcode.com
      </span>
    </div>,
    {
      ...size,
    },
  );
}
