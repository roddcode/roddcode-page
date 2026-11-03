import { mkdir, stat } from "node:fs/promises";
/**
 * Captura el campo topográfico en noche a 1200×630 y lo guarda como fondo de
 * la tarjeta OG.
 *
 * Necesita el servidor de desarrollo corriendo (`pnpm dev`), porque el
 * escenario vive en `/og/stage` y en producción esa ruta devuelve 404.
 *
 *   pnpm og:contour
 *
 * Si la paleta, la escala o el shader cambian, este comando regenera el fondo.
 */
import { chromium } from "@playwright/test";

const url = process.env.OG_STAGE_URL ?? "http://localhost:3000/og/stage";
const out = "src/app/og/assets/contour-night.png";

await mkdir("src/app/og/assets", { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  const res = await page.goto(url, { waitUntil: "networkidle" });
  if (!res || !res.ok()) {
    throw new Error(
      `${url} respondio ${res?.status() ?? "sin respuesta"}. Levanta \`pnpm dev\` y vuelve a intentar.`,
    );
  }

  // El shader pinta en el primer frame; un respiro evita capturar el canvas vacio.
  await page.waitForTimeout(1200);

  // El indicador de desarrollo de Next se dibuja encima del contenido y
  // entraria en la captura.
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });

  // Se captura el escenario, no el viewport: asi no entra nada ajeno.
  const stage = page.locator("#og-stage");
  await stage.screenshot({ path: out });

  const { size } = await stat(out);
  console.log(`  ${out} · ${Math.round(size / 1024)} KB · 1200x630`);
} finally {
  await browser.close();
}
