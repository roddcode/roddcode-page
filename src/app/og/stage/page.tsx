import { ContourField } from "@/components/home/contour-field/contour-field";
import { notFound } from "next/navigation";

/**
 * Escenario para capturar el campo topográfico como fondo de la tarjeta OG.
 *
 * Existe solo en desarrollo: en producción esta ruta devuelve 404. El script
 * `scripts/og-contour.mjs` la abre a 1200×630 y guarda el PNG que usa
 * `src/app/og/render.tsx`, para que el fondo de la tarjeta sea el mismo shader
 * del hero y del footer, no una imitación.
 */

// El campo se apaga hacia la izquierda, donde va el texto, y mantiene su
// fuerza a la derecha. La máscara va en una capa interna: si se aplica al
// contenedor, también apaga su fondo y deja ver el blanco de la página.
const MASK =
  "radial-gradient(ellipse 92% 118% at 76% 42%, #000 10%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.16) 100%)";

export default function OgStage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div
      id="og-stage"
      style={{
        position: "fixed",
        inset: 0,
        width: 1200,
        height: 630,
        backgroundColor: "#0f1411",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        <ContourField palette="night" mask={false} maxDpr={1} />
      </div>
    </div>
  );
}
