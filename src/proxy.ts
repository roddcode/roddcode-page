import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

/**
 * El middleware reescribe todo a /es/*, pero algunas rutas viven fuera de
 * [locale]: las legales y writing son contenido sin prefijo, y las imágenes de
 * metadatos (opengraph-image, twitter-image) no llevan punto en la URL, así que
 * el comodín de archivos no las protege. Sin excluirlas, devuelven 404.
 *
 * `services` y `dossier` se excluyen para que lleguen a los redirects de
 * `next.config.ts`: el middleware corre antes, y sin excluirlas las reescribiría
 * a /es/services antes de que el 301 tenga ocasión de aplicarse.
 */
export const config = {
  matcher: [
    "/((?!api|_next|privacidad|seguridad|writing|services|dossier|og|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
