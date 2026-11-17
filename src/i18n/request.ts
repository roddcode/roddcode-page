import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { matchAcceptLanguage, matchLocale } from "./locale";
import { routing } from "./routing";

/**
 * Única fuente del idioma de interfaz.
 *
 * Las rutas bajo `[locale]` llegan con el idioma que resolvió el middleware.
 * Las rutas neutrales (Writing, legales) no pasan por él, así que se apoyan en
 * la cookie funcional validada y, en su defecto, en `Accept-Language`. La
 * preferencia explícita se guarda desde /api/locale; el middleware también
 * puede persistir su detección. Leer Writing nunca modifica esa cookie.
 */
const localeCookieName =
  routing.localeCookie && typeof routing.localeCookie === "object"
    ? routing.localeCookie.name
    : undefined;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = matchLocale(await requestLocale);
  const cookieValue = requested
    ? undefined
    : localeCookieName
      ? (await cookies()).get(localeCookieName)?.value
      : undefined;
  const locale =
    requested ??
    matchLocale(cookieValue) ??
    matchAcceptLanguage((await headers()).get("accept-language")) ??
    routing.defaultLocale;

  return { locale };
});
