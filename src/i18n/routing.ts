import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // Solo decide el primer ingreso. A partir de ahí manda la cookie, que es la
  // que escribe /api/locale cuando el usuario elige idioma a mano.
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  },
});

export const proxyHandler = createMiddleware(routing);
