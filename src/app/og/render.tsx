import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Tarjeta de enlace (Open Graph / Twitter) por idioma.
 *
 * Fondo: el mismo campo topográfico del hero y del footer, capturado en noche
 * con `pnpm og:contour`. Encima, solo dos cosas: el wordmark grande y la tesis.
 *
 * Satori no hereda fuentes ni tokens de la app: cada color y cada familia se
 * declaran acá con los valores de `globals.css`.
 */

const NIGHT_INK = "#e8eae5";
const NIGHT_MUTED = "#adb4ae";
const ACCENT_NIGHT = "#5b9bff";

type Lang = "es" | "en";

const COPY: Record<Lang, { thesis: string }> = {
  es: {
    thesis: "Sistemas con IA que no fallan cuando hay dinero en juego.",
  },
  en: {
    thesis: "AI systems that don’t fail when money is at stake.",
  },
};

type Assets = {
  fonts: Awaited<ReturnType<typeof loadAssets>>["fonts"];
  contour: string;
};

let assets: Promise<Assets> | undefined;

async function loadAssets() {
  const root = process.cwd();
  const dir = join(root, "src", "app", "og", "assets", "fonts");
  const [regular, semibold, mono, contour] = await Promise.all([
    readFile(join(dir, "Geist-Regular.otf")),
    readFile(join(dir, "Geist-SemiBold.otf")),
    readFile(join(dir, "GeistMono-Regular.otf")),
    readFile(join(root, "src", "app", "og", "assets", "contour-night.png")),
  ]);

  return {
    fonts: [
      {
        name: "Geist",
        data: regular,
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Geist",
        data: semibold,
        weight: 600 as const,
        style: "normal" as const,
      },
      {
        name: "GeistMono",
        data: mono,
        weight: 400 as const,
        style: "normal" as const,
      },
    ],
    contour: `data:image/png;base64,${contour.toString("base64")}`,
  };
}

export async function ogImage(lang: Lang) {
  const t = COPY[lang];
  assets ??= loadAssets();
  const { fonts, contour } = await assets;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0f1411",
        fontFamily: "Geist",
      }}
    >
      <img
        src={contour}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute", inset: 0, width: 1200, height: 630 }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "0 88px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              fontSize: 148,
              fontWeight: 600,
              letterSpacing: "-6.5px",
              color: NIGHT_INK,
            }}
          >
            roddcode
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 600,
              marginLeft: -10,
              color: ACCENT_NIGHT,
            }}
          >
            .
          </span>
        </div>

        <span
          style={{
            marginTop: 26,
            fontSize: 34,
            lineHeight: 1.35,
            letterSpacing: "-0.3px",
            maxWidth: 900,
            color: NIGHT_MUTED,
          }}
        >
          {t.thesis}
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );
}
